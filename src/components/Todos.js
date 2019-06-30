import React from 'react';
import Steps from './Steps';
import '../stylesheets/Todos.css';

const Todos = ({goal, moveToPage, changeSteps}) => {
  return (
    <div className="todos">
      <h1>{goal.name}</h1>
      <Steps
        steps={goal.steps}
        doneSteps={goal.doneSteps}
        changeSteps={changeSteps}
      />
      <button
        onClick={() => moveToPage('goals-list')}
        className="back-button"
      >
        Back to List
      </button>
      <button
        onClick={() => moveToPage('progress', goal.name)}
        className="show-progress-button"
      >
        Show Progress
      </button>
    </div>
  );
};

export default Todos;
