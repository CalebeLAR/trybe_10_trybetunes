import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Button from '../componentes/Button';
import Loading from '../componentes/Loading';

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
    // Controla os inputs do formulário.
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.checkHasThreeDigitsName());
  }

  onButtonClick() {
    // Muda a chave isloading para true e redireciona a pagina para a rota /search apos uma requisição.
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
      return <Loading />;
    }

    return (
      <div data-testid="page-login">
        <h1 style={ { backgroundColor: '#003BE5' } }>Login</h1>
        <fieldset style={ { backgroundColor: '#00DAFF' } }>
          <form>
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
            <br />
            <Button
              dataTestid="login-submit-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.onButtonClick }
              nameButton="Entrar"
            />
          </form>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
