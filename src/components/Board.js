import React, { Component } from 'react';
import Boatstatus from './Boatstatus';
import AddBoat from './AddBoat';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boatlist: {},
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    fetch("http://localhost:3000/boats")
      .then(response => response.json())
      .then(data => {
        console.log("fata inside board.js is:", data);
        const dataByStatus = {}
        dataByStatus['DOCKED'] = data.filter((boat) => boat.status == 'DOCKED')
        dataByStatus['OUTBOUND_TO_SEA'] = data.filter((boat) => boat.status == 'OUTBOUND_TO_SEA')
        dataByStatus['INBOUND_TO_HARBOR'] = data.filter((boat) => boat.status == 'INBOUND_TO_HARBOR')
        dataByStatus['MAINTENANCE'] = data.filter((boat) => boat.status == 'MAINTENANCE')


        this.setState({
          boatlist: dataByStatus
        });
        console.log("boat list is:", dataByStatus);
      })
  }

  onDragStart = (e, fromBoatStatusList) => {
    const dragDetails = {
      id: e.currentTarget.id,
      fromBoatStatusList: fromBoatStatusList
    }
    console.log("id dragged is:", dragDetails.id);
  }

  onDragOver = (e) => {
    e.preventDefault();
  } 

  onDrop = (e, boatId) => {
    console.log("dropped id is: ", boatId);
  }

render() {
  console.log(this.state.boatlist)
  return (
    <Container fluid>
      <Row>
        {
          Object.keys(this.state.boatlist).map((boatState, i) => (
            <Col key={boatState}>
              <h2 className={`name-header name-${i + 1}`}>{boatState}</h2>
              {this.state.boatlist[boatState].map((boatInfo, i) => (
                <div className="board" key={boatInfo}>
                  <ul className="list-wrapper">
                    <Boatstatus name={boatInfo.name} onDragStart = {(e, fromBoatStatusList) => this.onDragStart(e, `${boatInfo.id}`)}
                    onDragOver = {(e) => this.onDragOver(e)}
                    onDrop = {(e, boatId) => this.onDrop(e, `${boatInfo.id}`)} />
                  </ul>
                </div>
              ))}
            </Col>
          )
          )}
      </Row>
      <AddBoat boatlist={this.state.boatlist} />
    </Container>
  );
}
}