import angular from 'angular';
import spotifyService from './spotify-service';

// create the module to put the resources in
const module = angular.module('services', []);

module.factory('spotifyService', spotifyService);

// export the name of the module for 
// adding as a dependecy at the app level
export default module.name;