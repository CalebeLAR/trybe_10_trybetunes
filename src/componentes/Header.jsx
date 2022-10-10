import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  async componentDidMount() {
    const { isThisPageLoading, permission } = this.props;
    const user = await getUser();
    this.setState({
      isLoading: false,
      user,
    }, () => {
      if (permission) {
        const { isLoading } = this.state;
        isThisPageLoading(isLoading, permission);
      }
    });
  }

  render() {
    const { isLoading, user } = this.state;
    const { permission } = this.props;
    if (isLoading && !permission) {
      return (
        <header
          data-testid="header-component"
          style={ {
            padding: '40px',
            backgroundColor: 'blue',
            textAlign: 'center' } }
        >
          <h1>_Header_</h1>
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
    if (!isLoading) {
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
}

Header.propTypes = {
  isThisPageLoading: PropTypes.func.isRequired,
  permission: PropTypes.bool,
};

Header.defaultProps = {
  permission: false,
};
