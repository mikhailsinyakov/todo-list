import React, { Component } from 'react';
import GoalsList from './GoalsList';
import Todos from './Todos';
import Progress from './Progress';
import '../stylesheets/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      page: {
        name: 'goals-list',
        goalName: null
      }
    };

    this.addGoal = this.addGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.changeSteps = this.changeSteps.bind(this);
    this.moveToPage = this.moveToPage.bind(this);
  }

  getGoals() {
    const goalsString = localStorage.getItem('goals');
    if (goalsString) {
      const goals = JSON.parse(goalsString);
      this.setState({goals});
    }
  }

  saveGoals() {
    const { goals } = this.state;
    const goalsString = JSON.stringify(goals);
    localStorage.setItem('goals', goalsString);
  }

  moveToPage(name, goalName) {
    this.setState({
      page: {
        name,
        goalName: goalName || null
      }
    });
  }

  addGoal(name) {
    if (!name) {
      return new Error('You should enter your goal');
    }

    const { goals } = this.state;
    const goalsWithThatName = goals.filter(goal => goal.name === name);
    const isNameAlreadyAdded = goalsWithThatName.length > 0;

    if (isNameAlreadyAdded) {
      return new Error('Your goals should have unique names');
    }

    const goal = {
      name,
      steps: [],
      doneSteps: []
    };
    this.setState({
      goals: [ ...goals, goal ]
    }, this.saveGoals);
  }

  deleteGoal(name) {
    this.setState({
      goals: this.state.goals.filter(goal => goal.name !== name)
    }, this.saveGoals);
  }

  changeSteps(changedSteps, changedDoneSteps) {
    this.setState({
      goals: this.state.goals.map(goal => {
        if (goal.name === this.state.page.goalName) {
          return {
            ...goal,
            steps: changedSteps,
            doneSteps: changedDoneSteps
          };
        }
        return goal;
      })
    }, this.saveGoals);
  }

  componentDidMount() {
    this.getGoals();
  }

  render() {
    const { goals, page } = this.state;
    const goal = goals.filter(goal => goal.name === page.goalName)[0];
    return (
      <div className="app">
        {
          page.name === 'goals-list' ?
            <GoalsList
              goalNames={goals.map(goal => goal.name)}
              addGoal={this.addGoal}
              deleteGoal={this.deleteGoal}
              moveToPage={this.moveToPage}
            /> :
            page.name === 'goal' ?
              <Todos
                goal={goal}
                changeSteps={this.changeSteps}
                moveToPage={this.moveToPage}
              /> :
              <Progress
                goal={goal}
                moveToPage={this.moveToPage}
              />
        }
      </div>
    );
  }
}

export default App;
