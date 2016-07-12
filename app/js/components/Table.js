import Table from 'react-toolbox/lib/table';
import React from "react";
var moment = require('moment');

const EventModel = {
  name: {type: String},
  start: {type: String},
  done: {type: String},
  created: {type: String}
};

export default class EventsTable extends React.Component {
  state = { events: [] };

  constructor(props) {
    super(props);
    this.loadEventsFromServer = this.loadEventsFromServer.bind(this);
  }


  loadEventsFromServer(){
    $.get('events', function (result) {
      for (var index in result) {
        event = result[index];
        event.start = moment(event.start).format("MMMM Do YYYY, h:mm");
        event.created = moment(event.created).format("MMMM Do YYYY, h:mm");
      }
      this.setState({
        events: result
      });
    }.bind(this));
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
