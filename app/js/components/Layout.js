import React from "react";
import Header from "./Header";
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import EventsTable from "./Table";

const socket = io();

export default class Layout extends React.Component {
  constructor() {
    super();
    socket.on('status update', (res) => console.log(res));
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Header/>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <EventsTable/>
          </Col>
        </Row>
      </Grid>
    );
  }
}
