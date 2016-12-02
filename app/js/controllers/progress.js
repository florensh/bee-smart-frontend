function ProgressCtrl($scope, Deck, $state, StudyService, StudySession) {
  'ngInject';

  var _ = require('lodash');

  // ViewModel
  const vm = this;
  vm.deck = StudyService.currentDeck;
  vm.deck.getSessions(function(sessions) {

    let shortDate = dateIsoString => {
      let yearMonthDayArray = _.chain(dateIsoString).split('T', 1).head().split('-', 3).value()
      return yearMonthDayArray[2] + '.' + yearMonthDayArray[1] + '.'
    }

    let sortedSessions = _.sortBy(sessions, 'date')
    vm.labels = _.map(sortedSessions, s => shortDate(s.date))
    vm.data = [_.map(sortedSessions, s => Math.round(((100 / (s.knownCards.length + s.unknownCards.length)) * s.knownCards.length) * 100) / 100)]

    vm.series = [vm.deck.name];
  })


}

export default {
  name: 'ProgressCtrl',
  fn: ProgressCtrl
};
