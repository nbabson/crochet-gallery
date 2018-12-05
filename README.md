# crochet-gallery

## overview
This is my first web development project. The back-end uses nodeJS with express.
The body-parser and sessions modules are used to retrieve post data and store
session information. Mustache templates share dynamic content with the html
front-end laid out using the bootstrap framework.

The project is a gallery of some of my corchet projects. The user can 
navigate among five catagories of crochet items putting those that they 
choose into or out of their personal cart. The items are not actually for sale,
so when the user navigates to the checkout page they are informed that checkout
is not implemented, and their selected items are all removed from the cart.

The faux shopping experience is enlivened by tracks of Bach organ music
performed and released for free by Dr. James Kibbie in conjunction with the
University of Michigan.

## usage

You can clone the project using 
```
git clone https://github.com/nbabson/crochet-gallery
```
Install dependencies and run the app locally with the commads
```
cd crochet-gallery
npm install
npm start
```
You will be prompted to open a browser to localhost:8080 to view the site.
A navigation bar at the top of the browser page can be used to navigate the
site. Hovering over crocheted goods images will cause them to zoom and buttons 
in front the images will add or drop them from the user's cart.

The site will also be hosted for a limited time by Google App Engine at the url
```
http://babson-crochet.appspot.com
```

## license

This project is covered by the MIT license.
