import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import MusicCard from '../componentes/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.isThisPageLoading = this.isThisPageLoading.bind(this);
    this.state = {
      isLoading: true,
    };
  }

  isThisPageLoading(theChildComponentIsLoading) {
    this.setState({ isLoading: theChildComponentIsLoading });
  }

  render() {
    const { isLoading } = this.state;
    const { match: { params: { id } } } = this.props;
    if (isLoading) {
      return (
        <div data-testid="page-album">
          <Header isThisPageLoading={ this.isThisPageLoading } />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header isThisPageLoading={ this.isThisPageLoading } />
        <h1 style={ { backgroundColor: '#35D285' } }>Album</h1>
        <MusicCard musicId={ id } />
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
