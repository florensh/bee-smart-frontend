function NiceListFilter($sce) {
  'ngInject';

  return function(input) {

    var _ = require('lodash');

    let firstLevelSign = '>'
    let secondLevelSign = '->'
    let firstLevelSignRpl = '**>'
    let secondLevelSignRpl = '~~@'
    let firstLevelRegex = /\*>((.|(\n|\r))*?)\*/g
    let secondLevelRegex = /\~@((.|(\n|\r))*?)(\*|~)/g

    function escapeRegExp(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    // add end sign
    input = input + '*'

    // replace all second level signs
    input = replaceAll(input, secondLevelSign, secondLevelSignRpl);

    // replace all first level signs
    input = replaceAll(input, firstLevelSign, firstLevelSignRpl);

    var firstLevelElements = input.match(firstLevelRegex);

    let array = _.map(firstLevelElements, function(elem) {
      let secElems = elem.match(secondLevelRegex);
      return {
        parent: _.replace(_.replace(_.replace(_.replace(elem, _.join(secElems, ''), ''), '*>', ''), '*', ''), '~', ''),
        children: secElems
      }
    })
    console.log(array);

    // TODO refactor to recursive function

    var retVal = '<ul>' + _.join(_.map(array, function(obj) {
      let secondString = '<ul>' + _.join(_.map(obj.children, function(c) {
        console.log('child: ' + c)
        return '<li>' + _.replace(_.replace(_.replace(c, '~', ''), '@', ''), '*', '') + '</li>'
      }), '') + '</ul>'
      return '<li>' + obj.parent + '</li>' + (secondString ? secondString : '')
    }), '') + '</ul>'






    return $sce.trustAsHtml(retVal);
  };

}

export default {
  name: 'nice',
  fn: NiceListFilter
};
