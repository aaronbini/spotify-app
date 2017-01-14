import angular from 'angular';
import components from './components';
import services from './services';
import md from 'angular-material';
import './scss/main.scss';
import 'angular-material/angular-material.css';

const app = angular.module('spotifyApp', [
  components,
  services,
  md
]);

//change this to process.env.API_URL
app.constant('apiUrl', 'http://localhost:3000/api');

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .backgroundPalette('green')
    .warnPalette('red');
}]);

angular.bootstrap(document, [ app.name ]);
