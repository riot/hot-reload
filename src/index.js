import $ from 'bianco.query'
import riot from 'riot'

const { DOM_COMPONENT_INSTANCE_PROPERTY } = riot.__.globals

export function reload(component) {
  const {name} = component

  if (!name) {
    console.warn('Anonymous components can not be reloaded') // eslint-disable-line
    return []
  }

  return $(`${name}, [is=${name}]`).map(el => {
    const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY]

    oldTag.unmount(true)
    // create the new tag
    const newTag = riot.component(component).mount(el, oldTag.props)
    newTag.update(oldTag.state)

    return newTag
  })
}

export default reload