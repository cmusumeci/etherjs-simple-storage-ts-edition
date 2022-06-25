import deploy from "./deploy";

async function main() {
  try {
    await deploy();
  } catch (error) {
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
