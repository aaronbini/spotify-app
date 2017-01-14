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
  };

  this.query = (term) => {
    spotify.search(term)
      .then(res => {
        this.setFeatured(res);
      })
      .catch(err => console.log(err));
  };
}
