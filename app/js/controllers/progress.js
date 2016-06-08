function ProgressCtrl($scope, Deck, $state, StudyService, StudySession) {
  'ngInject';

  var _ = require('lodash');

  // ViewModel
  const vm = this;
  vm.deck = StudyService.currentDeck;
  vm.deck.getSessions(function(sessions) {

    var convertDate = function(str) {
      var date = new Date(str);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      return day + '.' + (monthIndex + 1) + '.';
    }

    vm.labels = _
      .chain(sessions)
      .sortBy('date')
      .map(s => convertDate(s.date))
      .value();

    vm.data = [_
      .chain(sessions)
      .sortBy('date')
      .map(s => Math.round(((100 / (s.knownCards.length + s.unknownCards.length)) * s.knownCards.length) * 100) / 100)
      .value()
    ];

    vm.series = [vm.deck.name];
  })


}

export default {
  name: 'ProgressCtrl',
  fn: ProgressCtrl
};
