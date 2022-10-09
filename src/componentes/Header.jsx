import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      isLoading: false,
      user,
    });
  }

  render() {
    const { isLoading, user } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    }
    return (
      <header
        data-testid="header-component"
        style={ {
          padding: '40px',
          backgroundColor: 'blue',
          textAlign: 'center' } }
      >
        <h1>_Header_</h1>
        <span data-testid="header-user-name">
          {`Seja bem vindo ${user.name}`}
        </span>
        <nav style={ { backgroundColor: '#25BBD4', marginTop: '5px' } }>
          <Link
            style={ { margin: '30px' } }
            data-testid="link-to-search"
            to="/search"
          >
            Ir ao Search

          </Link>
          <Link
            style={ { margin: '30px' } }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Ir aos favoritos

          </Link>
          <Link
            style={ { margin: '30px' } }
            data-testid="link-to-profile"
            to="/profile"
          >
            Ir para Perfil

          </Link>
        </nav>
      </header>
    );
  }
}
