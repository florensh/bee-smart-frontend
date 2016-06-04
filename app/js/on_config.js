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
      url: '/',
      controller: 'StudyCtrl as studyCtrl',
      templateUrl: 'study.html',
      title: 'Study'
    }).state('Import', {
      url: '/import',
      controller: 'ImportCtrl as importCtrl',
      templateUrl: 'import.html',
      title: 'Import'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
