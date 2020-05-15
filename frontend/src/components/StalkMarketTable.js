import React from "react";
import { Icon, Table } from "semantic-ui-react";
import TradeTable from "./TradeTable";

class StalkMarketTable extends TradeTable {
  createBody(trades) {
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
