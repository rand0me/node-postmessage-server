postmessage-server ![travis-image]
=================================

[![Greenkeeper badge](https://badges.greenkeeper.io/rand0me/node-postmessage-server.svg)](https://greenkeeper.io/)

![npm-image]

## Installation
```
npm install --save postmessage-server
```

## Usage
### es6
```javascript
import Server from 'postmessage-server';

const pmServer = new Server([
  {
    path: "test/route",
    handler: (req, res) => res.send('OK')
  }
]);

pmServer.listen(window);
```
### es5
```javascript
var PMServer = require('postmessage-server');

var pmServer = new PMServer([
  {
    path: "test/route",
    handler: function (req, res) { res.send('OK'); }
  }
]);

pmServer.listen(window);
```

[npm-image]: https://nodei.co/npm/postmessage-server.png
[travis-image]: https://travis-ci.org/rand0me/node-postmessage-server.svg?branch=master
