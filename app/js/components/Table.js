import Table from 'react-toolbox/lib/table';
import React from "react";

const EventModel = {
  name: {type: String},
  start: {type: Date},
  done: {type: String}
};

export default class EventsTable extends React.Component {
  state = { events: [] };

  loadEventsFromServer(){
    $.get('events',  (result) => {
      this.setState({events: result});
    });
  }

  getInitialState(){
    return {
      events: []
    };
  }

  componentDidMount() {
    this.loadEventsFromServer();
    setInterval(this.loadEventsFromServer, 10000);
  }

  render() {
    return (
      <div>
        <Table
          model={EventModel}
          source={this.state.events}
        />
      </div>
    );
  }
}
