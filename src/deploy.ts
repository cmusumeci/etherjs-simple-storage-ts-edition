import { ethers } from "ethers";
import { readFile } from "fs/promises";
import { ABI_FILE, BINARY_FILE, PRIVATE_KEY, RCP_PROVIDER } from "./constants";

async function deploy() {
  const provider = new ethers.providers.JsonRpcProvider(RCP_PROVIDER);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  try {
    const abi = await readFile(ABI_FILE, {
      encoding: "utf-8",
    });

    const binary = await readFile(BINARY_FILE, {
      encoding: "utf-8",
    });

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, wait....");
    const contract = await contractFactory.deploy();

    /**
     * Transaction deployment state
     */
    console.log("Here is the deployment transaction (transaction response):");
    console.log(contract.deployTransaction);

    const transactionReceipt = contract.deployTransaction.wait(1); // "1" is num of block to waiting for know if transaction is receipt
    console.log("here is the transaction receipt: ");
    console.log(transactionReceipt);
  } catch (error) {
    throw error;
  }
}

export default deploy;
