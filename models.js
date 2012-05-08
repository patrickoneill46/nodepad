var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//var Schema = mongoose.Schema;
/*var Documents = new Schema({
	properties: ['title', 'data', 'tags'],

	indexes: [
		'title'
  ]
});**/

var Document = new Schema({
	title: { type: String, index: true },
	data: {type: String},
	tags: {type: String},
	user_id: {type: String, index: true}
});
mongoose.model('Document', Document);

/**mongoose.model('Document', {
  properties: ['title', 'data', 'tags'],

  indexes: [
    'title'
  ]
});**/

exports.Document = function(db) {
  return db.model('Document');
};