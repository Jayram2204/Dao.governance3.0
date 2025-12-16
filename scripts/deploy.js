const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting DAO deployment...\n");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());
  console.log();

  // ========================================
  // STEP 1: Deploy the Governance Token
  // ========================================
  console.log("📝 Step 1: Deploying MyDAOToken...");
  const initialSupply = hre.ethers.parseEther("1000000"); // 1 million tokens
  const MyDAOToken = await hre.ethers.getContractFactory("MyDAOToken");
  const token = await MyDAOToken.deploy(initialSupply);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ MyDAOToken deployed to:", tokenAddress);
  console.log();

  // ========================================
  // STEP 2: Deploy the Timelock
  // ========================================
  console.log("📝 Step 2: Deploying DAOTimelock...");
  const minDelay = 2 * 24 * 60 * 60; // 2 days in seconds
  const proposers = []; // Will be set to Governor after deployment
  const executors = [hre.ethers.ZeroAddress]; // Anyone can execute after timelock
  const admin = deployer.address; // Deployer is initial admin (will transfer to Governor)
  
  const DAOTimelock = await hre.ethers.getContractFactory("DAOTimelock");
  const timelock = await DAOTimelock.deploy(minDelay, proposers, executors, admin);
  await timelock.waitForDeployment();
  const timelockAddress = await timelock.getAddress();
  console.log("✅ DAOTimelock deployed to:", timelockAddress);
  console.log("   Min delay:", minDelay, "seconds (2 days)");
  console.log();

  // ========================================
  // STEP 3: Deploy the Governor
  // ========================================
  console.log("📝 Step 3: Deploying MyDAOGovernor...");
  const votingDelay = 7200; // ~1 day (7200 blocks * 12 seconds = 24 hours) - SECURITY FIX
  const votingPeriod = 50400; // ~1 week (50400 blocks * 12 seconds = 7 days)
  const proposalThreshold = hre.ethers.parseEther("1000"); // 1000 tokens to create proposal
  const quorumPercentage = 4; // 4% of total supply must vote
  
  const MyDAOGovernor = await hre.ethers.getContractFactory("MyDAOGovernor");
  const governor = await MyDAOGovernor.deploy(
    tokenAddress,
    timelockAddress,
    votingDelay,
    votingPeriod,
    proposalThreshold,
    quorumPercentage
  );
  await governor.waitForDeployment();
  const governorAddress = await governor.getAddress();
  console.log("✅ MyDAOGovernor deployed to:", governorAddress);
  console.log("   Voting delay:", votingDelay, "blocks");
  console.log("   Voting period:", votingPeriod, "blocks (~1 week)");
  console.log("   Proposal threshold:", hre.ethers.formatEther(proposalThreshold), "tokens");
  console.log("   Quorum:", quorumPercentage, "%");
  console.log();

  // ========================================
  // STEP 4: Configure Roles
  // ========================================
  console.log("📝 Step 4: Configuring roles...");
  
  // Grant PROPOSER_ROLE to Governor
  const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
  const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
  const ADMIN_ROLE = await timelock.DEFAULT_ADMIN_ROLE();
  
  console.log("   Granting PROPOSER_ROLE to Governor...");
  await timelock.grantRole(PROPOSER_ROLE, governorAddress);
  
  console.log("   Granting EXECUTOR_ROLE to Governor...");
  await timelock.grantRole(EXECUTOR_ROLE, governorAddress);
  
  console.log("   Revoking deployer's ADMIN_ROLE (transferring to Governor)...");
  await timelock.grantRole(ADMIN_ROLE, governorAddress);
  await timelock.revokeRole(ADMIN_ROLE, deployer.address);
  
  console.log("✅ Roles configured successfully");
  console.log();

  // ========================================
  // STEP 5: Delegate voting power
  // ========================================
  console.log("📝 Step 5: Delegating voting power to deployer...");
  await token.delegate(deployer.address);
  console.log("✅ Voting power delegated");
  console.log();

  // ========================================
  // Summary
  // ========================================
  console.log("🎉 DAO Deployment Complete!\n");
  console.log("=".repeat(60));
  console.log("Contract Addresses:");
  console.log("=".repeat(60));
  console.log("MyDAOToken:     ", tokenAddress);
  console.log("DAOTimelock:    ", timelockAddress);
  console.log("MyDAOGovernor:  ", governorAddress);
  console.log("=".repeat(60));
  console.log();
  console.log("📋 Next Steps:");
  console.log("1. Update your .env file with these contract addresses");
  console.log("2. Verify contracts on Etherscan (if on testnet/mainnet)");
  console.log("3. Distribute tokens to DAO members");
  console.log("4. Members should delegate their voting power");
  console.log();
  console.log("⚠️  IMPORTANT:");
  console.log("- The Timelock now controls itself (fully decentralized)");
  console.log("- Only the Governor can execute proposals");
  console.log("- All proposals have a 2-day delay before execution");
  console.log();

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      MyDAOToken: tokenAddress,
      DAOTimelock: timelockAddress,
      MyDAOGovernor: governorAddress,
    },
    config: {
      initialSupply: hre.ethers.formatEther(initialSupply),
      minDelay: minDelay,
      votingDelay: votingDelay,
      votingPeriod: votingPeriod,
      proposalThreshold: hre.ethers.formatEther(proposalThreshold),
      quorumPercentage: quorumPercentage,
    },
  };

  const fs = require("fs");
  const path = require("path");
  const deploymentsDir = path.join(__dirname, "../deployments");
  
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }
  
  fs.writeFileSync(
    path.join(deploymentsDir, `${hre.network.name}.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log(`💾 Deployment info saved to deployments/${hre.network.name}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
