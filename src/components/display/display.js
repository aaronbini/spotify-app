import template from './display.html';

export default {
  template,
  controller
};

controller.$inject = ['spotifyService'];
function controller (spotify) {
  
  this.$onInit = () => {
    // this.errorMessage = null;
    // this.featured = null;
    spotify.getJa()
      .then(res => {
        this.jaRule = res;
      })
      .catch(err => console.log(err));
  };

  //set featured artist, attach unique albums, and attach playable track to album
  this.setFeatured = (featured) => {
    this.errorMessage = null;
    this.featured = featured;
    let id = featured.artists.items[0].id;
    spotify.getArtistAlbums(id)
      .then(albums => {
        this.albums = albums.items;
        return this.getTracks(this.albums);
      })
      .then(tracks => {
         //attach the preview uri to each of this.albums
        this.albums = this.albums.map((album, index) => {
          
          //check for existence of track because not always there
          if (tracks[index].items[1]) {
            album.preview = tracks[index].items[1].preview_url;
          }
          return album;
        });
      })
      .catch(err => console.log(err));
  };

  //handle playing, pausing, and starting new track
  this.playTrack = (url) => {
    
    //is the track already being played?
    if (this.preview === url && this.playing) {
      this.playing = false;
      this.audio.pause();
      return;
    //is the selected track paused?
    } else if (this.preview === url && !this.playing) {
      this.playing = true;
      this.audio.play();
      return;
    }

    //selected track is new if here
    //
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio(url);
    this.audio.play();
    this.playing = true;
    this.preview = url;
  };

  //get tracks from each album to play preview
  this.getTracks = (albums) => {
    let promises = albums.map(album => {
      return spotify.getAlbumTracks(album.id);
    });
    return Promise.all(promises);
  };
};