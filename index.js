var browserSync = require("browser-sync").create()
var riotHotReload = require("./bs-plugin.js")

browserSync.init({
  "plugins": [
    {
      "module": riotHotReload,
      "options": {
        "files": "*.js"
      }
    }
  ],
  "server": {
    "baseDir": ".",
    "index": "index.xhtml"
  },
  "snippetOptions": {
    "rule": {
      "match": /qqq/
    }
  }
})
