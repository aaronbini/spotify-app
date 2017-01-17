import template from './top-tracks.html';

export default {
  template,
  bindings: {
    playTrack: '<',
    topTracks: '<',
    artistName: '<'
  },
  controller
};

controller.$inject = ['$mdSidenav'];
function controller ($mdSidenav) {

  this.toggleTopTracks = () => {
    $mdSidenav('top').toggle();
  };

};