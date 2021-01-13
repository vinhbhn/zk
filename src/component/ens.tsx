import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("homestead", {
  etherscan: "1Y5X6UBNUIEQVQGN1RX1WAX1QT3Q57N786",
  infura: "713ad71148b74747b97a4ce5ce51112f",
  alchemy: "vqPR0ZGU7z3O9obib1UCvswuZXwzXl7u",
});

export const checkAddress = async () => {
  let addrFromElement = document.getElementById("from");
  let addrFrom: string = (addrFromElement as HTMLInputElement).value;

  try {
    const ethAddr: string = await provider.resolveName(addrFrom);
    if (ethers.utils.isAddress(ethAddr) === true) {
      (addrFromElement as HTMLElement).className = "form-control";
      return ((addrFromElement as HTMLInputElement).value = ethAddr);
    } else {
      (addrFromElement as HTMLElement).className =
        "form-control border border-danger";
    }

    // reverted but not input match
    // const ethName = await provider.lookupAddress(ethAddr);
    // console.log(ethName);

    // if (ethName === ensName) {
    //   return ethAddr;
    // }
  } catch (err) {
    console.error(err);
  }
};
