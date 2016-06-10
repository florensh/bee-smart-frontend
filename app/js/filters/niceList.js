function NiceListFilter($sce) {
  'ngInject';

  return function(input) {

    var _ = require('lodash');

    // let listSigns = ['>', '->']

    let firstLevelSign = '>'
    let secondLevelSign = '->'
    let firstLevelSignRpl = '**>'
    let secondLevelSignRpl = '~~@'
    let firstLevelRegex = /\*>((.|(\n|\r))*?)\*/g
    let secondLevelRegex = /\~@((.|(\n|\r))*?)(\*|~)/g
    input = _.trimStart(input);

    if (!input.startsWith(firstLevelSign)) {
      return $sce.trustAsHtml(input);
    }

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
      let secElemsStr = _.join(secElems, '');
      return {
        // parent: _.replace(_.replace(_.replace(_.replace(elem, _.join(secElems, ''), ''), '*>', ''), '*', ''), '~', ''),
        parent: _
          .chain(elem)
          .replace(secElemsStr, '')
          .replace('*>', '')
          .replace('*', '')
          .replace('~', '')
          .value(),
        children: _.map(secElems, x => _.replace(x, '~', ''))
      }
    })

    // TODO refactor to recursive function

    var retVal = '<ul>' + _.join(_.map(array, function(obj) {
      let secondString = '<ul>' + _.join(_.map(obj.children, function(c) {

        // return '<li>' + _.replace(_.replace(_.replace(c, '~', ''), '@', ''), '*', '') + '</li>'
        return '<li>' + _
          .chain(c)
          .replace('~', '')
          .replace('@', '')
          .replace('*', '') + '</li>'


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
