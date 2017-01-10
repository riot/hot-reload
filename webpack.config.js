var webpack = require("webpack")

module.exports = {
  "entry": "./entry",
  "module": {
    "rules": [
      {
        "loader": "tag-loader",
        "options": {
          "compact": true
        },
        "test": /\.tag$/
      }
    ]
  },
  "output": {
    "filename": "[name].js"
  },
  "plugins": [
    new webpack.optimize.UglifyJsPlugin({
      "compress": {
        "warnings": false
      },
      "mangle": true,
      "output": {
        "beautify": false,
        "comments": false,
        "indent_level": 2
      },
      "sourceMap": true
    })
  ],
  "resolve": {
    "extensions": [".js", ".json", ".tag"]
  }
}
