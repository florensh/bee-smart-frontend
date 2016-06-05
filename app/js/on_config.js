function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('Home', {
      url: '/home',
      controller: 'ExampleCtrl as home',
      templateUrl: 'home.html',
      title: 'Home'
    }).state('Study', {
      url: '/study',
      controller: 'StudyCtrl as studyCtrl',
      templateUrl: 'study.html',
      title: 'Study'
    }).state('Import', {
      url: '/import',
      controller: 'ImportCtrl as importCtrl',
      templateUrl: 'import.html',
      title: 'Import'
    }).state('Decks', {
      url: '/',
      controller: 'DecksCtrl as decksCtrl',
      templateUrl: 'decks.html',
      title: 'Decks'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
