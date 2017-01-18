import template from './display.html';

export default {
  template,
  controller
};

controller.$inject = ['spotifyService'];
function controller (spotify) {

  //helper function to clean up titles
  function titleClean (string) {
    if (string.indexOf('-') > -1) {
      return string.split(' -')[0];
    }
    if (string.indexOf('(') > -1) {
      return string.split(' (')[0];
    }
    return string;
  }
  
  this.$onInit = () => {
    spotify.getJa()
      .then(res => {
        this.jaRule = res;
      })
      .catch(err => console.log(err));
  };

  this.attachTracks = (tracks) => {
     //attach the preview uri to each of this.albums
    this.albums = this.albums.map((album, index) => {
      //check for existence of track because not always there
      if (tracks[index].items[1]) {
        album.preview = tracks[index].items[1].preview_url;
      }
      return album;
    });
  };

  //set featured artist, attach unique albums, and attach playable track to album
  this.setFeatured = (featured, type) => {
    this.errorMessage = null;
    this.featured = featured;
    //set variable to hold Promises
    let resolve;

    if (type === 'artist') {
      this.artist = true; 
      this.artistName = this.featured.artists.items[0].name;
      let id = featured.artists.items[0].id;
      resolve = Promise.all([
        spotify.getArtistAlbums(id),
        spotify.getTopTracks(id)
      ]); 
    } else {
      this.artist = false; 
      this.albums = featured.albums.items;
      resolve = Promise.resolve([this.albums, null]); 
    }

    resolve.then(([albums, tracks]) => {
      if (tracks) { 
        this.topTracks = tracks;
        this.topTracks.tracks = this.topTracks.tracks.map(track => {
          track.name = titleClean(track.name);
          return track;
        }).map(track => {
          track.album.name = titleClean(track.album.name);
          return track;
        }); 
      };
      if (type === 'artist') { this.albums = albums.items; }
      return this.getTracks(this.albums);
    })
    .then(tracks => {
      this.attachTracks(tracks);
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