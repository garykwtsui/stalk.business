import React from "react";
import { Icon, Table, Divider, Header } from "semantic-ui-react";
import TradeTable from "./TradeTable";

class StalkMarketTable extends TradeTable {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      if (this.state.seconds <= 0) {
        this.state.seconds = 30;
      }
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
      // console.log("Seconds: " + this.state.seconds);
    }, 1000);
  }

  createHeader(sectionIcon, sectionName) {
    return (
      <Divider horizontal>
        <Header as="h4">
          {sectionIcon}
          {sectionName} ({this.state.seconds})
        </Header>
      </Divider>
    );
  }

  createHighlightedRows(trade, index) {
    if (trade.buyer.queuedPos - trade.seller.queuedPos < 16) {
      return (
        <Table.Row positive>
          {this.createTradeRow("seller", trade.seller, index)}
          {this.createTradeRow("buyer", trade.buyer, index)}
          <Table.Cell>
            {this.createActionButton(
              "join",
              trade,
              <Icon name="angle double up" />
            )}
          </Table.Cell>
        </Table.Row>
      );
    } else if (
      trade.buyer.queuedPos - trade.seller.queuedPos >= 16 &&
      trade.buyer.queuedPos - trade.seller.queuedPos < 32
    ) {
      return (
        <Table.Row>
          {this.createTradeRow("seller", trade.seller, index)}
          {this.createTradeRow("buyer", trade.buyer, index)}
          <Table.Cell>
            {this.createActionButton(
              "join",
              trade,
              <Icon name="angle double up" />
            )}
          </Table.Cell>
        </Table.Row>
      );
    }
    return (
      <Table.Row negative>
        {this.createTradeRow("seller", trade.seller, index)}
        {this.createTradeRow("buyer", trade.buyer, index)}
        <Table.Cell>
          {this.createActionButton(
            "join",
            trade,
            <Icon name="angle double up" />
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
  createConditionRows(trades, message) {
    if (trades.length <= 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan="7">
            <Icon name="x" />
            {message}
          </Table.Cell>
        </Table.Row>
      );
    } else {
      return trades.map((trade, index) =>
        this.createHighlightedRows(trade, index)
      );
    }
  }

  createBody(trades) {
    if (trades.length <= 0) {
      return (
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="7">
              <Icon name="hourglass start" />
              Please wait...
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }
    let goodTrades = trades.filter((trade) => trade.buyer.turnipPrice >= 300);
    let subparTrades = trades.filter(
      (trade) => trade.buyer.turnipPrice >= 190 && trade.buyer.turnipPrice < 300
    );
    goodTrades.sort((a, b) => b.buyer.turnipPrice - a.buyer.turnipPrice);
    subparTrades.sort((a, b) => b.buyer.turnipPrice - a.buyer.turnipPrice);

    return (
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell colSpan="7">
            <Icon name="announcement" />
            These ones are superb - Tommy's price > $300
          </Table.HeaderCell>
        </Table.Row>
        {this.createConditionRows(
          goodTrades,
          "No good trades are available now."
        )}
        <Table.Row>
          <Table.HeaderCell colSpan="7">
            <Icon name="dont" />
            These ones are less than ideal - Tommy's price ($190 - $300)
          </Table.HeaderCell>
        </Table.Row>
        {this.createConditionRows(
          subparTrades,
          "No subpar trades are available now."
        )}
      </Table.Body>
    );
  }
}

export default StalkMarketTable;
