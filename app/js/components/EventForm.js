import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import React from "react";

const datetime = new Date();
const min_datetime = new Date();
let time = new Date();

export default class EventsForm extends React.Component {
  state = {time: time, date: datetime, name: '', time_error: '', name_error: ''};

  handleNameChange = (name, value) => {
    this.setState({name: value});
  };

  handleDateChange = (item, value) => {
    this.setState({date: value});
  };

  handleTimeChange = (item, time) => {
    this.setState({time: item});
  };

  handleSubmit = () => {
    var now = new Date();
    this.setState({date: datetime.setTime(time.getTime())})
    if (this.state.name == ''){
      this.setState({time_error: 'Do not forget to enter the name of the task'});
      return this.setState({date: this.state.date});
    }
    if(now > this.state.time) {
      this.setState({time_error: 'Time no vaild'});
      return this.setState({date: this.state.date});
    } else {
      $.post('event', {name: this.state.name, start: this.state.date});
      this.setState({time: '', date: '', name: '', error: ''});
    }
  }

  render() {
    return (
      <div>
        <Input type='text' error={this.state.name_error} label='Name' name='name' value={this.state.name} onChange={this.handleNameChange.bind(this, 'name')}/>
        <DatePicker minDate={min_datetime} label='Pick a Date' onChange={this.handleDateChange.bind(this, 'date')} value={this.state.date} />
        <TimePicker error={this.state.time_error} label='Finishing time' onChange={this.handleTimeChange} value={this.state.time}/>
        <Button icon='send' label='Create Task' onClick={this.handleSubmit} raised primary />
      </div>
    );
  }
}
