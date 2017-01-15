import template from './ja-rule.html';

export default {
  template,
  bindings: {
    jaRule: '<',
    playTrack: '<',
    getTracks: '<'
  },
  controller
};

controller.$inject = ['$mdSidenav'];
function controller ($mdSidenav) {

  this.$onInit = () => {
    this.albums = this.jaRule.items;
    this.getTracks(this.albums)
      .then(tracks => {
        //attach the preview uri to each of this.albums
        this.albums = this.albums.map((album, index) => {
          //check for existence of track
          if (tracks[index].items[1]) {
            album.preview = tracks[index].items[1].preview_url;
          }
          return album;
        });
      });
  };

  this.toggleJa = () => {
    $mdSidenav('ja').toggle();
  };

}