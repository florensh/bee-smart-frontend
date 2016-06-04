import angular from 'angular';

require('angular-animate');
require('angular-fontawesome');
require('ng-file-upload');
require('lodash');

// angular modules
import constants from './constants';
import onConfig from './on_config';
import onRun from './on_run';
import 'angular-ui-router';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';
import 'angular-resource';
import 'angular-spring-data-rest';

require('angular-flippy');


// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'angular-flippy',
  'ngAnimate',
  'picardy.fontawesome',
  'ngFileUpload',
  'ngResource',
  'spring-data-rest'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
