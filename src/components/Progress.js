import React, { Component } from 'react';
import Calendar from './Calendar';
import DoneSteps from './DoneSteps';
import '../stylesheets/Progress.css';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: null
    };

    this.getDoneStepsByDate = this.getDoneStepsByDate.bind(this);
    this.chooseDate = this.chooseDate.bind(this);
  }

  chooseDate(year, month, day) {
    const { chosenDate } = this.state;
    if (!chosenDate ||
        chosenDate.year !== year ||
        chosenDate.month !== month ||
        chosenDate.day !== day) {
      this.setState({
        chosenDate: { year, month, day }
      });
    }
  }

  getDoneStepsByDate(date) {
    const { goal } = this.props;
    if (!date) return [];
    const { year, month, day } = date;
    return goal.doneSteps.filter(step => {
      const doneDate = new Date(step.done);
      const stepYear = doneDate.getFullYear();
      const stepMonth = doneDate.getMonth();
      const stepDay = doneDate.getDate();
      if (year === stepYear && month === stepMonth && day === stepDay) {
        return true;
      }
      return false;
    });
  }

  render() {
    const { goal, moveToPage } = this.props;
    const { chosenDate } = this.state;
    return (
      <div className="progress">
        <h1>{goal.name}</h1>
        <Calendar
          doneSteps={goal.doneSteps}
          getDoneStepsByDate={this.getDoneStepsByDate}
          chooseDate={this.chooseDate}
          chosenDate={chosenDate}
        />
        <DoneSteps
          steps={this.getDoneStepsByDate(chosenDate)}
          chosenDate={chosenDate}
        />
        <button
          onClick={() => moveToPage('goal', goal.name)}
          className="back-to-goal-button"
        >
          Back to Steps
        </button>
      </div>
    );
  }
}

export default Progress;
