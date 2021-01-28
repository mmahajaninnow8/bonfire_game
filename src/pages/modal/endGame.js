import React, { Component } from "react";
import {
  Modal,
  ModalBody,Button , ModalHeader
} from "reactstrap";

class EndGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.restart = this.restart.bind(this);
    this.exit = this.exit.bind(this);

  }

  restart () {
    window.location.reload();
  } 
  exit () {

} 

  render() {
const {isOpen , score} = this.props; 
    return (
      <Modal
        isOpen={isOpen}
        centered
        className="isOpenContactUsModal"
      >
        <ModalHeader>
        <h3>Game End </h3>
        </ModalHeader>
        <ModalBody>
    <p>Your score :{score}</p>
            <Button color="primary" onClick={this.restart}>
              Restart
        </Button>
            {/* <Button color="primary" onClick={this.exit}>
              Exit
        </Button> */}
        </ModalBody>
      </Modal>
    );
  }
}



export default 
  EndGame;
