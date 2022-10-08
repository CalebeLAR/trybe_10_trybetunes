import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      albumSpecs: undefined,
      playList: undefined,
    };
  }

  async componentDidMount() {
    const { musicId } = this.props;
    const request = await getMusics(musicId);
    const albumSpecs = request.filter((obj) => (obj.collectionType === 'Album'))[0];
    const playList = request.filter((obj) => (obj.collectionType !== 'Album'));
    this.setState({
      albumSpecs,
      playList,
    });
  }

  render() {
    const { albumSpecs, playList } = this.state;
    if (playList && albumSpecs) {
      return (
        <section>
          <h2>MusicCard</h2>
          <section
            style={ {
              display: 'inline-block',
              textAlign: 'center',
              marginLeft: '50px',
              borderRadius: '25px',
              backgroundColor: '#A2D9CE' } }
          >
            <h3 data-testid="album-name">{albumSpecs.collectionName}</h3>
            <p data-testid="artist-name">{`${albumSpecs.artistName}`}</p>
            <img src={ albumSpecs.artworkUrl100 } alt="asdfasdf" width={ 700 } />
          </section>
          <section
            style={ {
              display: 'inline-block',
              marginLeft: '50px',
              paddingRight: '600px',
              position: 'absolute',
              border: 'solid black 2px' } }
          >
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
}

MusicCard.propTypes = {
  musicId: PropTypes.string.isRequired,
};
