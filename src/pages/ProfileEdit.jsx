import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1 style={ { backgroundColor: '#75A2CE' } }>ProfileEdit</h1>

      </div>
    );
  }
}
