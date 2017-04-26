const riot = require('riot')
const test = require('tape')
const hotReload = require('../') // enable riot.reload
require('jsdom-global')()

test('riot.reload exists', function (t) {
  t.ok(hotReload)
  t.ok(riot.reload)
  t.end()
})


test('riot.reload keeps the tags state', function (t) {
  riot.tag('timer', '<p>{ count }</p>', function() {
    this.count = 0

    const interval = setInterval(() => {
      this.count ++
    }, 100)

    this.on('unmount', function() {
      clearInterval(interval)
    })
  })

  document.body.innerHTML = '<timer></timer>'
  riot.mount('timer')[0]

  setTimeout(function() {
    const tag = riot.reload('timer')[0]

    t.equal(tag.count, 2)
    tag.unmount()
    t.end()
  }, 210)

})