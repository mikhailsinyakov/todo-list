import React, { Fragment } from 'react';
import '../stylesheets/Goal.css';

const Goal = ({goalNames, moveToPage, deleteGoal}) => {
  if (goalNames.length) {
    return (
      <Fragment>
        {
          goalNames.map(goalName =>
            <p
              key={goalName}
              onClick={() => moveToPage('goal', goalName)}
            >
              <span className="goal-name" >{goalName}</span>
              <span
                className="delete-goal"
                onClick={e => {
                  e.stopPropagation();
                  deleteGoal(goalName);
                }}>
                ✕
              </span>
            </p>
          )
        }
      </Fragment>
    );
  }

  return <h4>You don't have any goals yet</h4>;
};

export default Goal;
