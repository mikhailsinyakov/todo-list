import React, { Component } from 'react';
import Month from './Month';
import '../stylesheets/Calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth()
    };

    this.toPrevMonth = this.toPrevMonth.bind(this);
    this.toNextMonth = this.toNextMonth.bind(this);
  }

  toMonthName(month) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
  }

  toPrevMonth() {
    let month = this.state.month - 1;
    if (month === -1) {
      this.setState({
        year: this.state.year - 1,
        month: 11
      });
    } else this.setState({ month });
  }

  toNextMonth() {
    let month = this.state.month + 1;
    if (month === 12) {
      this.setState({
        year: this.state.year + 1,
        month: 0
      });
    } else this.setState({ month });
  }

  getDays() {
    const { year, month } = this.state;
    const days = [];
    let week = 1;
    for (let dayNum = 1; ; dayNum++) {
      const date = new Date(year, month, dayNum);
      if (date.getMonth() === month) {
        const weekDay = date.getDay() === 0 ? 7 : date.getDay();
        if (dayNum !== 1 && weekDay === 1) week++;
        days.push({ week, dayNum, weekDay });
      } else break;
    }
    return days;
  }

  render() {
    const { getDoneStepsByDate, chooseDate, chosenDate } = this.props;
    return (
      <div className="calendar">
        <span className="arrow-button" onClick={this.toPrevMonth}>←</span>
        {this.toMonthName(this.state.month)} {this.state.year}
        <span className="arrow-button" onClick={this.toNextMonth}>→</span>
        <Month
          {...this.state}
          days={this.getDays()}
          getDoneStepsByDate={getDoneStepsByDate}
          chooseDate={chooseDate}
          chosenDate={chosenDate}
        />
      </div>
    );
  }
}

export default Calendar;
