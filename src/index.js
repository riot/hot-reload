import {__, component} from 'riot'
import $ from 'bianco.query'

const { cssManager } = __
const { DOM_COMPONENT_INSTANCE_PROPERTY } = __.globals

export function reload(componentAPI) {
  const {name} = componentAPI

  if (!name) {
    console.warn('Anonymous components can not be reloaded') // eslint-disable-line
    return []
  }

  return $(`${name}, [is=${name}]`).map(el => {
    const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY]

    // early return in case there is no riot instance found
    if (!oldTag) return

    // remove the tag template from the DOM
    oldTag.unmount(true)
    // delete the old css from the css manager
    cssManager.remove(name)

    // create the new tag
    const newTag = component(componentAPI)(el, oldTag.props)
    newTag.update(oldTag.state)

    return newTag
  })
}

export default reload