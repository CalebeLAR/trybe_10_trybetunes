import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
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
          <p>
            {'Track Name: '}
            <span>{trackName}</span>
          </p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            <code>audio</code>
          </audio>
        </section>
        <br />
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};
