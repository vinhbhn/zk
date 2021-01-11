export async function getAccount() {
  const accounts = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });

  const account = accounts[0];

  const addrFromElement = document.getElementById("from") as HTMLInputElement;
  addrFromElement.value = account;
}
