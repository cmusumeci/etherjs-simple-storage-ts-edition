import { ethers } from "ethers";
import { readFile } from "fs/promises";
import { join } from "path";
const ABI_FILE = join(__dirname, "SimpleStorage_sol_SimpleStorage.abi");
const BINARY_FILE = join(__dirname, "SimpleStorage_sol_SimpleStorage.bin");

async function deploy() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545" // GANACHE
  );
  const wallet = new ethers.Wallet(
    "078f073263088decf6b01cab71faabe8436ae4f61b42379359d992809994ba52", // PRIVATE KEY
    provider
  );
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
    console.log(contract);
  } catch (error) {
    throw error;
  }
}

export default deploy;
