import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { children } = this.props;
    const { isLoading, user } = this.state;
    console.log(children);
    if (isLoading) {
      return <Loading />;
    }
    return (
      <header
        data-testid="header-component"
      >
        <section
          style={ {
            padding: '40px',
            backgroundColor: 'blue',
            textAlign: 'center' } }
        >
          <h1>_Header_</h1>
          <span data-testid="header-user-name">
            {`Seja bem vindo ${user.name}`}
          </span>
        </section>

        <section>
          {children}
        </section>
      </header>
    );
  }
}
// prop type ainda não ajustada!
Header.propTypes = {
  children: PropTypes.instanceOf(PropTypes.object.isRequired),
};

Header.defaultProps = {
  children: null,
};
