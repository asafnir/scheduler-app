import React from "react";
import Header from "./Header";
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class Layout extends React.Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Header/>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={12}>

          </Col>
        </Row>
      </Grid>
    );
  }
}
