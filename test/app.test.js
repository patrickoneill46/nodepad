
// Run $ expresso

// Force test environment
process.env.NODE_ENV = 'test';

var app = require('../app'),
<<<<<<< HEAD
    lastID = '',
	assert = require('assert');
=======
    lastID = '';
>>>>>>> 81622fd8deead0c0e6a36f11e8c225a0348285ac

module.exports = {
  'POST /documents.json': function(assert) {
    assert.response(app, {
        url: '/documents.json',
        method: 'POST',
        data: JSON.stringify({ document: { title: 'Test' } }),
        headers: { 'Content-Type': 'application/json' }
      }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      },

      function(res) {
        var document = JSON.parse(res.body);
        assert.equal('Test', document.title);
        lastID = document._id;
      });
  },

  'HTML POST /documents': function(assert) {
    assert.response(app, {
        url: '/documents',
        method: 'POST',
        data: 'document[title]=test',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }, {
        status: 302,
        headers: { 'Content-Type': 'text/plain' }
      });
  },

  'GET /documents.json': function(assert) {
    assert.response(app,
      { url: '/documents.json' },
      { status: 200, headers: { 'Content-Type': 'application/json' }},
      function(res) {
        var documents = JSON.parse(res.body);
        assert.type(documents, 'object')

        documents.forEach(function(d) {
          app.Document.findById(d._id, function(document) {
            document.remove();
          })
        });
      });
  },

  'GET /': function(assert) {
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res) {
        assert.includes(res.body, '<title>Express</title>');
        process.exit();
      });
  }
};