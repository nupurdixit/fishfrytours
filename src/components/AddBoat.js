import React from 'react';
import './AddBoat.css';

export default class AddBoat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boatInfo: {name: '', status:''},
      editing: false,
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit(event) {
    event.preventDefault();
    
    const boatName = this.textInput.value.trim();
   
    if (boatName) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: boatName})
    };
    fetch('http://localhost:3000/boats/addBoat', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({boatInfo: data}),console.log("insert api response is: ", this.state.boatInfo));
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
    if(!this.state.editing) {
      return (
        <div className="open-add-button add-button" onClick={() => this.setEditing(true)}>
          <button className="button">Add Boat</button>
        </div>  
        ); 
    }
      return (
        <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" className="boat-input" placeholder="Enter Boat Name" ref={input => this.textInput = input} aria-label="Add Boat" onChange={this.handleInputChange}/>
          <div>
            <button className="button submit-button"> Submit </button>
                &nbsp;&nbsp;
           <button className="button cancel-button" onClick={() => this.setEditing(false)}>Cancel</button>  
          </div>
        </form>
      );
  }
}