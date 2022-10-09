import React, { Component } from 'react';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import Button from '../componentes/Button';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbums from '../componentes/CardAlbums';

const MAX_LENGTH_SEARCH = 2;
export default class Search extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.checkHasTwoDigitsSearchInput = this.checkHasTwoDigitsSearchInput.bind(this);
    this.state = {
      isLoading: false,
      isButtonDisabled: true,
      searchInput: '',
      album: 'sem album',
      artist: '',
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
    // faz uma requisição à API de buscas, limpa o que foi digitado no campo de busca e passa o nome do artista pesquisado para a chave artist.
    this.setState({ isLoading: true }, async () => {
      const { searchInput } = this.state;
      const request = await searchAlbumsAPI(searchInput);
      this.setState({
        searchInput: '',
        isLoading: false,
        album: request,
        artist: searchInput,
      });
    });
  }

  checkHasTwoDigitsSearchInput() {
    // Faz com que o botão de pesquisar só fique habilitado caso o nome digitado tenha 2 ou mais caracteres.
    const { searchInput } = this.state;

    if (searchInput.length < MAX_LENGTH_SEARCH) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  }

  render() {
    const { searchInput, isButtonDisabled, isLoading, album, artist } = this.state;
    if (isLoading) {
      return (
        <div data-testid="page-search">
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
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
        <CardAlbums album={ album } artist={ artist } />
      </div>
    );
  }
}
