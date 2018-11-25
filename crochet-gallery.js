
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
                    'testdata': [{'test': 'hello',
                    'picture': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/crochet.png'  ,
                    'background_picture': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/storm2.png' }] 
                }));
                res.end();
        });
});

server.listen(8080);

console.log('go ahead and open "http://localhost:8080/crochet-gallery.html" in your browser');
