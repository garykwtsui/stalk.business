import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

class TradeTableButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.actionType = this.props.actionType;
    this.trade = this.props.trade;
    this.icon = this.props.icon;
    this.onHandleClick = this.props.onHandleClick;
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    console.log("Toggle Loading...");
    this.setState((state) => ({
      isLoading: !state.isLoading,
    }));
  }

  render() {
    let buttonContent;
    if (this.state.isLoading) {
      buttonContent = (
        <React.Fragment>
          <Button.Content visible>{this.icon}</Button.Content>
          <Button.Content hidden>{this.actionType}</Button.Content>
        </React.Fragment>
      );
    } else {
      buttonContent = (
        <React.Fragment>
          <Button.Content visible>
            <Icon name="spinner" />
          </Button.Content>
          <Button.Content hidden>Loading</Button.Content>
        </React.Fragment>
      );
    }
    let self = this;
    return (
      <Button
        animated="vertical"
        onClick={function () {
          self.onHandleClick(
            self,
            self.actionType,
            self.trade.seller.turnipCode,
            self.trade.buyer.turnipCode
          );
          self.toggleLoading();
        }}
      >
        {buttonContent}
      </Button>
    );
  }
}

export default TradeTableButton;
