import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { onClick, disabled, nameButton, dataTestid } = this.props;
    return (
      <button
        data-testid={ dataTestid }
        type="button"
        disabled={ disabled }
        onClick={ onClick }
      >
        { nameButton }
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  // type: PropTypes.string.isRequired,
  nameButton: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};
