const PLUGIN_NAME = "riot-hmr"

const fs = require("fs")
const path = require("path")

module.exports.plugin = function (_a, b) {
  b.events.on("file:changed", function (c) {
    var d = b.io.of(b.options.getIn(["socket", "namespace"]))

    if (c.namespace === PLUGIN_NAME) {
      d.emit("riot:reload", {
        "basename": path.basename(c.path)
      })
    }
  })
}

module.exports["plugin:name"] = PLUGIN_NAME

module.exports.hooks = {
  "client:js": fs.readFileSync(path.join(__dirname, "bs-client.js"), "utf-8")
}
