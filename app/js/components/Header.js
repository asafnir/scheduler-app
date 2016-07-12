import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import {Button, Dialog} from 'react-toolbox';
import EventsForm from './EventForm'

export default class Header extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <div>
        <Col xs={12} md={6}>
          <h1>Task manager</h1>
        </Col>
        <Col xs={12} md={6}>
          <Button style={{ top: '1.5rem', float: 'right'}} icon='add' floating accent mini onClick={this.handleToggle}/>
          <Dialog
            actions={this.actions}
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title='Add new task'>
            <EventsForm/>
          </Dialog>
        </Col>
      </div>
    );
  }
}
