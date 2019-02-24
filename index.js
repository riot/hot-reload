(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('bianco.query'), require('riot')) :
  typeof define === 'function' && define.amd ? define(['exports', 'bianco.query', 'riot'], factory) :
  (factory((global.riotHotReload = {}),global.$,global.riot));
}(this, (function (exports,$,riot) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  riot = riot && riot.hasOwnProperty('default') ? riot['default'] : riot;

  var ref = riot.__.globals;
  var DOM_COMPONENT_INSTANCE_PROPERTY = ref.DOM_COMPONENT_INSTANCE_PROPERTY;

  function reload(name) {
    return $((name + ", [is=" + name + "]")).map(function (el) {
      var oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY];

      oldTag.unmount(true);
      // create the new tag
      var newTag = riot.mount(el, oldTag.props)[0];
      newTag.update(oldTag.state);

      return newTag
    })
  }

  exports.reload = reload;
  exports.default = reload;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
