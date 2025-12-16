const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("DAO Contracts", function () {
  let token, timelock, governor;
  let owner, addr1, addr2;
  let proposalId;

  const INITIAL_SUPPLY = ethers.parseEther("1000000");
  const MIN_DELAY = 2 * 24 * 60 * 60; // 2 days
  const VOTING_DELAY = 7200; // ~1 day - SECURITY FIX
  const VOTING_PERIOD = 50400; // ~1 week
  const PROPOSAL_THRESHOLD = ethers.parseEther("1000");
  const QUORUM_PERCENTAGE = 4;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy Token
    const MyDAOToken = await ethers.getContractFactory("MyDAOToken");
    token = await MyDAOToken.deploy(INITIAL_SUPPLY);
    await token.waitForDeployment();

    // Deploy Timelock
    const DAOTimelock = await ethers.getContractFactory("DAOTimelock");
    timelock = await DAOTimelock.deploy(
      MIN_DELAY,
      [],
      [ethers.ZeroAddress],
      owner.address
    );
    await timelock.waitForDeployment();

    // Deploy Governor
    const MyDAOGovernor = await ethers.getContractFactory("MyDAOGovernor");
    governor = await MyDAOGovernor.deploy(
      await token.getAddress(),
      await timelock.getAddress(),
      VOTING_DELAY,
      VOTING_PERIOD,
      PROPOSAL_THRESHOLD,
      QUORUM_PERCENTAGE
    );
    await governor.waitForDeployment();

    // Setup roles
    const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
    const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
    const ADMIN_ROLE = await timelock.DEFAULT_ADMIN_ROLE();

    await timelock.grantRole(PROPOSER_ROLE, await governor.getAddress());
    await timelock.grantRole(EXECUTOR_ROLE, await governor.getAddress());
    await timelock.grantRole(ADMIN_ROLE, await governor.getAddress());
    await timelock.revokeRole(ADMIN_ROLE, owner.address);

    // Delegate voting power
    await token.delegate(owner.address);
  });

  describe("Token", function () {
    it("Should have correct name and symbol", async function () {
      expect(await token.name()).to.equal("My DAO Token");
      expect(await token.symbol()).to.equal("MDT");
    });

    it("Should mint initial supply to owner", async function () {
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("Should allow delegation", async function () {
      await token.transfer(addr1.address, ethers.parseEther("1000"));
      await token.connect(addr1).delegate(addr1.address);
      expect(await token.getVotes(addr1.address)).to.equal(ethers.parseEther("1000"));
    });
  });

  describe("Governor", function () {
    it("Should have correct voting parameters", async function () {
      expect(await governor.votingDelay()).to.equal(VOTING_DELAY);
      expect(await governor.votingPeriod()).to.equal(VOTING_PERIOD);
      expect(await governor.proposalThreshold()).to.equal(PROPOSAL_THRESHOLD);
    });

    it("Should allow creating a proposal", async function () {
      const transferCalldata = token.interface.encodeFunctionData("transfer", [
        addr1.address,
        ethers.parseEther("100"),
      ]);

      const tx = await governor.propose(
        [await token.getAddress()],
        [0],
        [transferCalldata],
        "Proposal #1: Transfer tokens"
      );

      const receipt = await tx.wait();
      const event = receipt.logs.find(log => {
        try {
          return governor.interface.parseLog(log).name === "ProposalCreated";
        } catch {
          return false;
        }
      });

      expect(event).to.not.be.undefined;
    });
  });

  describe("Timelock", function () {
    it("Should have correct min delay", async function () {
      expect(await timelock.getMinDelay()).to.equal(MIN_DELAY);
    });

    it("Should have Governor as proposer", async function () {
      const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
      expect(await timelock.hasRole(PROPOSER_ROLE, await governor.getAddress())).to.be.true;
    });
  });

  describe("Full Governance Flow", function () {
    it("Should execute a proposal after voting and timelock", async function () {
      // Transfer some tokens to timelock
      await token.transfer(await timelock.getAddress(), ethers.parseEther("1000"));

      // Create proposal
      const transferCalldata = token.interface.encodeFunctionData("transfer", [
        addr1.address,
        ethers.parseEther("100"),
      ]);

      const proposeTx = await governor.propose(
        [await token.getAddress()],
        [0],
        [transferCalldata],
        "Proposal #1: Transfer tokens from treasury"
      );

      const proposeReceipt = await proposeTx.wait();
      const event = proposeReceipt.logs.find(log => {
        try {
          return governor.interface.parseLog(log).name === "ProposalCreated";
        } catch {
          return false;
        }
      });

      proposalId = governor.interface.parseLog(event).args.proposalId;

      // Wait for voting delay
      await time.increase(2);

      // Vote
      await governor.castVote(proposalId, 1); // Vote "For"

      // Wait for voting period
      await time.increase(VOTING_PERIOD + 1);

      // Queue
      const descriptionHash = ethers.id("Proposal #1: Transfer tokens from treasury");
      await governor.queue(
        [await token.getAddress()],
        [0],
        [transferCalldata],
        descriptionHash
      );

      // Wait for timelock delay
      await time.increase(MIN_DELAY + 1);

      // Execute
      await governor.execute(
        [await token.getAddress()],
        [0],
        [transferCalldata],
        descriptionHash
      );

      // Check that tokens were transferred
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
    });
  });
});
