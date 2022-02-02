import React, { Component } from 'react';
import Boatstatus from './Boatstatus';
import AddBoat from './AddBoat';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Board.css';

/**
 * This class is the main class responsible to list the boats and their status. Logic to iterate the 
 * rows in the database table via get api is present here. For modularity and clarity, there are other components 
 * included as their children which will take care of adding boat card and listing the boats.
 */
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boatlist: {},
      draggedId: 0
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

  onDragStart = (e, id) => {
    console.log("id dragged is:", id);
    const dragDetails = {
      id: id,
    }
    this.setState({draggedId: id});
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, id, status) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(this.state.draggedId), status: status })
    };
  
    fetch("http://localhost:3000/boats/updateboat", requestOptions)
      .then(response => response.json())
      .then(data => {})
    window.location.reload(false);
  }

  render() {
    console.log(this.state.boatlist)
    return (
      <Container fluid>
        <Row>
          {
            Object.keys(this.state.boatlist).map((boatState, i) => (
              <Col key={boatState}>
                <h2 className="name-header name">{boatState}</h2>
                {this.state.boatlist[boatState].map((boatInfo, i) => (
                  <div>
                    <ul className='list'>
                      <Boatstatus name={boatInfo.name} status={boatInfo.status} onDragStart={(e, id) => this.onDragStart(e, `${boatInfo.id}`)}
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e, id, status) => this.onDrop(e, `${boatInfo.id}`, `${boatInfo.status}`)} />
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