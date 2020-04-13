[//]: # "NOTE: The URL for the JS library is automatically updated by semantic-release."

# Firstclasspostcodes
![Build, test and release](https://github.com/firstclasspostcodes/firstclasspostcodes-js/workflows/Build,%20test%20and%20release/badge.svg)

The Firstclasspostcodes Javascript library is compatible with both Node.JS and Browsers. 

The library will work in all modern browsers and IE9+.

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
<script src="https://js.firstclasspostcodes.com/v1.6.2.js"></script>
```

**Note on older browsers:** We recommend using a polyfill service, the following example covers all of the required language features:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=Promise%2Cfetch%2CObject.assign"></script>
```

### Security
Where the libary is loaded on pages including sensitive information, we recommend using the [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) security feature. 

Every version of the library is accompanied by an SRI hash file, the hash can be accessed directly using:

```sh
$ curl https://js.firstclasspostcodes.com/v1.6.2.sri.txt # => "sha256-45tfd... sha384-43567ytr..."
```

You can then update the above `<script>` tag, adding the integrity attribute:

```html
<script src="https://js.firstclasspostcodes.com/v1.6.2.js"
        integrity="sha256-45tfd... sha384-43567ytr..."
        crossorigin="anonymous"></script>
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
  endpoint: 'https://api.firstclasspostcodes.com/data',
  content: 'json',
});
```

| Property | Default | Description |
|:-----|:-----|:-----|
| `endpoint` | `https://api.firstclasspostcodes.com/data` | The endpoint to be used. This can be overridden to use a private endpoint, or for testing purposes. |
| `content` | `'json'` | The content key controls the type of response being received. `geo+json` can be used to receives responses in [GeoJSON](https://geojson.org/).

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
Once the library has been initialized, various debug statements are logged as requests are sent and responses received.

Enabling debug mode:

```js
const client = Firstclasspostcodes('....');

client.debugging = true;
```

## Integration / Testing
We provide a mock service of our API as a docker container [available here](https://github.com/firstclasspostcodes/firstclasspostcodes-mock). Once the container is running, the library can be easily configured to use it:

```js
const Firstclasspostcodes = require('@firstclasspostcodes/js')

const MOCK_API_URL = 'http://localhost:3000';

// The mock API key is always 111111111111 ("12x1")
const MOCK_API_KEY = '111111111111'

const client = Firstclasspostcodes(MOCK_API_KEY, {
  endpoint: MOCK_API_URL,
});
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