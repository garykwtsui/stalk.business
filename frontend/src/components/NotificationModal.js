import React, { Component } from "react";
import { Icon, Button, Modal, Header } from "semantic-ui-react";

class NotificationModal extends Component {
  render() {
    return (
      <Modal trigger={<Button>Basic Modal</Button>} basic size="small">
        <Header icon="archive" content="Archive Old Messages" />
        <Modal.Content>
          <p>Not able to join {this.props.island.name}'s queue</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted>
            <Icon name="remove" /> OK!
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NotificationModal;
