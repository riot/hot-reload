# Riot hot reload api

[![Build Status][ci-image]][ci-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Api that will extend riot making your tags hot reloadable.

## Important

If you are using Riot.js < 4.0.0 please check the [v3 branch](https://github.com/riot/hot-reload/tree/v3)

## Usage

```js
import reload from '@riotjs/hot-reload'
import Component from './my-component'
// refresh all the DOM nodes called 'my-component' without losing their state
reload(Component)
```



[ci-image]:https://img.shields.io/github/workflow/status/riot/hot-reload/test?style=flat-square
[ci-url]:https://github.com/riot/hot-reload/actions
[license-image]: https://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:   LICENSE.txt
[npm-version-image]:   https://img.shields.io/npm/v/@riotjs/hot-reload.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/@riotjs/hot-reload.svg?style=flat-square
[npm-url]:             https://npmjs.org/package/@riotjs/hot-reload
[codeclimate-image]: https://codeclimate.com/github/riot/hot-reload/badges/issue_count.svg
[codeclimate-url]:   https://codeclimate.com/github/riot/hot-reload
