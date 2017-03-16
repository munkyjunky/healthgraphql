const path = require('path');

module.exports = app => {

	app.get('/', (req, res) => {
		res.render(path.join(process.cwd(), 'src', 'templates', 'index.ejs'), {
			client_id: app.get('client_id'),
			authorization_url: app.get('authorization_url'),
			redirect_uri: app.get('redirect_uri')
		});
	});

};