import { Contract, type Signer, type Provider } from 'ethers';

export class DAOContractService {
  private contract: Contract;

  constructor(providerOrSigner: Provider | Signer, contractAddress: string, abi: any) {
    this.contract = new Contract(contractAddress, abi, providerOrSigner as any);
  }

  async createProposal(title: string, description: string, fromAddress?: string): Promise<string> {
    const gasEstimate = await this.contract.createProposal.estimateGas(title, description);
    const tx = await this.contract.createProposal(title, description, { 
      from: fromAddress,
      gasLimit: gasEstimate * 120n / 100n // Add 20% buffer
    });
    await tx.wait?.();
    return tx.hash || tx.transactionHash;
  }

  async vote(proposalId: string | number, support: boolean, fromAddress?: string): Promise<string> {
    const gasEstimate = await this.contract.vote.estimateGas(proposalId, support);
    const tx = await this.contract.vote(proposalId, support, { 
      from: fromAddress,
      gasLimit: gasEstimate * 120n / 100n // Add 20% buffer
    });
    await tx.wait?.();
    return tx.hash || tx.transactionHash;
  }

  async getProposal(proposalId: string | number): Promise<any> {
    const result = await this.contract.proposals(proposalId);
    return result;
  }
}
