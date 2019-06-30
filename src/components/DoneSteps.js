import React from 'react';
import '../stylesheets/DoneSteps.css';

const DoneSteps = ({steps, chosenDate}) => {
  const toPrettier = ({year, month, day}) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day} ${monthNames[month]} ${year}`;
  };

  return (
    <div className="done-steps">
      {chosenDate ?
        <p className="date">{toPrettier(chosenDate)}</p> :
        <p>Select date</p>
      }
      <div className="steps">
        {
          chosenDate ?
            steps.length ?
              steps.map((step, i) =>
                <p key={i} className="step">{step.name}</p>
              ) :
              <p><i>No steps done in that day</i></p> :
            <p></p>
        }
      </div>
    </div>
  );
}

export default DoneSteps;
