function StudyStudySessionService($http, SpringDataRestAdapter, AppSettings) {
  'ngInject';

  var _ = require('lodash');

  function StudySession(studySession) {
    if (studySession._resources) {

      studySession.resources = studySession._resources('self', {}, {
        update: {
          method: 'PUT'
        }
      });
      studySession.save = function(callback) {
        studySession.resources.update(studySession, function() {
          callback && callback(studySession);
        });
      };

      studySession.remove = function(callback) {
        studySession.resources.remove(function() {
          callback && callback(studySession);
        });
      };


    } else {
      studySession.save = function(callback) {
        StudySession.resources.save(studySession, function(item, headers) {
          var deferred = $http.get(headers().location);
          return SpringDataRestAdapter.process(deferred).then(function(newStudySession) {
            callback && callback(new StudySession(newStudySession));
          });
        });
      };
    }

    return studySession;
  }

  StudySession.query = function(callback) {
    var deferred = $http.get(AppSettings.apiUrl + '/studySessions');
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      StudySession.resources = data._resources('self');
      callback && callback(_.map(data._embeddedItems, function(item) {
        return new StudySession(item);
      }));
    });
  };

  StudySession.get = function(id, callback) {
    var deferred = $http.get(AppSettings.apiUrl + '/studySessions/' + id);
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      callback && callback(new StudySession(data));
    });
  };

  StudySession.resources = null;
  StudySession.query();
  return StudySession;

}

export default {
  name: 'StudySession',
  fn: StudyStudySessionService
};
