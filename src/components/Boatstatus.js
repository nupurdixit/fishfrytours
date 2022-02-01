import React from 'react';
import Boats from './Boats';
import './Boatstatus.css';


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