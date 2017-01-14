import template from './ja-rule.html';

export default {
  template,
  bindings: {
    jaRule: '<'
  },
  controller
};

controller.$inject = ['$mdSidenav', 'spotifyService'];
function controller ($mdSidenav, spotify) {

  this.$onInit = () => {
    this.albums = this.jaRule.items;
    this.getTracks(this.albums)
      .then(data => {
        //attach the preview uri to each of this.albums
        this.albums = this.albums.map((album, index) => {
          album.preview = data[index].items[1].preview_url;
          return album;
        });
      });
    
      
  };

  this.getTracks = (albums) => {
    let promises = albums.map(album => {
      return spotify.getAlbumTracks(album.id);
    });
    return Promise.all(promises);
  };

  this.toggleJa = () => {
    $mdSidenav('ja').toggle();
  };

  this.playTrack = (url) => {
    let audio = new Audio(url);
    audio.play();
  };

}