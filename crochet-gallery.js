'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var session = require('express-session');
var mustache = require('mustache');
var fs = require('fs');

var server = express();
var items = [];
var images = [];

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', function(req, res) {
        res.writeHead(302, {
                'Location': '/crochet-gallery.html',
                'Content-Type': 'text/plain'
        });
        res.end();
});        

server.get('/crochet-gallery.html', function(req, res) {
	fs.readFile('./crochet-gallery.html', function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
                res.write(mustache.render(data.toString(), {
                    'homepage': [{'test': 'hello',
                    'picture': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/crochet.png'  ,
                    'background_picture': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/storm2.png' }] 
                }));
                res.end();
        });
});

server.get('/cart.html', function(req, res) {
        fs.readFile('./cart.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.end();
        });
});        

server.get('/menu.html', function(req, res) {
        fs.readFile('./menu.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "menupage": [{ "music": 'http://www.blockmrecords.org/bach/audio/mp3/BWV0573.mp3'}]
                }));
                res.end();
        });
});        

server.post('/buy', function(req, res) {
        console.log(req.body.item);
        console.log(req.body.image);
        items.push(req.body.item);
        images.push(req.body.image);
        res.writeHead(302, {
                'Location': req.body.last,
                'Content-Type': 'text/plain'
        });
        res.end();
});


server.get('/hat.html', function(req, res) {
        fs.readFile('./hat.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "hatpage": [{ "hat": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/crochet_small.png', "desc": "not really a hat"},    
                     {"hat": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/storm3.png', "desc": "also not really a hat"}]
                }));
                res.end();
        });
});        


server.get('/afghan.html', function(req, res) {
        fs.readFile('./afghan.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "afghanpage": [{ "afghan": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/shell-blanket.jpg', "desc": "Shell pattern blanket"},    
                     {"afghan": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/ca-blanket.jpg', "desc": "Cellular automata pattern afghan"}]
                }));
                res.end();
        });
});        


server.get('/contact.html', function(req, res) {
        fs.readFile('./contact.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     'contactpage': [{'neil': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/storm3.png',
                     'kibbie': 'http://www.blockmrecords.org/images/artists/Kibbie.jpg' }]      
                }));
                res.end();
        });
});        


server.listen(8080);

console.log('go ahead and open "http://localhost:8080" in your browser');
