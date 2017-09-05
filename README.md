# HealthGraphQL

A GraphQL wrapper around the Health Graph, to support reading and writing data.

## Usage
```javascript
var express = require('express');
var healthgraphql = require('@munkyjunky/healthgraphql');
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
`graphiql` - Boolean (optional) - Enable or disable the graphiql interface.  
`getAccessToken` - Function (optional) - Should return the access token to use to access the Health Graph.