import { __, component } from 'riot'
import $ from 'bianco.query'

const { cssManager } = __
const {
  DOM_COMPONENT_INSTANCE_PROPERTY,
  PARENT_KEY_SYMBOL,
  UPDATE_COMPONENTS_SYMBOL,
} = __.globals

// weak references to the parent components that rendered a component:
// they are the only references available when their children are not
// rendered anymore (e.g. hidden by an if directive)
const parentsRegistry = new Map()

/**
 * Deliver a new component implementation to all the parents that rendered
 * the given component: their children components map will be updated so
 * that their next render will use the new implementation
 * (see https://github.com/riot/riot/issues/3078)
 * @param   {string} name - component name
 * @param   {object} componentAPI - new component implementation
 * @param   {Array} currentParents - parents currently rendering the component
 * @returns {undefined} no return value
 */
function updateParents(name, componentAPI, currentParents) {
  // the parents remembered in the previous reloads that were not garbage
  // collected yet are the only references available when the component
  // is not rendered anymore
  const previousParents = (parentsRegistry.get(name) || []).map((parent) =>
    parent.deref(),
  )
  const parents = [...new Set([...previousParents, ...currentParents])].filter(
    Boolean,
  )

  // remember the parents also for the next reloads
  parentsRegistry.set(name, parents.map((parent) => new WeakRef(parent)))

  parents.forEach((parent) => {
    if (typeof parent[UPDATE_COMPONENTS_SYMBOL] === 'function') {
      parent[UPDATE_COMPONENTS_SYMBOL](name, componentAPI)
    }
  })
}

export default function reload(componentAPI) {
  const { name } = componentAPI

  if (!name) {
    console.warn('Anonymous components can not be reloaded')
    return []
  }

  const elements = $(`${name}, [is=${name}]`)

  // the parents currently rendering this component
  const currentParents = elements.flatMap((el) => {
    const parent = el[DOM_COMPONENT_INSTANCE_PROPERTY]?.[PARENT_KEY_SYMBOL]

    return parent ? [parent] : []
  })

  // update the children components of all the parents that use this
  // component, so that their next render will use the new implementation
  updateParents(name, componentAPI, currentParents)

  // delete the old css, it will be added back by the new component
  cssManager.remove(name)

  return elements.map((el) => {
    const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY]

    // early return in case there is no riot instance found
    if (!oldTag) return

    const parentTag = oldTag[PARENT_KEY_SYMBOL]

    // the tag was rendered by a parent supporting the children components
    // update: re-render the parent so that its bindings will replace the
    // old tag with the new component implementation in place
    if (
      parentTag &&
      typeof parentTag[UPDATE_COMPONENTS_SYMBOL] === 'function'
    ) {
      parentTag.update()

      const newTag = el[DOM_COMPONENT_INSTANCE_PROPERTY]

      // the parent bindings swapped the old tag with the new implementation
      if (newTag && newTag !== oldTag) {
        // restore the state of the previous tag instance
        newTag.update(oldTag.state)

        return newTag
      }
    }

    // fallback: the tag has no parent able to re-render it (root components
    // or older riot versions): remount it manually preserving its root node
    oldTag.unmount(true)
    const newTag = component(componentAPI)(el, oldTag.props, {
      parentScope: parentTag,
    })
    newTag.update(oldTag.state)

    return newTag
  })
}
