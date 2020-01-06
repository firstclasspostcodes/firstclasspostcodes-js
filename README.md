![Cover](/.github/images/cover.png)

# Firstclasspostcodes
The Firstclasspostcodes Javascript library is compatible with both Node.JS and Browsers. 

An identical API is provided for both the client and server side.

## Documentation
See [@firstclasspostcodes/js API docs](https://docs.firstclasspostcodes.com/js/getting-started) for detailed usage and examples.

## Installation
Install the package with:

```
npm install @firstclasspostcodes/js
```

or directly in HTML with:

```html
<script src="https://js.firstclasspostcodes.com/v1.3.0.js"></script>
```

## Usage
You need to configure the library to use your API Key which is available on your [dashboard](https://dashboard.firstclasspostcodes.com/key). Require the library using the key:

```js
const client = require('@firstclasspostcodes/js')('fg3rfgy3345tgfAt3r');

const postcodeData = await client.getPostcode('sw13 8gh');
```

Using ES modules looks a little different:

```js
import Firstclasspostcodes from '@firstclasspostcodes/js';

const client = Firstclasspostcodes('fg3rfgy3345tgfAt3r');

// ...
```

## Configuration
The library can be initialized with several options:

```js
const client = Firstclasspostcodes('fg3r...', {
  host: 'api.firstclasspostcodes.com',
  content: 'json',
  protocol: 'https',
  basePath: '/data',
});
```

| Property | Default | Description |
|:-----|:-----|:-----|
| `host` | `'api.firstclasspostcodes.com'` | The host to be used. This can be overridden to use a private endpoint, or for testing purposes. |
| `content` | `'json'` | The content key controls the type of response being received. `geo+json` can be used to receives responses in [GeoJSON](https://geojson.org/).
| `protocol` | `'https'` | The HTTP protocol to be used. This can be overridden for private endpoints or for testing purposes. |
| `basePath` | `'/data'` | The path to be prefixed to all API requests. This can be overridden for private endpoints or for testing purposes. |

## Events
Event handlers can be attached to the library using the Node.JS [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) pattern. 

The library does not currently support wildcards or regular expressions.

```js
const client = Firstclasspostcodes('....');

const handler = (requestObj) => {
  console.log(requestObj);
};

client.on('request', handler);

client.once('response', (responseObj) => {
  sendSignal(responseObj);
});

client.off('request', handler);
```

| Event name | Description |
|:-----|:-----|
| `request` | Triggered before a request is sent. The request object to be sent is passed to the event handler. |
| `response` | Triggered with the parsed JSON response body upon a successful reques. |
| `error` | Triggered with a client error when the request fails. |
| `operation:{name}` | Triggered by an operation with the parameter object. |

**Note:** `{name}` is replaced with the operation name of the method, as defined inside the OpenAPI specification.

## Debug
Once the library has been initialized, various debug statements are logged as requests are sent and responses received. We use the [debug](https://www.npmjs.com/package/debug) library to facilitate this both in Node.JS and on the browser.

Enable debug within Node.JS:

```sh
$ DEBUG=firstclasspostcodes node some-script.js
```

or on the browser with:

```js
localStorage.debug = 'firstclasspostcodes';

const client = Firstclasspostcodes('....');
```

## Development
Run all linting and tests:

```
$ npm ci
$ npm run lint
$ npm test
```

We use [Cypress](https://www.cypress.io/) to ensure that our library is working correctly inside the browser, this can be executed locally using:

```
$ npm run cypress
```