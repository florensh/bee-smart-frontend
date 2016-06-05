function StudyService($http) {
  'ngInject';

  const service = {};

  service.currentDeck;

  return service;

}

export default {
  name: 'StudyService',
  fn: StudyService
};
