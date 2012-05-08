
/**
 * Module dependencies.
 */

var express = require('express')
  , expresso = require('expresso')
  , app = module.exports = express.createServer()
  , routes = require('./routes')
  , mongoose = require('mongoose')
  //, db = mongoose.connect('mongodb://localhost/nodepad')
  //, Document = require('./models.js').Document(db)
  , db
  , Document;
  
 
  
//var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger({ format: ':method :url' }));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-development');
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://localhost/nodepad-prodcution');
});

app.configure('test', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-test');
});

app.Document = Document = require('./models.js').Document(db);

// :format can be json or html
app.get('/documents.:format?', function(req, res) {
  // Some kind of Mongo query/update
  Document.find().all(function(documents) {
    switch (req.params.format) {
      // When json, generate suitable data
      case 'json':
        res.send(documents.map(function(d) {
          return d.__doc;
        }));
      break;

      // Else render a database template (this isn't ready yet)
      default:
        res.render('documents/index.jade');
    }
  });
});

// Create document 
app.post('/documents.:format?', function(req, res) {
  var document = new Document(req.body['document']);
  document.save(function() {
    switch (req.params.format) {
      case 'json':
        res.send(document.__doc);
       break;

       default:
        res.redirect('/documents');
    }
  });
});

// Read document
app.get('/documents/:id.:format?', function(req, res) {
});

// Update document
app.put('/documents/:id.:format?', function(req, res) {
});

// Delete document
app.del('/documents/:id.:format?', function(req, res) {
});


// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
