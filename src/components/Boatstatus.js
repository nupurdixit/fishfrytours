import React from 'react';
import Boats from './Boats';
// import AddBoat from './AddBoat';
import './Boatstatus.css';


export default class Boatstatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boatstatus: [{}]
    }
  }


  render() {

    <Boats name={this.props.name} onDragStart={this.props.onDragStart} />


    return (
      <div>
        <ul className="list" onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
          {this.props.name}
        </ul>
      </div>
    );


  }

}