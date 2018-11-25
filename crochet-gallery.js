
var express = require('express');
var mustache = require('mustache');
var fs = require('fs');

var server = express();

server.get('/crochet-gallery.html', function(req, res) {
	fs.readFile('./crochet-gallery.html', function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
                res.write(mustache.render(data.toString(), {
                    'testdata': [{'test': 'hello', 'picture': 'crochet.jpg'} ] }));
                res.end();
        });
});

server.listen(8080);

console.log('go ahead and open "http://localhost:8080/crochet-gallery.html" in your browser');
