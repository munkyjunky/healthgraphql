const fetch = require('./fetch');
const graphql = require('graphql');
const GraphQLInt = graphql.GraphQLInt;

module.exports = {

	args: {
		count: {type: GraphQLInt}
	},

	resolve (parent, args, req) {

		return new Promise(resolve => {

			const opts = Object.assign({
				count: 25
			}, args);

			let items = parent.items;

			function getItems (count, next) {
				return new Promise(resolve => {

					fetch(next, req).then(data => {
						items = items.concat(data.items);

						if (count > items.length && data.next) {
							return getItems(count, data.next);
						}

					}).then(resolve);

				});
			}

			if (opts.count > items.length && parent.next) {

				getItems(opts.count, parent.next).then(() => {
					resolve(items.slice(0, opts.count));
				});

			} else {
				resolve(items.slice(0, opts.count));
			}

		});

	}
};