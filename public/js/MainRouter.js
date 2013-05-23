define([
	'jquery',
	'underscore',
	'backbone', 	
	'models/Comment',
	'views/AppView'
], function($, _, Backbone, Comment, AppView) {
	'use strict';
	var MainRouter = Backbone.Router.extend({
		routes: {
			"*actions": "main"
		},

		main: function() {
			// Create the collection
			var comments = new Comment.collection();	

			var appView = new AppView({
				collection: comments
			});	

			// Fetch data from the server
			comments.fetch();
		}
	});

	var initialize = function() {
		var router = new MainRouter();

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};

});