import React, { Component } from "react";
import { Icon, Input, Divider, Header } from "semantic-ui-react";

class YourInformation extends Component {
  render() {
    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="info circle" />
            Your Information
          </Header>
        </Divider>
        <Input
          name="Name"
          defaultValue={this.props.visitorName}
          onChange={this.props.onInfoChanged}
        />
      </React.Fragment>
    );
  }
}

export default YourInformation;
