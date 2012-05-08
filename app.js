
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer()
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , db = mongoose.connect('mongodb://localhost/nodepad')
  , Document = require('./models.js').Document(db);
  
//db = mongoose.connect('mongodb://localhost/nodepad')
//Document = require('./models.js').Document(db);


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
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  //app.use(express.logger());
});

app.configure('production', function(){
  app.use(express.errorHandler());
  //app.use(express.logger());
});

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

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
