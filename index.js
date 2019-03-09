(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('bianco.query'), require('riot')) :
  typeof define === 'function' && define.amd ? define(['exports', 'bianco.query', 'riot'], factory) :
  (global = global || self, factory(global.riotHotReload = {}, global.$, global.riot));
}(this, function (exports, $, riot) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  riot = riot && riot.hasOwnProperty('default') ? riot['default'] : riot;

  const { DOM_COMPONENT_INSTANCE_PROPERTY } = riot.__.globals;

  function reload(component) {
    const {name} = component;

    if (!name) {
      console.warn('Anonymous components can not be reloaded'); // eslint-disable-line
      return []
    }

    return $(`${name}, [is=${name}]`).map(el => {
      const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY];

      oldTag.unmount(true);
      // create the new tag
      const newTag = riot.component(component)(el, oldTag.props);
      newTag.update(oldTag.state);

      return newTag
    })
  }

  exports.reload = reload;
  exports.default = reload;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
