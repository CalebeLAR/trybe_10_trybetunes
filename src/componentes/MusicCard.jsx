import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.onClickFavorite = this.onClickFavorite.bind(this);
    this.isThisSongAlreadyFavorite = this.isThisSongAlreadyFavorite.bind(this);

    this.state = {
      isLoading: false,
      isChecked: null,
    };
  }

  onClickFavorite() {
    // adiciona a musica aos favoritos e controla o loading;
    const { music } = this.props;
    this.setState({ isLoading: true }, async () => {
      await addSong(music);
      this.setState((prevState) => ({
        isLoading: false,
        isChecked: (prevState.isChecked === null)
          ? !this.isThisSongAlreadyFavorite() : !prevState.isChecked,
      }));
    });
  }

  isThisSongAlreadyFavorite() {
    const { favoriteSongs, trackId } = this.props;
    if (favoriteSongs) {
      const validation = favoriteSongs.some((song) => (song === trackId));
      return validation;
    }
  }

  render() {
    const { previewUrl, trackName, trackId, favoriteSongs } = this.props;
    const { isLoading } = this.state;
    let { isChecked } = this.state;
    if (favoriteSongs && isChecked === null) {
      isChecked = this.isThisSongAlreadyFavorite();
    }

    // if (favoriteSongs && isChecked !== 'esperando favoritos') {
    //   isChecked = isChecked;
    // }
    if (isLoading || !favoriteSongs) {
      return (
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
    }
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
            checked={ isChecked }
            onClick={ this.onClickFavorite }
            readOnly
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
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  music: PropTypes.shape({}).isRequired,
};
