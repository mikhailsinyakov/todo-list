import React, { Component } from 'react';
import '../stylesheets/ToggledForm.css';

class ToggledForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputVisible: false,
      input: '',
      error: false
    };

    this.inputElement = React.createRef();
    this.toggleInput = this.toggleInput.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleInput() {
    this.setState({
      isInputVisible: !this.state.isInputVisible,
      input: ''
    });
  }

  showInput() {
    if (this.inputElement.current) {
      this.inputElement.current.focus();
    }
    this.setState({
      isInputVisible: true,
      input: ''
    });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      input: value ? value[0].toUpperCase() + value.substring(1) : ''
    });
  }

  handleFocus() {
    if (this.state.error) {
      this.setState({
        error: false,
        input: ''
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const error = this.props.onSubmit(this.state.input);
    if (error) {
      this.inputElement.current.blur();
      this.setState({
        error: true,
        input: error.message
      });
    } else {
      this.toggleInput();
    }
  }

  render() {
    const { isInputVisible, input, error } = this.state;
    if (isInputVisible) {
      return (
        <form>
          <input
            ref={this.inputElement}
            className={error ? 'error' : ''}
            type="text"
            value={input}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            autoFocus
          />
          <button onClick={this.handleSubmit}>Add</button>
        </form>
      );
    }
    return (
      <form>
        <button onClick={this.toggleInput}>Add a New {this.props.add}</button>
      </form>
    );
  }
}

export default ToggledForm;
