import React, { Component } from 'react';
import Header from '../componentes/Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header>
          <h1 style={ { backgroundColor: '#6BD4F8 ' } }>Search</h1>
        </Header>
      </div>
    );
  }
}
