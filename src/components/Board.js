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
                    <Boatstatus name={boatInfo.name} />
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