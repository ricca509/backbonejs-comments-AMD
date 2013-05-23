define([
	'jquery',
	'underscore',
	'backbone', 
	'text!templates/comments-count-tmpl.html'		
	], function($, _, Backbone, comments_count_tmpl) {
	'use strict';
	// Comments count view
	// Represent the comment counter
	var View = Backbone.View.extend({
		tagName: 'div',

		className: 'well',

		initialize: function() {
			// We want to react at every change in the comments
			// collection and re-render the view
			this.collection.on('add', this.render, this);
			this.collection.on('remove', this.render, this);
			this.collection.on('reset', this.render, this);
			// Auto-rendered view
			this.render();
		},

		template: _.template(comments_count_tmpl),

		render: function() {		
			var attributes = {
				commentsCount: this.collection.length
			};

			this.$el.html(this.template(attributes));

			return this;
		}
	});

	return View;
});