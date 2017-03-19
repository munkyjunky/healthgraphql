const cookieParser = require('cookie-parser');
const express = require('express');
const log = require('./helpers/logging');
const path = require('path');
const HealthGraphLoader = require('./middleware/healthgraph-loader');


/*  Create application */
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(HealthGraphLoader);

/* Server settings */
app.set('view engine', 'ejs');
app.set('port', process.env.port || 3000);
app.set('hostname', process.env.port || 'localhost');
app.set('protocol', process.env.protocol || 'http');


/* RunKeeper integration - details come from RunKeeper application portal */
app.set('client_id', process.env.client_id);
app.set('client_secret', process.env.client_secret);
app.set('authorization_url', process.env.authorization_url || 'https://runkeeper.com/apps/authorize');
app.set('token_url', process.env.token_url || 'https://runkeeper.com/apps/token');
app.set('redirect_uri', process.env.redirect_url || `${app.get('protocol')}://${app.get('hostname')}:${app.get('port')}/auth`);


/* Create routes */
require('./routes/auth')(app);
require('./routes/index')(app);
require('./routes/graphql')(app);


/* Start Application */
app.listen(app.get('port'), () => {
	log.info('SERVER_START', { port: app.get('port') });
});