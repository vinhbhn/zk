import { BigNumber, ethers } from "ethers";
import { CheckoutManager } from "zksync-checkout";

export const zk = async () => {
  try {
    let addrFrom = (document.getElementById("from") as HTMLInputElement).value;
    let amountElement = (document.getElementById("amount") as HTMLInputElement)
      .value;
    let token = (document.getElementById("token") as HTMLInputElement).value;

    const addrTo: string = "0x3e9c2ee838072b370567efc2df27602d776b341c";

    let amount: BigNumber = BigNumber.from(0);
    const tokenUnits: any = { ETH: 18, USDT: 6, DAI: 18, USDC: 6, LINK: 18 };
    const unit: number = tokenUnits[token];

    if (unit && amountElement) {
      amount = ethers.utils.parseUnits(amountElement, unit);
    }

    const manager = new CheckoutManager("rinkeby");

    if (ethers.utils.isAddress(addrFrom) === true && amount) {
      let from = ethers.utils.getAddress(addrFrom);
      let to = ethers.utils.getAddress(addrTo);

      let transactions = {
        from: from,
        to: to,
        token: token,
        amount: amount.toString(),
      };

      const hashes = await manager.zkSyncBatchCheckout([transactions], token);

      await manager.wait(hashes);
      // console.log(txInfo);
      // console.log(txInfo[0].hash);

      // confirm tx then set user to membership
    }
  } catch (err) {
    console.error(err);
  }
};
