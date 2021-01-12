import axios from "axios";

const url: string = "https://ropsten-api.zksync.io/api/v0.1/transactions/0x";

export const confirmTx = async (txHash: string) => {
  const { data } = await axios.get(`${url}${txHash}`).catch((e) => {
    throw Error(`Error with block ${e.blockNumber}`);
  });

  if (
    data.success === true &&
    data.verified === true &&
    data.fail_reason === null
  ) {
    console.log("confirm tx");
  }

  console.log(data);
};
