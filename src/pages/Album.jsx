import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.isThisPageLoading = this.isThisPageLoading.bind(this);
    this.state = {
      isLoading: true,
      albumSpecs: undefined,
      playList: undefined,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    const albumSpecs = request.filter((obj) => (obj.collectionType === 'Album'))[0];
    const playList = request.filter((obj) => (obj.collectionType !== 'Album'));
    this.setState({
      albumSpecs,
      playList,
    });
  }

  isThisPageLoading(theChildComponentIsLoading) {
    this.setState({ isLoading: theChildComponentIsLoading });
  }

  render() {
    const { isLoading, albumSpecs, playList } = this.state;
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
        <section
          style={ {
            display: 'inline-block',
            textAlign: 'center',
            marginLeft: '50px',
            borderRadius: '25px',
            backgroundColor: '#A2D9CE' } }
        >
          <h3 data-testid="album-name">{`${albumSpecs.collectionName}`}</h3>
          <p data-testid="artist-name">{`${albumSpecs.artistName}`}</p>
          <img src={ albumSpecs.artworkUrl100 } alt="asdfasdf" width={ 700 } />
        </section>
        {
          (playList)
          && playList.map((music, i) => <MusicCard key={ i } music={ music } />)
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
