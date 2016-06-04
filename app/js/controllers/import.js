function ImportCtrl($scope, $state, Deck) {
  'ngInject';

  var _ = require('lodash');

  // ViewModel
  const vm = this;

  let questionRegex = /\{\{((.|[\r\n])*?)\}\}/g;
  let answerRegex = /\[\[((.|[\r\n])*?)\]\]/g;

  function removeChars(str, charsStart, charsEnd) {
    var ret = str.replace(charsStart, '');
    return ret.replace(charsEnd, '');
  }

  $scope.files = [];
  $scope.$watch('files', function() {
    if ($scope.files.length > 0) {
      console.log('hier');
      var fileReader = new FileReader();

      fileReader.onload = function(event) {

        var questionWithDelimiter = event.target.result.match(questionRegex);
        var answerWithDelimiter = event.target.result.match(answerRegex);

        console.log(answerWithDelimiter);

        let questions = _.map(questionWithDelimiter, function(str) {
          return removeChars(str, '{{', '}}')
        })

        let answers = _.map(answerWithDelimiter, function(str) {
          return removeChars(str, '[[', ']]')
        })

        let cards = _.map(_.zip(questions, answers), function(pair) {
          return _.zipObject(['question', 'answer'], pair)
        })
        console.log(cards);
        var deck = Deck({
          name: 'Deck 1',
          cards: cards
        })

        deck.save(function() {
          $state.go('Study');
        })
      };

      fileReader.readAsText($scope.files[0]);
    }

  });


}

export default {
  name: 'ImportCtrl',
  fn: ImportCtrl
};
