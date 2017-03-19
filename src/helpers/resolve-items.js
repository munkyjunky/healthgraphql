const fetch = require('./fetch');
const graphql = require('graphql');
const GraphQLInt = graphql.GraphQLInt;
const GraphQLString = graphql.GraphQLString;

module.exports = {

	args: {
		count: {type: GraphQLInt},
		before: { type: GraphQLString },
		after: { type: GraphQLString }
	},

	resolve (parent, args, req) {

		return new Promise(resolve => {

			const opts = Object.assign({
				count: 25
			}, args);

			function filterItems (item) {
				let include = true;

				if (args.before) {
					include = (new Date(item.start_time) - new Date(args.before)) < 0;
				}

				if ((!args.before && args.after) || (args.before && args.after && include)) {
					include = (new Date(item.start_time) - new Date(args.after)) > 0;
				}

				return include;
			}

			let items = parent.items.filter(filterItems);

			function getItems (count, next) {
				return new Promise(res => {

					fetch(next, req).then(data => { // eslint-disable-line consistent-return
						items = items.concat(data.items).filter(filterItems);

						let stopGettingItems = false;

						// Stop scrolling back in time if the last item is before the "after" arg
						if (args.after) {
							const item = data.items[data.items.length - 1];
							stopGettingItems = (new Date(item.start_time) - new Date(args.after)) < 0;
						}

						if (!stopGettingItems && count > items.length && data.next) {
							return getItems(count, data.next);
						}

					}).then(res);

				});
			}

			let stop = false;

			// Stop scrolling back in time if the last item is before the "after" arg
			if (args.after) {
				const item = parent.items[parent.items.length - 1];
				stop = (new Date(item.start_time) - new Date(args.after)) < 0;
			}

			if (!stop && opts.count > items.length && parent.next) {

				getItems(opts.count, parent.next).then(() => {
					resolve(items.slice(0, opts.count));
				});

			} else {
				resolve(items.slice(0, opts.count));
			}

		});

	}
};