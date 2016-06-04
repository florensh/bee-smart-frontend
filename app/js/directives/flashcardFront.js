function FlashcardFrontDirective() {

  return {
    restrict: 'E',
    template: "<div class='front tile' ng-transclude></div>",
    transclude: true
  };
}

export default {
  name: 'front',
  fn: FlashcardFrontDirective
};
