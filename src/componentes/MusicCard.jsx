import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.onFavoriteSong = this.onFavoriteSong.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  onFavoriteSong() {
    // busca o album pela função getMusics e depois adiciona a musica selecionada em addsongs
    const { trackId } = this.props;
    this.setState({ isLoading: true }, async () => {
      const request = await getMusics(trackId);
      const song = request.filter((obj) => (obj.trackId === trackId));
      await addSong(song);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isLoading } = this.state;
    const paraOreq9 = (
      // constante criada para adinatar o requisito 09
      <section
        style={ {
          backgroundColor: '#69CC8B',
          display: 'block',
          paddingInline: '250px',
          paddingBottom: '45px',
          textAlign: 'center',
          margin: '15px',
          border: 'solid #587C65 6px',
          borderRadius: '25px',
        } }
      >
        <Loading />
      </section>
    );
    return (
      <section
        style={ {
          backgroundColor: '#69CC8B',
          display: 'block',
          paddingInline: '250px',
          textAlign: 'center',
          margin: '15px',
          border: 'solid #587C65 5px',
          borderRadius: '25px',
        } }
      >
        <p>
          {'Track Name: '}
          <span>{trackName}</span>
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
          style={ {
            display: 'inline-block',
            backgroundColor: 'green',
            position: 'absolute',
            marginLeft: '50px',
            border: 'solid #587C65 5px',
            borderRadius: '25px',
          } }
        >
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            name="checkboxInput"
            onClick={ this.onFavoriteSong }
          />
        </label>
        {(isLoading) && paraOreq9}
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
