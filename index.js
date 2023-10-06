import { __, component } from 'riot';

/**
 * Converts any DOM node/s to a loopable array
 * @param   { HTMLElement|NodeList } els - single html element or a node list
 * @returns { Array } always a loopable object
 */
function domToArray(els) {
  // can this object be already looped?
  if (!Array.isArray(els)) {
    // is it a node list?
    if (
      /^\[object (HTMLCollection|NodeList|Object)\]$/
        .test(Object.prototype.toString.call(els))
        && typeof els.length === 'number'
    )
      return Array.from(els)
    else
      // if it's a single node
      // it will be returned as "array" with one single entry
      return [els]
  }
  // this object could be looped out of the box
  return els
}

/**
 * Simple helper to find DOM nodes returning them as array like loopable object
 * @param   { string|DOMNodeList } selector - either the query or the DOM nodes to arraify
 * @param   { HTMLElement }        scope      - context defining where the query will search for the DOM nodes
 * @returns { Array } DOM nodes found as array
 */
function $(selector, scope) {
  return domToArray(typeof selector === 'string' ?
    (scope || document).querySelectorAll(selector) :
    selector
  )
}

const { cssManager } = __;
const { DOM_COMPONENT_INSTANCE_PROPERTY } = __.globals;

function reload(componentAPI) {
  const { name } = componentAPI;

  if (!name) {
    console.warn('Anonymous components can not be reloaded'); // eslint-disable-line
    return []
  }

  return $(`${name}, [is=${name}]`).map((el) => {
    const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY];

    // early return in case there is no riot instance found
    if (!oldTag) return

    // remove the tag template from the DOM
    oldTag.unmount(true);
    // delete the old css from the css manager
    cssManager.remove(name);

    // create the new tag
    const newTag = component(componentAPI)(el, oldTag.props);
    newTag.update(oldTag.state);

    return newTag
  })
}

export { reload as default };
