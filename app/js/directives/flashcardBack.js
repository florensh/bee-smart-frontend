function FlashcardBackDirective() {

  return {
    restrict: 'E',
    template: "<div class='back tile' ng-transclude></div>",
    transclude: true
  };
}

export default {
  name: 'back',
  fn: FlashcardBackDirective
};
