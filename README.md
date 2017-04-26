# Riot hot reload api

[![Build Status][travis-image]][travis-url]
<!-- [![Issue Count][codeclimate-image]][codeclimate-url] -->
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Api that will extend riot making your tags hot reloadable.


## Usage

```js
import riot from 'riot'
import 'riot-hot-reload'

// refresh the tags called 'my-component' without losing their state
riot.reload('my-component')
```



[travis-image]:  https://img.shields.io/travis/riot/hot-reload.svg?style=flat-square
[travis-url]:    https://travis-ci.org/riot/hot-reload
[license-image]: https://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:   LICENSE.txt
[npm-version-image]:   https://img.shields.io/npm/v/riot-hot-reload.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/riot-hot-reload.svg?style=flat-square
[npm-url]:             https://npmjs.org/package/riot-hot-reload
[codeclimate-image]: https://codeclimate.com/github/riot/hot-reload/badges/issue_count.svg
[codeclimate-url]:   https://codeclimate.com/github/riot/hot-reload
