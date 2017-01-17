import template from './search.html';

export default {
  template,
  controller,
  bindings: {
    setFeatured: '<',
    errorMessage: '<'
  }
};

controller.$inject = ['spotifyService'];
function controller (spotify) {

  this.$onInit = () => {
    this.searchTerm = '';
    this.type = 'artist';
    this.searchOptions = [{show: 'Artist', type: 'artist'}, {show: 'Album', type: 'album'}];
  };

  //make http request and then call parent method for setting featured for display
  this.query = (term, type) => {
    spotify.search(term, type)
      .then(res => {
        this.setFeatured(res, type);
      })
      .catch(err => console.log(err));
  };

}
