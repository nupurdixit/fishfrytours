import React from 'react';
import Boats from './Boats';
import './Boatstatus.css';

/**
 * This class displays the list of boatcards with the help of child class named Boats. It has the drag props so as to make 
 * sure the user can drag and drop the boats in order to change the status.
 */
export default class Boatstatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boatstatus: [{}]
    }
  }

  render() {
    return (
      <div>
        <ul onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
          <Boats name={this.props.name} onDragStart={this.props.onDragStart} />
        </ul>
      </div>
    );


  }

}