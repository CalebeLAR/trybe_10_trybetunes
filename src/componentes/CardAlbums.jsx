import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbums extends Component {
  render() {
    const { album, artist } = this.props;
    if (album === 'sem album') {
      return null;
    }
    if (album.length === 0) {
      return <h1>Nenhum álbum foi encontrado</h1>;
    }
    return (
      <div>
        <p>{`Resultado de álbuns de: ${artist}`}</p>
        <div
          style={
            { backgroundColor: '#E9EC63',
              marginTop: '5px' }
          }
        >
          {album.map((song, i) => (
            <div key={ i }>
              <p>{`${song.collectionName}`}</p>
              <Link
                data-testid={ `link-to-album-${song.collectionId}` }
                to={ `/album/${song.collectionId}` }
              >
                Detalhes
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
CardAlbums.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
  })),
  artist: PropTypes.string.isRequired,
};

CardAlbums.defaultProps = {
  album: 'sem album',
};
