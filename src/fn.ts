import { ethers, Wallet } from "ethers";
import { readFile } from "fs/promises";
import { SOURCES } from "./constants";
import { AbiAndBinaryType, TypeKey } from "./types";
/**
 * Get ABI & Binary
 * @return { abi:ethers.ContractFactory.ABI,binary:ethers.ContractFactory.binary }
 */
export async function getAbiAndBinary() {
  const files = await Promise.all(
    SOURCES.map(async (e) => {
      return {
        key: e.key,
        file: await readFile(e.file, {
          encoding: "utf-8",
        }),
      };
    })
  );

  return files.reduce(
    (acc, f) => ({
      ...acc,
      [f.key as TypeKey]: f.file,
    }),
    {}
  ) as AbiAndBinaryType;
}

/**
 * GetProviderAndWallet
 * return RpcProvider & Wallet
 * @returns {wallet:ethers.Wallet,provider:ethers.providers.JsonRpcProvider}
 */
export function getProviderAndWallet() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RCP_PROVIDER
  );
  const wallet = new ethers.Wallet(
    process.env
      .PRIVATE_KEY as "BytesLike | ExternallyOwnedAccount | SigningKey",
    provider
  );
  return { provider, wallet };
}

/**
 * GetContractFactory
 * @return ethers.ContractFactory
*/
export async function getContractFactory() {
  const { wallet } = getProviderAndWallet();
  const { abi, binary } = await getAbiAndBinary();
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  return contractFactory;
}



/**
 * GetNonce
 * @return nonce:number
*/
export async function getNonce(wallet: Wallet) {
  return await wallet.getTransactionCount();
}