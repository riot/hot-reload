# Riot hot reload api

Api that will extend riot making your tags hot reloadable.


## Usage

```js
import riot from 'riot'
import 'riot-hot-reload'

// refresh the tags called 'my-component' without losing their state
riot.reload('my-component')
```