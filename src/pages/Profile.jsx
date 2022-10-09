import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1 style={ { backgroundColor: '#35ACD2' } }>Profile</h1>

      </div>
    );
  }
}
