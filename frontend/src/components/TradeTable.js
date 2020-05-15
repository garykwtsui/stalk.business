import React, { Component } from "react";
import { Label, Table, Divider, Header } from "semantic-ui-react";
import TradeTableButton from "./TradeTableButton";
class TradeTable extends Component {
  /* Component Rendering */
  createActionButton(actionType, trade, icon) {
    return (
      <TradeTableButton
        onHandleClick={this.props.onHandleClick}
        actionType={actionType}
        trade={trade}
        icon={icon}
      />
    );
  }

  createTradeRow(type, islanderSide, index) {
    if (!islanderSide) {
      return (
        <React.Fragment>
          <Table.Cell style={{ width: 300 }} verticalAlign="top">
            No Information.
          </Table.Cell>
          <Table.Cell>--</Table.Cell>
          <Table.Cell>--</Table.Cell>
        </React.Fragment>
      );
    }
    let color = "white";
    if (
      index !== -1 &&
      this.prevState &&
      this.prevState.islands.length > index
    ) {
      let previousIsland;
      switch (type) {
        case "seller":
          previousIsland = this.prevState.islands[index].seller;
          break;
        case "buyer":
          previousIsland = this.prevState.islands[index].buyer;
          break;
        default:
          break;
      }
      if (previousIsland.turnipCode !== islanderSide.turnipCode) {
        color = "teal";
      }
    }

    return (
      <React.Fragment>
        <Table.Cell style={{ width: 300 }} verticalAlign="top">
          {/* <Transition.Group animation={"flash"} duration={1000} visible={true}> */}
          <Label as="a" color={color} ribbon>
            <a
              href={"https://turnip.exchange/island/" + islanderSide.turnipCode}
            >
              {islanderSide.name}
            </a>
          </Label>
          {/* this will mess up the table: fix this */}
          <span>{islanderSide.description}</span>
          <span>
            <br />
            {this.props.dodoCodes &&
            this.props.dodoCodes[islanderSide.turnipCode] ? (
              <Label as="a" color="green">
                {this.props.dodoCodes[islanderSide.turnipCode]}
              </Label>
            ) : (
              ""
            )}
          </span>
          {/* </Transition.Group> */}
        </Table.Cell>
        <Table.Cell>
          <Label tag>${islanderSide.turnipPrice}</Label>
        </Table.Cell>
        <Table.Cell>
          {/* you should abstract below out and make it more specific to the said component */}
          {this.props.yourPlaces &&
          this.props.yourPlaces[islanderSide.turnipCode]
            ? this.props.yourPlaces[islanderSide.turnipCode] +
              "/" +
              islanderSide.maxQueue
            : islanderSide.queuedStr}
        </Table.Cell>
      </React.Fragment>
    );
  }

  createBody(trades) {
    console.log("Error: Empty body");
  }

  render() {
    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h4">
            {this.props.sectionIcon}
            {this.props.sectionName}
          </Header>
        </Divider>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">Daisy</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Tommy</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.createBody(
            this.props.trades,
            this.props.statuses,
            this.props.queueIDs
          )}
        </Table>
      </React.Fragment>
    );
  }
}

export default TradeTable;
