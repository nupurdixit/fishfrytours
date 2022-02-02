import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import './AddBoat.css';

/**
 * This class is responsible to add a boat card based when the "Add Boat" button is clicked". On clicking, a Modal will pop up
 * with form inside it. It will ask for boat name and selecting boat status from a dropdown. On submit, POST API  will be called
 * on backend and the database will be updated. The react page will be refreshed to show all boats including the new one.
 */
export default class AddBoat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boatInfo: { name: '', status: '' },
      selectedStatus: " ",
      editing: false,
      showModal: false,
      show: true,
      setShow: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  setEditing(editing) {
    this.setState({
      editing
    });
  }

  handleClose = () => {
    this.setState({ setShow: false });
  }

  handleShow = () => {
    this.setState({ setShow: true });
  }

  handleInputChange = (e) => {
    this.setState({
      selectedStatus: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newBoatName = this.textInput.value.trim();
    const newBoatStatus = this.state.selectedStatus;

    if (newBoatName && newBoatStatus) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBoatName, status: newBoatStatus })
      };
      fetch('http://localhost:3000/boats/addBoat', requestOptions)
        .then(response => response.json())
    
      console.log("Inside AddBoat");
      console.log("boatlist is:", this.props.boatlist);
    }
    window.location.reload(false);
    this.textInput.value = '';
  }


  render() {
    if (!this.state.editing) {
      return (
        <div className="open-add-button add-button" onClick={() => this.setEditing(true)}>
          <button className="button" onClick={this.handleShow}>Add Boat</button>
        </div>
      );
    }

    return (

      <Modal show={this.state.show} onHide={this.handleClose}>
        <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
          <Modal.Body className="text-left border-0">
            <h3 className="modal-label">Please enter boat details</h3>
            <div className='form-group'>
              <input type="text" className="boat-input" placeholder="Enter Boat Name" ref={input => this.textInput = input} aria-label="Add Boat" />
            </div>
            <div className='form-group>'>
              <select id="status" name="status" onChange={this.handleInputChange}>
                <option value="">Select Boat Status</option>
                <option value="DOCKED">DOCKED</option>
                <option value="OUTBOUND_TO_SEA">OUTBOUND_TO_SEA</option>
                <option value="INBOUND_TO_HARBOR">INBOUND_TO_HARBOR</option>
                <option value="MAINTENANCE">MAINTENANCE</option>
              </select>
            </div>
            <div className='button-alignment'>
              <button className="button submit-button"> Submit </button>
              &nbsp;&nbsp;
              <button className="button cancel-button" onClick={() => this.setEditing(false)}>Cancel</button>
            </div>
          </Modal.Body>
        </form>
      </Modal>

    );
  }
}