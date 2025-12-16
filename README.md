# DAO 3.0 Dashboard 🚀

Vision: Mainstream Decentralized Autonomous Organizations (DAO)
DAO3.0 is a next-generation "Hybrid DAO" designed to bridge the gap between user-friendly Web2 experiences and the trustless security of Web3. Our core focus is achieving mainstream scale by eliminating the high-friction barriers common to traditional, crypto-native governance platforms.

The project is built around the concept of Progressive Decentralization, guiding users from a simple social login interface to full self-custody as their stake and commitment grow.

<img width="1891" height="1035" alt="Screenshot 2025-12-16 125302" src="https://github.com/user-attachments/assets/8621dacf-83d6-4826-9f0f-c527cd39bc98" />

✨ Key Features
1. Low-Friction Onboarding (The Hybrid Advantage)
Social Login (via Privy): Users onboard instantly using familiar accounts like Google or Apple, bypassing the need for immediate MetaMask setup or seed phrase management.
Embedded Wallets: A secure, non-custodial embedded wallet is provisioned behind the scenes to allow immediate interaction.
Progressive Decentralization Flywheel: Users can "graduate" their keys to a full self-custody wallet (e.g., MetaMask) as they gain trust and accumulate voting power.
2. Advanced Governance Mechanisms
The platform is designed for fairness and long-term alignment:

<img width="1906" height="1035" alt="Screenshot 2025-12-16 125328" src="https://github.com/user-attachments/assets/779de513-5676-487e-9fce-8f6964c0a2cb" />

Quadratic Voting (QV): Measures the intensity of preference by calculating vote power quadratically (√tokens), reducing the influence of large token holders.
Conviction Voting (CV): Rewards long-term commitment by increasing a vote's power the longer it remains committed to a proposal.
Anti-Sybil Measures: Designed with hooks to integrate Proof-of-Humanity systems (like BrightID) to ensure fair voting and prevent manipulation.
3. Security-First Architecture
The governance system is secured by a three-part Solidity contract suite (Token, Governor, Timelock).

<img width="1901" height="1037" alt="Screenshot 2025-12-16 125340" src="https://github.com/user-attachments/assets/001735c2-99e1-4c77-b8a8-c66b08a80034" />


Timelock Treasury: The entire governance token supply is held within the Timelock contract, ensuring no single entity (including the deployer) can control the funds.
Enforced Delays: Includes mandatory Voting Delays (1 day) and an Execution Grace Period (14 days) to protect the DAO from malicious, fast-tracked proposals.
Event-Driven Data: The frontend utilizes viem.watchContractEvent for real-time data updates, ensuring the UI is a consistent and honest reflection of the on-chain state.
🛠️ Technology Stack
Component	Technology	Role
Blockchain	Ethereum Mainnet (Solidity)	Secure settlement layer for all governance logic and treasury control.
Frontend	React, Vite, Vercel	High-performance user interface for delegation, proposal, and voting flows.
Web3 Connectivity	Wagmi, viem	Production-grade libraries for robust and efficient contract interaction.
Wallet Layer	Privy	Handles all aspects of social login and embedded key management.
Contracts	OpenZeppelin Governors	Audited base contracts extended with custom voting logic.
🚀 Getting Started
To run the DAO3.0 governance dashboard locally, follow these steps:


Prerequisites
Node.js (v18+)
npm or Yarn
Hardhat or Foundry (for contract compilation and testing)
Setup
Clone the repository:
git clone [https://github.com/YourUsername/DAO3.0-Project.git](https://github.com/Jayram2204/DAO3.0-Project.git)
cd DAO3.0-Project
Install dependencies:
npm install
# or
yarn install

<img width="1884" height="1006" alt="image" src="https://github.com/user-attachments/assets/5b00581a-c74d-4b7e-b8ba-bbe5afc3881d" />


Configure Environment Variables: Create a .env file in the root directory and add the necessary RPC endpoint URLs and API keys (e.g., for Ethereum RPC, Vercel/hosting, and Privy SDK integration).
Deploy Smart Contracts (Development/Testnet): The governance contracts must be compiled and deployed before the frontend can connect.
npx hardhat compile
npx hardhat run scripts/deploy-governance.js --network sepolia
Note: Ensure the deployment script correctly mints the initial token supply to the Timelock contract.
Run the Frontend:
npm run dev

DAO3.0 Project Report Outline: A detailed, structured document outlining the project's design, scope, and implementation plan.
DAO3.0 Presentation: A 13-slide HTML/CSS simulation of the project presentation.
EMERGENCY_PROCEDURES.md: Document defining the protocol for using the CANCELLER_ROLE and other security measures. (Phase 3 deliverable).
Created by Jayesh chavan for SPPU DOT 
