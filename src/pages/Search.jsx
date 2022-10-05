import React, { Component } from 'react';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import Button from '../componentes/Button';

const MAX_LENGTH_SEARCH = 2;
export default class Search extends Component {
  constructor() {
    super();
    this.isThisPageLoading = this.isThisPageLoading.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.checkHasTwoDigitsSearchInput = this.checkHasTwoDigitsSearchInput.bind(this);
    this.state = {
      isLoading: true,
      isButtonDisabled: true,
      searchInput: '',
    };
  }

  onInputChange({ target }) {
    // Controla os inputs do formulário.
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.checkHasTwoDigitsSearchInput());
  }

  onButtonClick() {
    // faz uma requisição à API de buscas e limpa o que foi digitado no campo de busca.
    console.log('click');
  }

  checkHasTwoDigitsSearchInput() {
    // Faz com que o botão para entrar só fique habilitado caso o nome digitado tenha 3 ou mais caracteres.
    const { searchInput } = this.state;

    if (searchInput.length < MAX_LENGTH_SEARCH) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  }

  isThisPageLoading(theChildComponentIsLoading) {
    this.setState({ isLoading: theChildComponentIsLoading });
  }

  render() {
    const { searchInput, isButtonDisabled, isLoading } = this.state;
    if (isLoading) {
      return (
        <div data-testid="page-search">
          <Header isThisPageLoading={ this.isThisPageLoading } />
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-search">
        <Header isThisPageLoading={ this.isThisPageLoading } />
        <h1 style={ { backgroundColor: '#6BD4F8 ' } }>Search</h1>
        <fieldset style={ { backgroundColor: '#00DAFF' } }>
          <form>
            <label htmlFor="searchInput">
              <input
                data-testid="search-artist-input"
                id="searchInput"
                type="text"
                name="searchInput"
                value={ searchInput }
                placeholder="O que você quer ouvir hoje?"
                onChange={ this.onInputChange }
              />
            </label>
            <br />
            <Button
              dataTestid="search-artist-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.onButtonClick }
              nameButton="Pesquisar"
            />
          </form>
        </fieldset>
      </div>
    );
  }
}
