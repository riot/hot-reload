import {__, component} from 'riot'
import {expect} from 'chai'
import hotReload from '../'
import jsDOMGlobal from 'jsdom-global'

describe('core', () => {
  before(() => {
    jsDOMGlobal()
  })

  it('riot.reload keeps the tags state', (done) => {
    const api = {
      name: 'timer',
      exports: {
        state: {
          count: 0
        },
        onBeforeMount() {
          this.interval = setInterval(() => {
            this.state.count ++
          }, 100)
        },
        onUnmounted() {
          clearInterval(this.interval)
        }
      }
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    component(api)(div)

    setTimeout(function() {
      const el = hotReload(api)[0]

      expect(el.state.count).to.be.equal(2)
      el.unmount()
      done()
    }, 210)
  })

  it('riot.reload will reload the css properly', () => {
    const api = {
      name: 'css-demo',
      css: ':host { color: rgb(255, 255, 255); }'
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    component(api)(div)

    expect(__.cssManager.CSS_BY_NAME.get('css-demo')).to.match(/rgb\(255, 255, 255\)/)

    hotReload({
      name: 'css-demo',
      css: ':host { color: rgb(0, 0, 0); }'
    })

    expect(__.cssManager.CSS_BY_NAME.get('css-demo')).to.match(/rgb\(0, 0, 0\)/)
  })

  it('components not compatible with riot will be ignored', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    div.setAttribute('is', 'not-riot')

    expect(() => hotReload({
      name: 'not-riot'
    })).to.not.throw()
  })
})