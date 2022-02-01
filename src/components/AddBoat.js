import React, { useState } from 'react';
import './AddBoat.css';

export default class AddBoat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boatInfo: { name: '', status: '' },
      selectedStatus: " ",
      editing: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      selectedStatus: e.target.value,
    });
  };

  onSubmit(event) {
    event.preventDefault();

    const newBoatName = this.textInput.value.trim();
    const newBoatStatus = this.state.selectedStatus;
    // const successMessage = '';
    // const [errorMessage, setErrorMessage] = useState('');
    // const setAddSuccessMessage = newBoatName + " has been added";
    console.log("selected boat status is:", newBoatStatus);

    if (newBoatName && newBoatStatus) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBoatName, status: newBoatStatus })
      };
      fetch('http://localhost:3000/boats/addBoat', requestOptions)
        .then(response => response.json())
        //.then(data => <p> {setAddSuccessMessage} </p>);
      console.log("Inside AddBoat");
      console.log("boatlist is:", this.props.boatlist);
    }
    window.location.reload(false);
    this.textInput.value = '';
  }

  setEditing(editing) {
    this.setState({
      editing
    });
  }

  render() {
    if (!this.state.editing) {
      return (
        <div className="open-add-button add-button" onClick={() => this.setEditing(true)}>
          <button className="button">Add Boat</button>
        </div>
      );
    }
    return (
      <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
        <input type="text" className="boat-input" placeholder="Enter Boat Name" ref={input => this.textInput = input} aria-label="Add Boat" />

        <select id="status" name="status" onChange={this.handleInputChange}>
          <option value="">Select Boat Status</option>
          <option value="DOCKED">DOCKED</option>
          <option value="OUTBOUND_TO_SEA">OUTBOUND_TO_SEA</option>
          <option value="INBOUND_TO_HARBOR">INBOUND_TO_HARBOR</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>
        <div>
          <button className="button submit-button"> Submit </button>
          &nbsp;&nbsp;
          <button className="button cancel-button" onClick={() => this.setEditing(false)}>Cancel</button>
        </div>
      </form>
    );
  }
}