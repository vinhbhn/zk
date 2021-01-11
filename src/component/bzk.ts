import { BigNumber, ethers } from "ethers";
import { CheckoutManager } from "zksync-checkout";

export const bzk = async () => {
  let addrFrom = (document.getElementById("from") as HTMLInputElement).value;
  let amountElement = (document.getElementById("amount") as HTMLInputElement)
    .value;
  let token = (document.getElementById("token") as HTMLInputElement).value;
  let errInfo = document.getElementById("errInfo") as HTMLOutputElement;

  const addrTo: string = "0x3e9c2ee838072b370567efc2df27602d776b341c";

  ethers.utils.isAddress(addrFrom) === true
    ? (errInfo.innerHTML = ``)
    : (errInfo.innerHTML = `<Form.Text className="text-muted">
      Check your Ethereum address.
      </Form.Text>`);

  let amount: BigNumber = BigNumber.from(0);

  const tokenUnits: any = { ETH: 18, USDT: 6, DAI: 18, USDC: 6, LINK: 18 };
  const unit: number = tokenUnits[token];

  if (unit && amountElement) {
    amount = ethers.utils.parseUnits(amountElement, unit);
  }

  const manager = new CheckoutManager("ropsten");

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
  }
};