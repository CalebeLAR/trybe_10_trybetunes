import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { playList } = this.props;
    return (
      <section>
        <section
          style={ {
            display: 'inline-block',
            marginLeft: '50px',
            paddingRight: '600px',
            position: 'absolute',
            border: 'solid black 2px' } }
        >
          <h2>MusicCard</h2>
          {
            playList.map((music, i) => (
              <section
                key={ i }
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
            ))
          }
        </section>
        <br />
      </section>
    );
  }
}

MusicCard.propTypes = {
  playList: PropTypes.arrayOf(PropTypes.object),
};
