import React from "react";
import { Icon, Table } from "semantic-ui-react";
import TradeTable from "./TradeTable";

class StalkMarketTable extends TradeTable {
  createBody(trades) {
    if (trades.length <= 0) {
      return (
        <Table.Body>
          <Table.Row colspan="7">
            <Table.Cell>
              <Icon name="x" />
              Sorry, no good trades available.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }
    return (
      <Table.Body>
        {trades.map((trade, index) => (
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
        ))}
      </Table.Body>
    );
  }
}

export default StalkMarketTable;
