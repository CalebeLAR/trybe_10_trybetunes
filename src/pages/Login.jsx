import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const MAX_LENGTH_NAME = 2;
export default class Login extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.checkHasThreeDigitsName = this.checkHasThreeDigitsName.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      nameInput: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  onInputChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.checkHasThreeDigitsName());
  }

  onButtonClick() {
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name: nameInput });
      history.push('/search');
    });
  }

  checkHasThreeDigitsName() {
    // Faz com que o botão para entrar só fique habilitado caso o nome digitado tenha 3 ou mais caracteres.
    const { nameInput } = this.state;

    if (nameInput.length <= MAX_LENGTH_NAME) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  }

  render() {
    const { nameInput, isButtonDisabled, isLoading } = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }

    return (
      <div data-testid="page-login">
        <h1 style={ { backgroundColor: '#003BE5' } }>Login</h1>
        <fieldset style={ { backgroundColor: '#00DAFF' } }>
          <form id="nameInput">
            <label htmlFor="nameInput">
              <input
                data-testid="login-name-input"
                id="nameInput"
                type="text"
                name="nameInput"
                value={ nameInput }
                placeholder="Digite seu nome"
                onChange={ this.onInputChange }
              />
            </label>
          </form>
          <button
            form="nameInput"
            data-testid="login-submit-button"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.onButtonClick }
          >
            Entrar
          </button>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
