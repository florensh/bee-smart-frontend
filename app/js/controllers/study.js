function StudyCtrl($scope, Deck, $state, StudyService, StudySession) {
  'ngInject';

  var _ = require('lodash');

  // ViewModel
  const vm = this;
  vm.deck = StudyService.currentDeck;

  vm.cards = _.clone(vm.deck.cards);

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
