import React, { Component } from "react";
import { Transition, Message } from "semantic-ui-react";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.notification.type,
      header: this.props.notification.header,
      message: this.props.notification.message,
      visible: this.props.notification.visible,
    };
  }

  getMessage(type, header, message) {
    switch (type) {
      case "warning":
        return <Message warning header={header} content={message} />;
      case "error":
        return <Message error header={header} content={message} />;
      case "success":
        return <Message success header={header} content={message} />;
      default:
        break;
    }
  }

  render() {
    return (
      <Transition visible={this.state.visible}>
        {this.getMessage(
          this.state.type,
          this.state.header,
          this.state.message
        )}
      </Transition>
    );
  }
}

export default Notification;
