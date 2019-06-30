import React from 'react';
import '../stylesheets/ContextMenu.css';

const ContextMenu = props => {
  const { top, left, addStep, toggleRepeat,
          markAsDone, deleteStep, step } = props;
  const style = { top, left };
  return (
    <div className="context-menu" style={style}>
      <p onClick={addStep}>Add a substep</p>
      <p onClick={toggleRepeat}>{step.repeat ? 'Don\'t repeat' : 'Repeat'}</p>
      {markAsDone && <p onClick={markAsDone}>Mark as done</p>}
      {deleteStep && <p onClick={deleteStep}>Delete step</p>}
    </div>
  );
};

export default ContextMenu;
