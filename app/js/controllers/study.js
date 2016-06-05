function StudyCtrl($scope, Deck, $state, StudyService) {
  'ngInject';

  var _ = require('lodash');

  // ViewModel
  const vm = this;
  vm.deck = StudyService.currentDeck;
  vm.cards = _.clone(vm.deck.cards);

  vm.statistic = {
    knownCards: [],
    unknownCards: [],
    allCards: []
  }


  vm.cardFlipped = false;

  vm.flipCard = function() {
    $scope.$apply(function() {
      vm.cardFlipped = !vm.cardFlipped;
    })
  };

  vm.answer = function(right) {
    if (right) {
      vm.statistic.knownCards.push(vm.cards[0]);
    } else {
      vm.statistic.unknownCards.push(vm.cards[0]);
    }
    vm.statistic.allCards.push(vm.cards[0]);

    vm.cards.splice(0, 1);
    vm.cardFlipped = false;

    if (vm.cards.length == 0) {
      vm.deck.percent = (100 / vm.statistic.allCards.length) * vm.statistic.knownCards.length
      vm.deck.save();
    }
  };

}

export default {
  name: 'StudyCtrl',
  fn: StudyCtrl
};
