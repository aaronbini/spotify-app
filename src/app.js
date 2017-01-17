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

app.constant('apiUrl', process.env.API_URL || '/api');

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .backgroundPalette('green')
    .warnPalette('red');
}]);

angular.bootstrap(document, [ app.name ]);
