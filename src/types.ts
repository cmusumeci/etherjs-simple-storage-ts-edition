export type TypeKey = "abi" | "binary";
export type AbiAndBinaryType = {
  [key in TypeKey]: string;
};
