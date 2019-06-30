import React, { Component, Fragment } from 'react';
import ToggledForm from './ToggledForm';
import ContextMenu from './ContextMenu';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentStep: null,
      contextMenu: null
    };
    this.prevStepScrollY = null;
    this.formElement = React.createRef();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.modifySteps = this.modifySteps.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.removeContextMenu = this.removeContextMenu.bind(this);
    this.findStepChildren = this.findStepChildren.bind(this);
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  savePrevStepScrollY() {
    this.prevStepScrollY = window.scrollY;
  }

  scrollToPrevStep() {
    if (this.prevStepScrollY !== null) {
      window.scrollTo(0, this.prevStepScrollY);
      this.prevStepScrollY = null;
    }
  }

  showAddStepForm(parentName) {
    this.savePrevStepScrollY();
    this.scrollToBottom();
    this.formElement.current.showInput();
    this.setState({
      parentStep: parentName
    });
  }

  onFormSubmit(name) {
    const err = this.modifySteps('add', name, this.state.parentStep);
    if (err) return err;
    this.scrollToPrevStep();
    this.setState({
      parentStep: null
    });
  }

  findStepChildren(stepName) {
    const { steps } = this.props;
    const children = steps.filter(step => step.parentName === stepName);
    const unDoneChildren = children.filter(step => !step.done);
    return unDoneChildren;
  }

  handleRightClick(e) {
    e.preventDefault();
    const { steps } = this.props;
    const top = e.nativeEvent.clientY + window.scrollY + 'px';
    const left = e.nativeEvent.clientX + 'px';
    const stepName = e.target.id;
    const step = steps.filter(step => step.name === stepName)[0];
    const stepChildren = this.findStepChildren(stepName);

    const contextMenu = {
      top,
      left,
      addStep: this.showAddStepForm.bind(this, stepName),
      toggleRepeat: this.modifySteps.bind(this, 'toggleRepeat', stepName),
      markAsDone: !stepChildren.length ?
        this.modifySteps.bind(this, 'markAsDone', stepName) :
        null,
      deleteStep: !stepChildren.length ?
        this.modifySteps.bind(this, 'delete', stepName) :
        null,
      step
    };
    this.setState({ contextMenu });
  }

  modifySteps(action, name, parentName = null) {
    if (action === 'markAsDone' || action === 'delete') {
      if (this.state.parentStep) {
        this.setState({ parentStep: null });
      }
    }
    const { steps, doneSteps, changeSteps } = this.props;
    const alreadyExist = (() => {
      for (const step of this.props.steps) {
        if (step.name === name) return true;
      }
      return false;
    })();

    switch (action) {
      case 'add' :
        if (!name) return Error('You should enter the next step');
        if (alreadyExist) return Error('Your steps should have unique names');
        changeSteps([
          ...steps,
          {
            name,
            parentName,
            repeat: false
          }
        ], doneSteps);
        break;
      case 'toggleRepeat': {
        if (!alreadyExist) {
          console.error('This step does not exist');
          return;
        }
        const changedSteps = steps.map(step => {
          if (step.name === name) {
            return {
              ...step,
              repeat: !step.repeat
            }
          }
          return step;
        });
        changeSteps(
          changedSteps,
          doneSteps
        )
        break;
      }
      case 'markAsDone': {
        if (!alreadyExist) {
          console.error('This step does not exist');
          return;
        }
        const changedSteps = steps.filter(step =>
          step.name !== name || step.repeat
        );
        const changedDoneSteps = [...doneSteps, { name, done: new Date() }];
        changeSteps(changedSteps, changedDoneSteps);
        break;
      }
      case 'delete':
        if (!alreadyExist) {
          console.error('This step does not exist');
          return;
        }
        changeSteps(
          steps.filter(step => step.name !== name),
          doneSteps
        );
        break;
      default:
        return;
    }
  }

  toSortedSteps() {
    const { steps } = this.props;
    const sortedSteps = [];
    const addChildren = (step, level) => {
      if (step.name !== null) {
        sortedSteps.push({...step, level});
      }
      const children = steps.filter(childStep =>
        childStep.parentName === step.name
      );
      if (!children.length) return;
      for (const child of children) {
        addChildren(child, level + 1);
      }
    };
    addChildren({name: null}, -1);
    return sortedSteps;
  }

  removeContextMenu() {
    this.setState({ contextMenu: null });
  }

  componentDidMount() {
    window.addEventListener('click', this.removeContextMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.removeContextMenu);
  }

  render() {
    const { contextMenu } = this.state;
    const sortedSteps = this.toSortedSteps();
    return (
      <Fragment>
        <div className="steps">
          {
            !sortedSteps.length ?
              <h4>You have not added steps</h4> :
              sortedSteps.map(step => {
                const style = { marginLeft: step.level * 2 + 'rem' };
                return (
                  <p
                    key={step.name}
                    id={step.name}
                    style={style}
                    onContextMenu={this.handleRightClick}
                  >
                    {step.name} {step.repeat && '↻'}
                  </p>
                );
              })
          }
        </div>
        <ToggledForm
          ref={this.formElement}
          add="Step"
          onSubmit={name => this.onFormSubmit(name)}
        />
        {contextMenu && <ContextMenu {...contextMenu} />}
      </Fragment>
    );
  }
}

export default Steps;
