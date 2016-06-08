function DecksCtrl(Deck, StudyService, $state) {
  'ngInject';

  // ViewModel
  const vm = this;


  Deck.query(function(decks) {
    if (decks && decks.length > 0) {
      vm.decks = decks;
    }
  })

  vm.study = function(deck) {
    StudyService.currentDeck = deck;
    $state.go("Study")
  }

  vm.showProgress = function(deck) {
    StudyService.currentDeck = deck;
    $state.go("Progress")
  }

}

export default {
  name: 'DecksCtrl',
  fn: DecksCtrl
};
