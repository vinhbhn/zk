// import * as zksync from "zksync";

// export const confirmTx = async (txHash: string) => {
//   const syncWSProvider = await zksync.Provider.newWebsocketProvider(
//     "wss://rinkeby-api.zksync.io/jsrpc-ws"
//   );

//   const receipt = await syncWSProvider.notifyTransaction(txHash, "VERIFY");
//   console.log(receipt);

//   // when tx verified then set user to membership

//   await syncWSProvider.disconnect();
//   console.log("disconnnect");
// };

import axios from "axios";

const url: string = "https://api.zksync.io/api/v0.1/transactions/0x";

export const confirmTx = async (txHash: string) => {
  const { data } = await axios.get(`${url}${txHash}`).catch((e) => {
    throw Error(`Error with tx: ${txHash} at block ${e.blockNumber}`);
  });

  // bot
  if (data.success === true && data.fail_reason === null) {
    console.log("confirm tx");
  }

  console.log(data);
};
