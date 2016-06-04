function FlashcardDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/flashcard.html',
    transclude: true,
    scope: {
      flipped: '=',
      onCardClicked: '&'
    },
    link: (scope, element) => {
      element.on('click', () => {
        scope.onCardClicked();
      });
    }
  };
}

export default {
  name: 'flashcard',
  fn: FlashcardDirective
};
