import template from './display.html';

export default {
  template,
  controller
};

controller.$inject = ['spotifyService'];
function controller (spotify) {
  
  this.$onInit = () => {
    this.errorMessage = null;
    this.featured = null;
    spotify.getJa()
      .then(res => {
        this.jaRule = res;
      })
      .catch(err => console.log(err));
  };

  this.setFeatured = (featured) => {
    this.errorMessage = null;
    this.featured = featured;
    let id = featured.artists.items[0].id;
    spotify.getArtistAlbums(id)
      .then(albums => {
        console.log(albums);
        this.albums = albums.items;
        return this.getTracks(this.albums);
      })
      .then(tracks => {
         //attach the preview uri to each of this.albums
        this.albums = this.albums.map((album, index) => {
          album.preview = tracks[index].items[1].preview_url;
          return album;
        });
      })
      .catch(err => console.log(err));
  };

  this.playTrack = (url) => {
    let audio = new Audio(url);
    audio.play();
  };

  //get tracks from each album to play preview
  this.getTracks = (albums) => {
    let promises = albums.map(album => {
      return spotify.getAlbumTracks(album.id);
    });
    return Promise.all(promises);
  };
};