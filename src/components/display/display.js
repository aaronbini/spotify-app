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
    this.featured = featured;
  };
};