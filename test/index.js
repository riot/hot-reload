import { __, component } from 'riot'
import { expect } from 'chai'
import hotReload from '../src/index.js'
import jsDOMGlobal from 'jsdom-global'

const { DOM_COMPONENT_INSTANCE_PROPERTY } =
  __.globals


/**
 * Create a compiled component wrapper rendering its props count
 * @param   {string} name - component name
 * @param   {string} version - version label rendered by the component
 * @returns {object} a compiled component wrapper
 */
const createChildWrapper = (name, version) => ({
  name,
  template: (template, expressionTypes) =>
    template(`<p expr1="expr1"> </p>`, [
      {
        redundantAttribute: 'expr1',
        selector: '[expr1]',
        expressions: [
          {
            type: expressionTypes.TEXT,
            childNodeIndex: 0,
            evaluate: (scope) => `${version} - count: ${scope.props.count}`,
          },
        ],
      },
    ]),
})

/**
 * Convert a component name containing dashes to camel case
 * @param   {string} string - component name in dash case
 * @returns {string} component name in camel case
 */
const dashToCamelCase = (string) =>
  string.replace(/-(\w)/g, (_, char) => char.toUpperCase())

/**
 * Create a compiled parent component wrapper rendering its child component
 * @param   {string} name - parent component name
 * @param   {string} childName - child component name
 * @param   {object} childWrapper - compiled child component wrapper
 * @returns {object} a compiled component wrapper
 */
const createParentWrapper = (name, childName, childWrapper) => ({
  name,
  exports: {
    components: { [dashToCamelCase(childName)]: childWrapper },
    state: { visible: true, count: 0 },
  },
  template: (template, expressionTypes, bindingTypes, getChildComponent) =>
    template(`<${childName} expr2="expr2"></${childName}>`, [
      {
        type: bindingTypes.IF,
        evaluate: (scope) => scope.state.visible,
        redundantAttribute: 'expr2',
        selector: '[expr2]',
        template: template(null, [
          {
            type: bindingTypes.TAG,
            getComponent: getChildComponent,
            evaluate: () => childName,
            slots: [],
            attributes: [
              {
                type: expressionTypes.ATTRIBUTE,
                isBoolean: false,
                name: 'count',
                evaluate: (scope) => scope.state.count,
              },
            ],
          },
        ]),
      },
    ]),
})

describe('core', () => {
  before(() => {
    jsDOMGlobal()
  })

  it('riot.reload keeps the tags state', (done) => {
    const api = {
      name: 'timer',
      exports: {
        state: {
          count: 0,
        },
        onBeforeMount() {
          this.interval = setInterval(() => {
            this.state.count++
          }, 100)
        },
        onUnmounted() {
          clearInterval(this.interval)
        },
      },
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    component(api)(div)

    setTimeout(function () {
      const el = hotReload(api)[0]

      expect(el.state.count).to.be.equal(2)
      el.unmount()
      done()
    }, 210)
  })

  it('riot.reload will reload the css properly', () => {
    const api = {
      name: 'css-demo',
      css: ':host { color: rgb(255, 255, 255); }',
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    component(api)(div)

    expect(__.cssManager.CSS_BY_NAME.get('css-demo')).to.match(
      /rgb\(255, 255, 255\)/,
    )

    hotReload({
      name: 'css-demo',
      css: ':host { color: rgb(0, 0, 0); }',
    })

    expect(__.cssManager.CSS_BY_NAME.get('css-demo')).to.match(/rgb\(0, 0, 0\)/)
  })

  it('components not compatible with riot will be ignored', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    div.setAttribute('is', 'not-riot')

    expect(() =>
      hotReload({
        name: 'not-riot',
      }),
    ).to.not.throw()
  })
})

  describe('hot reload of the children components rendered by a parent',
  () => {
    it('reloads a child component keeping it connected to its parent', () => {
      const target = document.createElement('div')
      document.body.appendChild(target)

      const parentTag = component(
        createParentWrapper(
          'hmr-parent-a',
          'hmr-child-a',
          createChildWrapper('hmr-child-a', 'v1'),
        ),
      )(target)
      const childEl = target.querySelector('hmr-child-a')

      expect(childEl.innerHTML).to.contain('v1 - count: 0')

      // the parent updates the props of its child
      parentTag.update({ count: 1 })
      expect(childEl.innerHTML).to.contain('v1 - count: 1')

      const oldChild = childEl[DOM_COMPONENT_INSTANCE_PROPERTY]
      const [newChild] = hotReload(createChildWrapper('hmr-child-a', 'v2'))

      // the child was swapped in place with the new implementation
      expect(newChild).to.not.be.equal(oldChild)
      expect(childEl.innerHTML).to.contain('v2 - count: 1')

      // the parent keeps updating the props of the new child
      parentTag.update({ count: 3 })
      expect(childEl.innerHTML).to.contain('v2 - count: 3')

      parentTag.unmount()
    })

    it('reloads a child component also when it is not currently rendered', () => {
      const target = document.createElement('div')
      document.body.appendChild(target)

      const parentTag = component(
        createParentWrapper(
          'hmr-parent-b',
          'hmr-child-b',
          createChildWrapper('hmr-child-b', 'v1'),
        ),
      )(target)

      expect(target.querySelector('hmr-child-b').innerHTML).to.contain(
        'v1 - count: 0',
      )

      // hot reload the child while it is mounted
      hotReload(createChildWrapper('hmr-child-b', 'v2'))
      expect(target.querySelector('hmr-child-b').innerHTML).to.contain(
        'v2 - count: 0',
      )

      // hide the child and hot reload it again while it is not rendered
      parentTag.update({ visible: false })
      expect(target.querySelector('hmr-child-b')).to.be.equal(null)
      expect(hotReload(createChildWrapper('hmr-child-b', 'v3'))).to.have.lengthOf(0)

      // the next render must use the latest component implementation
      parentTag.update({ visible: true })
      expect(target.querySelector('hmr-child-b').innerHTML).to.contain(
        'v3 - count: 0',
      )

      // the remounted child is still connected to its parent
      parentTag.update({ count: 3 })
      expect(target.querySelector('hmr-child-b').innerHTML).to.contain(
        'v3 - count: 3',
      )

      parentTag.unmount()
    })
  },
)
