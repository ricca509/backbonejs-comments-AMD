define([
	'jquery',
	'underscore',
	'backbone', 
	'moment',
	'text!templates/comment-tmpl.html'	
	], function($, _, Backbone, moment, comment_tmpl) {
	'use strict';
	// Comment View
	// Represents a single comment
	var View = Backbone.View.extend({
		tagName: 'div',

		className: 'comment',

		events: {
			'click .like': 'like',
			'click .dislike': 'dislike',
			'hover': 'hover',
			'click .close': 'remove'
		},

		// Cache the underscore template
		template: _.template(comment_tmpl),

		initialize: function() {
			// Register to any changes of the model
			// and re-render itself every time automatically
			this.model.on('change', this.render, this);
		},

		render: function() {		
			// Just change the element represented by this view			
			// Call the template function by passing
			// the json of the model
			this.$el.html(this.template(this.model.toJSON()));

			// Return the view object to make chainable call
			return this;
		},

		hover: function() {
			
		},

		like: function() {	
			// The view doesn't change anything in the model:
			// it just call models' methods to make changes happen,
			// the model is responsible to change its own attributes
			this.model.addLike();		

			this.model.save();
		},

		dislike: function() {
			this.model.addDislike();	

			this.model.save();	
		},

		// Remove the element from the DOM and destroy the model 
		// (it removes the model from the collection too)	
		remove: function() {
			var that = this;
			this.model.destroy();

			this.$el.fadeOut('slow', function() {
				that.$el.remove();
			});		
		}
	});

	return View;
});