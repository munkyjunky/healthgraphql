# HealthGraphQL

A GraphQL wrapper around the Health Graph, to support reading and writing data.

> Currently supports reading profile information & fitness activities, and reading & writing strength training activities.

## Usage
```javascript
var express = require('express');
var healthgraphql = require('healthgraphql');
var app = express();

app.use(healthgraphql({
	graphiql: true,
	getAccessToken: function (req) {
		// return access token here
	}
}));

app.listen(3000);
```

### Options
`graphiql` - Boolean. Enable or disable the graphiql interface.  
`getAccessToken` - Function (request). Should return the access token to use to access the Health Graph.