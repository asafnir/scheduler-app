import React from "react";
import Header from "./Header";
import EventsTable from "./Table";
import {Grid, Row, Col} from 'react-bootstrap/lib/';
import {Snackbar} from 'react-toolbox';

const socket = io();

export default class Layout extends React.Component {
  state = {active: false, task: ''}

  getInitialState() { return {active: false, task: ''} }

  componentDidMount() {
    socket.on('event done',  (data) => {
      this.setState({ active: true, task: data.res.name });
      console.log(data);
    });
  }

  handleSnackbarClick = () => {
    this.setState({ active: false });
  };

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
        <Snackbar
            action='Dismiss'
            active={this.state.active}
            icon='question_answer'
            timeout={8000}
            label={this.state.task + ' Just run and finish successfully'}
            onClick={this.handleSnackbarClick}
            onTimeout={this.handleSnackbarClick}
            ref='snackbar'
            type='accept'
          />
      </Grid>
    );
  }
}
