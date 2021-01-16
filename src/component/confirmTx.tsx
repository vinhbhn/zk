import * as zksync from "zksync";

export const confirmTx = async (txHash: string) => {
  const syncWSProvider = await zksync.Provider.newWebsocketProvider(
    "wss://ropsten-api.zksync.io/jsrpc-ws"
  );

  const receipt = await syncWSProvider.notifyTransaction(txHash, "VERIFY");
  console.log(receipt);

  // when tx verified then set user to membership

  await syncWSProvider.disconnect();
  console.log("disconnnect");
};
