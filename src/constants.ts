import { join } from "path";

export const RCP_PROVIDER = "http://127.0.0.1:7545"; // GANACHE

export const PRIVATE_KEY =
  "8bb6ad8269437a3b870af5904396c4c8977c2b820f52054c1ae08e1919fe0a36"; // FROM GANACHE

// Simple Storage
const rootPath = join(__dirname);
export const ABI_FILE = join(rootPath, "SimpleStorage_sol_SimpleStorage.abi");
export const BINARY_FILE = join(
  rootPath,
  "SimpleStorage_sol_SimpleStorage.bin"
);
