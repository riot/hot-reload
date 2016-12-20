const riot = window.riot
const $$ = riot.util.dom.$$

const a = function (b) {
  Array.prototype.forEach.call($$(b + ", [data-is=" + b + "]"), function (c) {
    var d = c._tag
    var e = d._internal.origAttrs || []
    var f = Object.keys(d.opts)
      .reduce(function (g, h) {
        g[h] = d.opts[h]
        return g
      }, {
        "parent": d.parent
      })
    var j, l, m, n

    a.trigger("before-unmount", d)
    d.unmount(true)

    c.innerHTML = d._internal.innerHTML
    e.forEach(function (i) {
      c.setAttribute(i.name, i.value)
    })

    a.trigger("before-mount", f, d)
    j = riot.mount(c, f)[0]

    Object.keys(d)
      .forEach(function (k) {
        l = "_internal _parent isMounted opts parent refs tags".split(" ")
          .indexOf(k) >= 0
        m = !(d[k] instanceof HTMLElement)
        n = typeof d[k] !== "function"

        if (l && m && n) {
          j[k] = d[k]
        }
      })

    j.update()
    a.trigger("after-mount", j, d)
  })

  riot.util.styleManager.inject()
}

riot.observable(a)
riot.util.hotReloader = a
