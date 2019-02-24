import {mount, register} from 'riot'
import {expect} from 'chai'
import hotReload from '../'
import jsDOMGlobal from 'jsdom-global'

describe('core', () => {
  before(() => {
    jsDOMGlobal()
  })

  it('riot.reload keeps the tags state', (done) => {
    register('timer', {
      tag: {
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
    })

    document.body.innerHTML = '<timer></timer>'
    mount('timer')[0]

    setTimeout(function() {
      const tag = hotReload('timer')[0]

      expect(tag.state.count).to.be.equal(2)
      tag.unmount()
      done()
    }, 210)
  })
})