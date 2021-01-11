import * as React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { bzk } from "./bzk";
import { ethAddr, linkAddr, checkPriceFeed } from "./PriceFeed";

const monthlyFee = 25;

interface IState {
  addrTo: string;
  amount: string;
}

export default class Page1 extends React.PureComponent<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      addrTo: "migoi.eth",
      amount: monthlyFee.toString(),
    };
    this.changeAmount = this.changeAmount.bind(this);
  }

  priceFeed(tokenAddr: string) {
    checkPriceFeed(tokenAddr)
      .methods.latestRoundData()
      .call()
      .then((roundData: any[]) => {
        let price = Number(roundData[1]) / 100000000;
        let monthlyFeeAmount = monthlyFee / price;
        return this.setState({ amount: monthlyFeeAmount.toString() });
      })
      .catch((err: any) => console.error(err));
  }

  changeAmount() {
    let token = (document.getElementById("token") as HTMLInputElement).value;
    if (token === "ETH") {
      this.priceFeed(ethAddr);
    } else if (token === "LINK") {
      this.priceFeed(linkAddr);
    } else {
      this.setState({ amount: monthlyFee.toString() });
    }
  }

  render() {
    return (
      <div style={{ margin: "10em" }}>
        <hr />
        <h5>Monthly Membership Payment</h5>
        <div style={{ padding: "0px 400px" }}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">From</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder="0x"
              aria-label="From Address"
              id="from"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">To</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              aria-label="To Address"
              id="to"
              value={this.state.addrTo}
              readOnly={true}
            />
          </InputGroup>

          <div onChange={this.changeAmount}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">Monthly Fee</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="amount"
                value={this.state.amount}
                readOnly={true}
              />
              <Form.Control as="select" custom id="token">
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
                <option value="LINK">LINK</option>
                <option value="DAI">DAI</option>
                <option value="USDC">USDC</option>
              </Form.Control>
            </InputGroup>
          </div>

          <div id="errInfo" />

          <Button onClick={bzk}>Pay</Button>
        </div>
        <hr />
      </div>
    );
  }
}
