define(['backbone'], function() {
	'use strict';
	// Comment model
	// This model will hold data
	// and custom methods for a single comment
	var Comment = Backbone.Model.extend({
		initialize: function() {
			// Register to the 'add' event of the model.
			// Every time a model is created, an 'add' event is fired
			// automatically from the Backbone engine. We use this
			// event to handle the new model by adding dynamically generated
			// parameters (e.g. the creation date)
			this.on('add', this.addHandler, this);
		},		

		idAttribute: '_id',

		// Every time a new model is created we add dafault values to some
		// or every parameter. 
		defaults: {
			like: 0,
			dislike: 0		
		},

		// Validation method: every time a property is set on the model,
		// the validation is performed
		validate: function(attributes) {
			var errors = [];

			if (attributes.text === "") {
				errors.push('Insert a text for the comment');
			}

			if (errors.length !== 0) {
				return errors;
			}
		},

		// The url to call for any interaction with the server
		urlRoot: '/comments',

		// We use this method to add
		// dynamically generated values to the 
		// newly added model
		addHandler: function() {
			// Example: you could set a date 
			// for every new model
			if (this.isNew()) {
				this.set({
					creationDate: new Date()
				});
			}			
		},

		// Move all the code that modifies the model into
		// the model itself and call the code from the views
		addLike: function() {
			var likeN = this.get('like') - 0;
			likeN++;
			this.set({
				like: likeN
			});
		},

		addDislike: function() {
			var dislikeN = this.get('dislike') - 0;
			dislikeN++;
			this.set({
				dislike: dislikeN
			});
		}

	});

	// Comments collection
	// This collection will hold the list of comments
	var Comments = Backbone.Collection.extend({
		model: Comment,
		// The url to call for any interaction with the server
		url: '/comments'
	});

	// Exports
	return {
		model: Comment,
		collection: Comments
	};

});