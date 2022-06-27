import { TransactionRequest } from "@ethersproject/abstract-provider";

import { Deferrable } from "ethers/lib/utils";
import { SIMPLE_STORAGE_BINARY } from "../constants";
import { getNonce, getProviderAndWallet } from "./fn";

/**
 * Alternative deploy with transaction .sendTranaction method
 */

async function deploy() {
  const { wallet } = getProviderAndWallet();
  try {
    const nonce = await getNonce(wallet);
    const tx: Deferrable<TransactionRequest> = {
      to: undefined,
      nonce: nonce,
      gasLimit: 1000000,
      gasPrice: 20000000000,
      data: SIMPLE_STORAGE_BINARY,
      value: 0,
      chainId: 1337,
    };
    const sendTranaction = await wallet.sendTransaction(tx);
    sendTranaction.wait(1);
  } catch (error) {
    throw error;
  }
}

export default deploy;
