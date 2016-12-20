const browserSync = require("browser-sync").create()
const riotHmr = require("./bs-plugin.js")

browserSync.init({
  "server": ".",
  "plugins": [
    {
      "module": riotHmr,
      "options": {
        "files": "*.js"
      }
    }
  ]
})
