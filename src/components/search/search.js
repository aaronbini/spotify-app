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
    let concat = concatStrings(term);
    spotify.search(concat)
      .then(res => {
        console.log('res: ', res);
        this.setFeatured(res);
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = err.message || 'Bad request';
      });
  };
};

//include utility function for adding + to strings with spaces
function concatStrings (string) {
  let stringArray = string.split(' ');
  return stringArray.reduce((accumulator, string) => {
    return `${accumulator}+${string}`;
  }, stringArray[0]);
}
