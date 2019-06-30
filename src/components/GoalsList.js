import React from 'react';
import Goal from './Goal';
import ToggledForm from './ToggledForm';
import '../stylesheets/GoalsList.css';

const GoalsList = ({goalNames, moveToPage, addGoal, deleteGoal}) => {
  return (
    <div className="goals-list">
      <h1>My Goals</h1>
      <Goal
        goalNames={goalNames}
        moveToPage={moveToPage}
        deleteGoal={deleteGoal}
      />
      <ToggledForm add="Goal" onSubmit={addGoal} />
    </div>
  );
}

export default GoalsList;
