import $ from 'bianco.query'
import riot from 'riot'

const { DOM_COMPONENT_INSTANCE_PROPERTY } = riot.__.globals

export function reload(name) {
  return $(`${name}, [is=${name}]`).map(el => {
    const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY]

    oldTag.unmount(true)
    // create the new tag
    const newTag = riot.mount(el, oldTag.props)[0]
    newTag.update(oldTag.state)

    return newTag
  })
}

export default reload