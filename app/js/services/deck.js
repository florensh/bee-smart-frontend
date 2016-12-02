function DeckService($http, SpringDataRestAdapter, AppSettings, StudySession) {
  'ngInject';

  var _ = require('lodash');

  function Deck(deck) {
    if (deck._resources) {

      deck.resources = deck._resources('self', {}, {
        update: {
          method: 'PUT'
        }
      });
      deck.save = function(callback) {
        deck.resources.update(deck, function() {
          callback && callback(deck);
        });
      };

      deck.remove = function(callback) {
        deck.resources.remove(function() {
          callback && callback(deck);
        });
      };

      deck.getSessions = function(callback) {
        deck._resources('sessions').get(function(sessions) {
          callback && callback(sessions._embedded.studySessions);
        });
      }

      deck.saveSession = function(session, callback) {

        StudySession(session).save(function(item) {
          let link = item._links['self']['href']

          $http({
            method: 'POST',
            url: deck._links['sessions']['href'],
            data: link,
            headers: {
              'Content-Type': 'text/uri-list'
            }
          }).then(function(result) {
            callback && callback(item);
          }, function(error) {
            console.log(error);
          });
        })

      }

    } else {
      deck.save = function(callback) {
        Deck.resources.save(deck, function(item, headers) {
          var deferred = $http.get(headers().location);
          return SpringDataRestAdapter.process(deferred).then(function(newDeck) {
            callback && callback(new Deck(newDeck));
          });
        });
      };
    }

    return deck;
  }

  Deck.query = function(callback) {
    var deferred = $http.get(AppSettings.apiUrl + '/decks?size=50');
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      Deck.resources = data._resources('self');
      callback && callback(_.map(data._embeddedItems, function(item) {
        return new Deck(item);
      }));
    });
  };

  Deck.get = function(id, callback) {
    var deferred = $http.get(AppSettings.apiUrl + '/decks/' + id);
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      callback && callback(new Deck(data));
    });
  };

  Deck.resources = null;
  Deck.query();
  return Deck;

}

export default {
  name: 'Deck',
  fn: DeckService
};
