import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../componentes/Loading';

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
    const albumSpecs = request[0];
    const playList = request.filter((obj) => (obj.kind === 'song'));
    this.setState({
      isLoading: false,
      albumSpecs,
      playList,
    });
  }

  isThisPageLoading(theChildComponentIsLoading, permission) {
    if (permission) {
      this.setState({ isLoading: theChildComponentIsLoading });
    }
  }

  // Assim a requsição passa (albumSpecs && playList) && teste de mesa
  render() {
    const { isLoading, albumSpecs, playList } = this.state;
    return (
      <div data-testid="page-album">
        <Header isThisPageLoading={ this.isThisPageLoading } />
        {
          (isLoading) ? <Loading /> : (
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
                <img src={ albumSpecs.artworkUrl100 } alt="asdfasdf" width={ 600 } />
              </section>
              <MusicCard playList={ playList } albumSpecs={ albumSpecs } />
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
