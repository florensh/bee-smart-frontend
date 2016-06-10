function StudyCtrl($scope, Deck, $state, StudyService, StudySession) {
  'ngInject';

  var _ = require('lodash');

  // ViewModel
  const vm = this;
  vm.deck = StudyService.currentDeck;
  let cards = _.clone(vm.deck.cards);

  vm.deck.getSessions(function(sessions) {
    let oldSessions = sessions;
    vm.cards = sortCardsToDecks(cards, sessions);
  })

  vm.session = {
    knownCards: [],
    unknownCards: [],
    date: new Date()
  }


  vm.cardFlipped = false;

  vm.flipCard = function() {
    $scope.$apply(function() {
      vm.cardFlipped = !vm.cardFlipped;
    })
  };


  function sortCardsToDecks(cards, sessions) {

    if (!sessions || sessions.length == 0) {
      return _.clone(cards);
    }

    let sortedSessions = _.orderBy(sessions, ['date'], ['desc']);

    var mark = function(card) {
      if (_.some(sortedSessions[0].unknownCards, card)) {
        card.mark = 1
      } else if (sortedSessions.length > 1 && _.some(sortedSessions[1].knownCards, card)) {
        card.mark = 3
      } else {
        card.mark = 2
      }

      return card;
    }

    let markedCards = _
      .chain(cards)
      .clone()
      .map(mark)
      .sortBy('mark')
      .value();

    return markedCards;
  }

  vm.answer = function(right) {
    if (right) {
      vm.session.knownCards.push(vm.cards[0]);
    } else {
      vm.session.unknownCards.push(vm.cards[0]);
    }

    vm.cards.splice(0, 1);
    vm.cardFlipped = false;

    if (vm.cards.length == 0) {
      vm.deck.saveSession(vm.session, function() {
        // ntbd
      })

    }
  };

}

export default {
  name: 'StudyCtrl',
  fn: StudyCtrl
};
