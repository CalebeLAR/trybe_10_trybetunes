import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1 style={ { backgroundColor: '#35CAD2' } }>Favorites</h1>

      </div>
    );
  }
}
