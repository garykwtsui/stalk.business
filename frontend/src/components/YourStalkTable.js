import React from "react";
import { Icon, Table, Segment, Label, Accordion } from "semantic-ui-react";
import TradeTable from "./TradeTable";

class YourStalkTable extends TradeTable {
  createStatusSegment(status) {
    console.log("Creating status segment");
    return (
      <Segment>
        {status.action} - {status.data}
      </Segment>
    );
  }

  getStatusColor(type) {
    switch (type) {
      case "islandUpdated":
        return "purple";
      case "queueUpdated":
        return "olive";
      case "alert":
        return "red";
      default:
        return "grey";
    }
  }

  getStatusMessage(data, queueIDs) {
    switch (data.action) {
      case "joined":
        return "joined queue.";
      case "islandUpdated":
        return data.data.description;
      case "queueUpdated":
        var message = "you are not in the queue?";
        data.data.visitors.map((visitor) => {
          for (let key in queueIDs) {
            if (queueIDs[key] === visitor.$id) {
              message = "your place: " + visitor.place;
            }
          }
        });
        return message;
      case "alert":
        return data.data.message;
      default:
        return JSON.stringify(data);
    }
  }

  getRibbonMessage(data) {
    if (data.data.timestamp) {
      return new Date(data.data.timestamp * 1000).toLocaleTimeString();
    }
    switch (data.action) {
      case "queueUpdated":
      case "joined":
        return <Icon name="thumbs up" />;
      case "islandUpdated":
        return <Icon name="exclamation circle" />;
      case "alert":
        return <Icon name="times circle" />;
      default:
        return <Icon name="question circle" />;
    }
  }

  isSkippableStatus(data) {
    switch (data.action) {
      //   case "joined":
      case "testing":
        return true;
      default:
        return false;
    }
  }

  createAccordion(turnipCode, island, data) {
    if (data.length > 0) {
      let panels = [
        {
          key: turnipCode,
          title: {
            content: (
              <Label color="grey" horizontal>
                <Icon name="unordered list" />
                {island.name + "'s events"}
              </Label>
            ),
          },
          content: data,
        },
      ];
      return (
        <Accordion
          panels={panels}
          exclusive={false}
          defaultActiveIndex={[0]}
          fluid
        />
      );
    }
  }
  createStatusRows(trade, statuses, queueIDs) {
    let sellSide = [];
    let buySide = [];
    if (statuses[trade.seller.turnipCode]) {
      statuses[trade.seller.turnipCode].reverse().map((status) =>
        !this.isSkippableStatus(status)
          ? sellSide.push(
              <React.Fragment>
                <Segment color={this.getStatusColor(status.action)}>
                  <Label color={this.getStatusColor(status.action)} ribbon>
                    {this.getRibbonMessage(status)}
                  </Label>
                  {this.getStatusMessage(status, queueIDs)}
                </Segment>
              </React.Fragment>
            )
          : sellSide
      );
    }
    if (statuses[trade.buyer.turnipCode]) {
      statuses[trade.buyer.turnipCode].reverse().map((status) =>
        !this.isSkippableStatus(status)
          ? buySide.push(
              <React.Fragment>
                <Segment color={this.getStatusColor(status.action)}>
                  <Label color={this.getStatusColor(status.action)} ribbon>
                    {this.getRibbonMessage(status)}
                  </Label>
                  {this.getStatusMessage(status, queueIDs)}
                </Segment>
              </React.Fragment>
            )
          : buySide
      );
    }

    // "{"action":"alert","data":{"turnipCode":"8a2312de","message":"Visitors of hornyland, your attention, please.<br><br> \n\t\t\t\t\tWe have detected this islands gates are no longer responding. I
    // "{"action":"queueUpdated","data":{"turnipCode":"f421e430","timestamp":1589230865,"visitorCount":1,"visitors":[{"$id":10533268,"name":"Katie Bug","place":1,"time":4},{"$id":10533757,"nam
    // "{"action":"islandUpdated","data":{"description":"there is no fee but i'm in desperate need of nmt so it would be nice if you could bring some but that's it","locked":1,"private":0,"paused
    return (
      <Table.Row>
        <Table.Cell colspan="3" verticalAlign="top">
          {this.createAccordion(
            trade.seller.turnipCode,
            trade.seller,
            sellSide
          )}
        </Table.Cell>
        <Table.Cell colspan="3" verticalAlign="top">
          {this.createAccordion(trade.buyer.turnipCode, trade.buyer, buySide)}
        </Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    );
  }

  createBody(trades, statuses, queueIDs) {
    return (
      <Table.Body>
        {trades.map((trade, index) => (
          <React.Fragment>
            <Table.Row>
              {this.createTradeRow("seller", trade.seller, -1)}
              {this.createTradeRow("buyer", trade.buyer, -1)}
              <Table.Cell>
                {this.createActionButton(
                  "leave",
                  trade,
                  <Icon name="angle double down" />
                )}
                {this.createActionButton(
                  "grab",
                  trade,
                  <Icon name="angle double right" />
                )}
                {this.createActionButton(
                  "ping",
                  trade,
                  <Icon name="angle double left" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colspan="7">Status: </Table.Cell>
            </Table.Row>
            {this.createStatusRows(trade, statuses, queueIDs)}
          </React.Fragment>
        ))}
      </Table.Body>
    );
  }
}

export default YourStalkTable;
