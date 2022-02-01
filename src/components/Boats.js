import React from 'react';
import './Boats.css';
export default function Boats(props) {
  return (
    <div className="task-card" draggable="true" id={props.id} onDragStart={props.onDragStart}>
      {props.name}
    </div>
  ) 
};