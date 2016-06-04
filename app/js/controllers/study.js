function StudyCtrl($scope, Deck, $state) {
  'ngInject';



  // ViewModel
  const vm = this;

  vm.statistic = {
    knownCards: [],
    unknownCards: [],
    allCards: []
  }


  Deck.query(function(decks) {
    if (decks && decks.length > 0) {
      vm.cards = decks[0].cards;
    } else {
      $state.go('Import');
    }
  })


  vm.restartWithCards = function(cards) {
    vm.statistic = {
      knownCards: [],
      unknownCards: [],
      allCards: []
    }
    vm.cards = cards;
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
  };

}

export default {
  name: 'StudyCtrl',
  fn: StudyCtrl
};
