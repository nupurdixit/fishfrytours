import React from 'react';
import './AddBoat.css';

export default class AddBoat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boatInfo: {name: '', status:''},
      editing: false,
      // show: true
    }
    // this.handleshow = this.handleshow.bind(this);
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
      // this.props.onAdd(boatName, "Docked");
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: boatName})
    };
    fetch('http://localhost:3000/boats/addBoat', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({boatInfo: data}));
      console.log("Inside AddBoat");
    }
    this.textInput.value = '';
  }

 setEditing(editing) {
    this.setState({
      editing
    });
  }

  // handleshow() {
  //   this.setState ((prevState) => {
  //     return {
  //       show : !prevState.show
  //     }
  //   });
  // }

  render() {
    if(!this.state.editing) {
      return (
        <div className="open-add-button" onClick={() => this.setEditing(true)}>
          <button className="button">Add Boat</button>
        </div>  
        ); 
    }
      return (
        <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" class="task-input" ref={input => this.textInput = input} aria-label="Add Boat" onChange={this.handleInputChange}/>
          <div>
            <button className="button add-button"> Submit </button>
             
            <button className="button cancel-button" onClick={() => this.setEditing(false)}>Cancel</button>
          </div>
        </form>
      );
  }
}