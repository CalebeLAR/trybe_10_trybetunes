import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div
        style={ {
          width: 'max-content',
          height: 'max-content',
        } }
      >
        <h1>Carregando...</h1>
      </div>
    );
  }
}
