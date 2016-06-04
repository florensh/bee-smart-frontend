function DeckService($http, SpringDataRestAdapter, AppSettings) {
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
    var deferred = $http.get(AppSettings.apiUrl + '/decks');
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
