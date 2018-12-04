
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
                    'homepage': [{
                    'picture': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/crochet.png'  ,
                    'background_picture': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/background.jpg' }] 
                }));
                res.end();
        });
});

server.get('/cart.html', function(req, res) {
        fs.readFile('./cart.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                //var output = '';
                var output2 = {};
                var output = [];
                for (var i = 0; i < items.length; ++i) {
                  output.push({'image': images[i], 'desc': items[i]}); 
                }
                res.write(mustache.render(data.toString(), { "cartpage":  output }));
                res.end();
        });
});        



server.get('/menu.html', function(req, res) {
        fs.readFile('./menu.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "menupage": [{ "music": 'http://raw.githubusercontent.com/nbabson/crochet-gallery/master/music/BWV0573.m4a}]
                }));
                res.end();
        });
});        

server.post('/buy', function(req, res) {
        items.push(req.body.description);
        images.push(req.body.image);
        res.writeHead(302, {
                'Location': req.body.last,
                'Content-Type': 'text/plain'
        });
        res.end();
});

server.post('/remove', function(req, res) {
        var index = items.indexOf(req.body.description);
        items.splice(index, 1);
        images.splice(index, 1);
        res.writeHead(302, {
                'Location': './cart.html',
                'Content-Type': 'text/plain'
        });
        res.end();
});


server.get('/checkout.html', function(req, res) {
        fs.readFile('./checkout.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                var length = items.length;
                var message = 'You have ' + length + ' items in your cart. Unfortunatly checkout has not been implemented. Cart has been emptied.';
                items = [];
                images = [];
                res.write(mustache.render(data.toString(), {
                            "checkoutpage": [{ "message": message }]
                }));
                res.end();
        });
});        

server.get('/hat.html', function(req, res) {
        fs.readFile('./hat.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "hatpage": [{ "item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/orange-cabbage.jpg", "desc": "Orange cabbage patch hat"},    
                     {"item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/cat-beret.jpg", "desc": "Cat beret"},
                     {"item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/flower-hat.jpg", "desc": "Flower hat"},
                     {"item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/flames-hat.jpg", "desc": "Flames hat"},
                     {"item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/bauble-hat.jpg", "desc": "Bauble hat"},
                     {"item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/black-fez.jpg", "desc": "Black fez"},
                     {"item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/multi-colored-beret.jpg", "desc": "Multi-colored beret"},
                     {"item": "https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/purple-cabbage.jpg", "desc": "Purple cabbbage patch hat"}]
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
                     "afghanpage": [{ "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/shell-blanket.jpg', "desc": "Shell pattern blanket"},    
                     {"item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/ca-blanket.jpg', "desc": "Cellular automata pattern afghan"},
                     {"item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/kitty-blanket.jpg', "desc": "Scraps cat blanket"},
                     {"item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/sanford-blanket.jpg', "desc": "Unfinished Sanford afghan"}]
                }));
                res.end();
        });
});        


server.get('/amigurumi.html', function(req, res) {
        fs.readFile('./amigurumi.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "amigurumipage": [{ "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/baby-toy.jpg', "desc": "Geometric baby toy"},
                                       { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/turtle.jpg', "desc": "Beverly turtle"},
                                       { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/whale.jpg', "desc": "Barnaby baby blue whale"} ]
                }));
                res.end();
        });
});        


server.get('/trivets.html', function(req, res) {
        fs.readFile('./trivets.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "trivetspage": [{ "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/trivet-1.jpg', "desc": "Trivet 1"},
                                     { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/trivet-2.jpg', "desc": "Trivet 2"},
                                     { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/trivet-3.jpg', "desc": "Trivet 3"},
                                     { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/trivet-4.jpg', "desc": "Trivet 4"},
                                     { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/sun-trivet.jpg', "desc": "Sun trivet"},
                                     { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/spiral-trivet.jpg', "desc": "Spiral trivit"},
                                     { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/bauble-trivet.jpg', "desc": "Bauble trivit"},
                                     { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/flower-trivet.jpg', "desc": "Flower trivet"}]
                }));
                res.end();
        });
});        


server.get('/clothing.html', function(req, res) {
        fs.readFile('./clothing.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "clothingpage": [{ "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/waves-shawl.jpg', "desc": "Waves shawl"},
                                      { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/vines-shawl.jpg', "desc": "Vines shawl"},
                                      { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/go-piece-sweater.jpg', "desc": "Go piece sweater"},
                                      { "item": 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/tie.jpg', "desc": "Tie"}]
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
                     'kibbie': 'https://raw.githubusercontent.com/nbabson/crochet-gallery/master/images/Kibbie.jpg' }]      
                }));
                res.end();
        });
});        


server.listen(8080);

console.log('go ahead and open "http://localhost:8080" in your browser');
