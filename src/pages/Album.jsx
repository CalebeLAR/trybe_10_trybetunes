import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header>
          <h1 style={ { backgroundColor: '#35D285' } }>Album</h1>
        </Header>
      </div>
    );
  }
}
