(function (o) {
  o.on("riot:reload", function (p) {
    Array.prototype.forEach.call(document.querySelectorAll("script"),
    function (q) {
      var r, s, t

      if ((q.src || "").indexOf(p.basename) !== -1) {
        r = document.createElement("script")
        s = q.parentNode
        t = q.nextSibling
        r.setAttribute("src", q.getAttribute("src"))
        q.remove()
        s.insertBefore(r, t)
      }
    })
  })
})(window.___browserSync___.socket)
