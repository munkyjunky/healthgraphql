const request = require('superagent');
const path = require('path');

module.exports = app => {

	app.get('/auth', (req, res) => {

		if (req.query.error === 'access_denied') {
			return res
				.status(401)
				.render(path.join(process.cwd(), 'src', 'templates', 'access-denied.ejs'), {
					client_id: app.get('client_id'),
					authorization_url: app.get('authorization_url'),
					redirect_uri: app.get('redirect_uri')
				});
		}

		/* Request an authorization code using the provided token form the RunKeeper API */
		return request
			.post(app.get('token_url'))
			.type('form')
			.send({
				grant_type: 'authorization_code',
				code: req.query.code,
				client_id: app.get('client_id'),
				client_secret: app.get('client_secret'),
				redirect_uri: app.get('redirect_uri')
			})
			.end((err, response) => {

				// TODO: error handling if request dies
				if (response.statusCode === 200) {
					/*
						Set the authorization cookie on the client, and redirect to the homepage
						where the client side script will take over
					 */
					res.cookie('auth', response.body.access_token);
				}

				res.redirect('/');
			});
	});

};
