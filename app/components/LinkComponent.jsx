/** @jsx React.DOM */
define([
	'React',
	'logger',
	'router',
	'navi'
], function(React, logger, router, navi) {
	'use strict';
	
	var log = logger.get('LinkComponent');

	return React.createClass({

		getInitialState: function() {
			return {
				routePath: this.getRoutePath()
			}
		},

		onClick: function(e) {
			navi.go(this.state.routePath);

			e.preventDefault();
		},

		getRoutePath: function() {
			if (typeof this.props.href === 'string') {
				return this.props.href;
			} else if (typeof this.props.route === 'string') {
				var routeName = this.props.route,
					parameters = {},
					ignoreProps = ['route', 'children'],
					propName;

				for (propName in this.props) {
					if (ignoreProps.indexOf(propName) !== -1) {
						continue;
					}

					parameters[propName] = this.props[propName];
				}

				return router.getRoutePath(routeName, parameters);
			}
		},

		render: function () {
			var linkHref = this.state.routePath;

			if (!router.isUsingHtml5Mode()) {
				linkHref = '#' + linkHref;
			}

			log.info('render ' + linkHref);

			return (
				<a href={linkHref} onClick={this.onClick}>{this.props.children}</a>
			);
		}
	});
});