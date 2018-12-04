/*
Neil Babson
October 2018
PSU - Web Development Project
Back-end for crochet gallery website

View project at : http://babson-crochet.appspot.com

This project allows users to browse through a gallery of some of my crochet
projects and select items to put in their shopping cart from a website hosted
by Google App Engine.  These items are not actually for sale and the checkout
page doesn't involve any financial transaction
*/


var express = require('express');             // Routing request framework
var bodyParser = require("body-parser");      // Middleware to retrieve post dat from front-end
var session = require('express-session');     // Module to store user shopping cart session data
var mustache = require('mustache');           // Template system to serve dynamic lists of crochet items to front-end 
var fs = require('fs');                       // File system module to access front-end html files                  

var server = express();                 

// Create session to keep contents of shopping cart
server.use(session({
  'store': new session.MemoryStore(),
  'secret': 'Storm',
  'resave': false,
  'saveUninitialized': false,
  'cookie': {} 
}));  

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Redirect to home page html file
server.get('/', function(req, res) {
        res.writeHead(302, {
                'Location': '/crochet-gallery.html',
                'Content-Type': 'text/plain'
        });
        res.end();
});        


// Home page uses mustache list to serve urls for background and foreground images
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


// Creates and serves a  mustache list of the contents of the user's shopping cart from the two session variables
//      session.items : a list of item description strings
//      session.images: a list of item image urls
server.get('/cart.html', function(req, res) {
        fs.readFile('./cart.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                var output = [];
                // If the session variables are undefined do not try to create list
                if (req.session.items !== undefined) {
                  for (var i = 0; i < req.session.items.length; ++i) {
                    output.push({'image': req.session.images[i], 'desc': req.session.items[i]}); 
                  }
                }
                res.write(mustache.render(data.toString(), { "cartpage":  output }));
                res.end();
        });
});        


// Serve music url as mustache object to gallery menu front-end
server.get('/menu.html', function(req, res) {
        fs.readFile('./menu.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                res.write(mustache.render(data.toString(), {
                     "menupage": [{ "music": 'http://raw.githubusercontent.com/nbabson/crochet-gallery/master/music/BWV0573.m4a'}]
                }));
                res.end();
        });
});        


// When user puts item in cart from any gallery page they redirect here to store object in session variables before returning to gallery page
server.post('/buy', function(req, res) {
        // Initialize session variables if they do not exist
        if (req.session.items === undefined) {
          req.session.items = [];
          req.session.images = [];
        }

        // Retrieve image and description of selected item from body-parser middleware
        // and push onto session lists
        req.session.items.push(req.body.description);
        req.session.images.push(req.body.image);
        // Return to gallery page where item was selected
        res.writeHead(302, {
                'Location': req.body.last,
                'Content-Type': 'text/plain'
        });
        res.end();
});


// If user drops an item from their cart look up the index of the first item matching its description
// and use splice to remove it from both session lists
server.post('/remove', function(req, res) {
        var index = req.session.items.indexOf(req.body.description);
        req.session.items.splice(index, 1);
        req.session.images.splice(index, 1);
        // Return to shopping cart front-end page
        res.writeHead(302, {
                'Location': './cart.html',
                'Content-Type': 'text/plain'
        });
        res.end();
});


// Because the crochet gallery is an example project and not a real store, the checkout page merely
// gives the user a not implemented message as well as emptying their cart of all items which they 
// are not really allowed to purchase.
server.get('/checkout.html', function(req, res) {
        fs.readFile('./checkout.html', function(err, data) {
                res.writeHead(200, {
                        'Content-Type': 'text/html'
                });
                // Make sure session variable is defined before checking its length attribute
                if (req.session.items === undefined) {
                  req.session.items = [];
                }
                var length = req.session.items.length;
                var message = 'You have ' + length + ' items in your cart. Unfortunatly checkout has not been implemented. Cart has been emptied.';
                req.session.items = [];
                req.session.images = [];
                res.write(mustache.render(data.toString(), {
                            "checkoutpage": [{ "message": message }]
                }));
                res.end();
        });
});        


// Serve a mustache list of hat descriptions and image urls. Items can be added to the front-end gallery by adding to this list.
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


// Serve a mustache list of afghan descriptions and image urls. Items can be added to the front-end gallery by adding to this list.
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


// Serve a mustache list of amigurumi (crocheted toys) descriptions and image urls. Items can be added to the front-end gallery by adding to this list.
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


// Serve a mustache list of trivet (granny squares) descriptions and image urls. Items can be added to the front-end gallery by adding to this list.
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


// Serve a mustache list of non-hat clothing descriptions and image urls. Items can be added to the front-end gallery by adding to this list.
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


// Serve a mustache list with urls for images of Neil and of the organist James Kibbie whose free Bach recordings are featured in the gallery pages
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
// Message for local testing. They finished site runs through Google App Engine at 
//      http://babson-crochet.appspot.com
console.log('go ahead and open "http://localhost:8080" in your browser');
