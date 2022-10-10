import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import Loading from '../componentes/Loading';

export default class Album extends Component {
  constructor() {
    super();
    this.isThisPageLoading = this.isThisPageLoading.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  isThisPageLoading(theChildComponentIsLoading, permission) {
    if (permission) {
      this.setState({ isLoading: theChildComponentIsLoading });
    }
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header isThisPageLoading={ this.isThisPageLoading } />
        {
          (isLoading) ? <Loading /> : (
            <div>
              <h1 style={ { backgroundColor: '#35D285' } }>Album</h1>
              <MusicCard musicId={ id } />
            </div>
          )
        }
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
