import { getContractFactory } from "./fn";

/**
 * Deploy smart contract & use its function
*/
async function deploy() {
  try {
    const contractFactory = await getContractFactory();
    console.log("Deploying, wait....");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);

    /**
     * TRANSACTION & DEPLOYMENT STATE
     *
     * console.log("Here is the deployment transaction (transaction response):");
     * console.log(contract.deployTransaction);
     * const transactionReceipt = contract.deployTransaction.wait(1); // "1" is num of block to waiting for know if transaction is receipt
     * console.log("here is the transaction receipt: ");
     * console.log(transactionReceipt);
     */

    /**
     *
     * retrieveAndStoreNumber - Get & Store Number (SIMPLE_STORAGE.SOL)
     * @params num:string - (NB: OK string instead of number - number can be very big in sol)
     */
    async function retrieveAndStoreNumber(num: string) {
      let number = await contract.retrieve();
      console.log(`Current number is: ${number.toString()}`);
      await contract.store(num);
      number = await contract.retrieve();
      console.log(`After store number is: ${number.toString()}`);
    }

    await retrieveAndStoreNumber("10");
  } catch (error) {
    throw error;
  }
}

export default deploy;
