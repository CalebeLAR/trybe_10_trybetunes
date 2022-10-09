import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music } = this.props;
    return (
      <section>
        <section
          style={ {
            backgroundColor: '#69CC8B',
            margin: '10px',
            textAlign: 'center',
            border: 'solid #587C65 5px',
            borderRadius: '25px',
          } }
        >
          <p>{`trackName: ${music.trackName}`}</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            <code>audio</code>
          </audio>
        </section>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};
