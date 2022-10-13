import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../componentes/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.isThisPageLoading = this.isThisPageLoading.bind(this);
    this.fetchMusics = this.fetchMusics.bind(this);
    this.fetchFavorites = this.fetchFavorites.bind(this);
    this.state = {
      isLoading: false,
      albumSpecs: undefined,
      playList: undefined,
      favoriteSongs: undefined,
    };
  }

  async componentDidMount() {
    await this.fetchMusics();
    await this.fetchFavorites();
  }

  fetchMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true }, async () => {
      const request = await getMusics(id);
      const albumSpecs = request[0];
      const playList = request.filter((obj) => (obj.kind === 'song'));
      this.setState({
        isLoading: false,
        albumSpecs,
        playList,
      });
    });
  }

  fetchFavorites() {
    this.setState({ isLoading: true }, async () => {
      const request = await getFavoriteSongs();
      const favoriteSongs = request.map((song) => (song && song.trackId));
      this.setState({
        isLoading: false,
        favoriteSongs,
      });
    });
  }

  isThisPageLoading(theChildComponentIsLoading, permission) {
    if (permission) {
      this.setState({ isLoading: theChildComponentIsLoading });
    }
  }

  render() {
    const { isLoading, albumSpecs, playList, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header isThisPageLoading={ this.isThisPageLoading } />
        {
          (isLoading || !albumSpecs || !playList) ? <Loading /> : (
            <div>
              <h1 style={ { backgroundColor: '#35D285' } }>Album</h1>
              <section
                style={ {
                  display: 'inline-block',
                  textAlign: 'center',
                  marginLeft: '50px',
                  borderRadius: '25px',
                  backgroundColor: '#A2D9CE' } }
              >
                <h3 data-testid="album-name">{albumSpecs.collectionName}</h3>
                <p data-testid="artist-name">{albumSpecs.artistName}</p>
                <img
                  src={ albumSpecs.artworkUrl100 }
                  alt={ albumSpecs.collectionName }
                  width={ 600 }
                />
              </section>
              <section
                style={ {
                  display: 'inline-block',
                  marginLeft: '50px',
                  position: 'absolute',
                  border: 'solid black 2px' } }
              >
                <h2>MusicCard</h2>
                {
                  (albumSpecs && playList) && playList.map((music, i) => (
                    <MusicCard
                      key={ i }
                      previewUrl={ music.previewUrl }
                      trackName={ music.trackName }
                      trackId={ music.trackId }
                      music={ music }
                      favoriteSongs={ favoriteSongs }
                    />))
                }
              </section>
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
