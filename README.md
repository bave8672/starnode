# starnode.js

This simple library transforms your humble DOM elements into starnodes, which contain methods that make it possible to generate entire webpages, complete with styles and responsive features, all from within javascript.

## Get Started

Include the following line at the bottom of your body tag, after any main content and before any other references to scripts that require starnode:

```
<html>
	<body>

		<!-- Body Content Goes Here -->

		<script type='text/javascript' src='path/to/starnode.js'></script>
		<!-- Script that uses starnode goes here -->

	</body>
</html>
```

If you like, you can even start from just a script tag by calling:

```javascript
new starnode().init();

setTimeout(function() {

	// ...

}, 0);
```

This will generate a new document element along with empty <head> and <body> tags. Any code that runs immediately afterwards must be placed inside a timeout function as the page loads asynchronously.

Warning: use with caution. This feature is experimental and only appears to work in Chrome.

## Usage

### About starnodes

This library defines the starnode object, which aims to build upon the functionality of a regular DOM element. Each starnode can be bound to a real DOM node, which is accessible through starnode.node, allowing you to keep using all of the traditional node operations. However, the starnode object contains additional functions for adding, modifying and deleting DOM elements that traditional nodes do not have, as well a few useful jQuery-style methods for searching and traversing them.

### Creating starnodes from existing nodes

Any existing element can be turned into a starnode by passing it as an argument into a new starnode object:

```javascript
var myStarnode = new starnode({DOM element});
```

It can be useful to create starnodes from the document and body elements, as they can be used as roots to access all other nodes:

```javascript
var doc = new starnode(document); // document starnode
	body = new starnode(document.body); // body starnode
```

Use the starnode.get() function with one of the root elements to select a specific node using a query:

```javascript
var title = body.get('h1#title'); // returns the first node within the body element that matches h1#title, as a starnode.
```

### Adding and inserting starnodes

You can add children to any starnode using starnode.add() as follows:

```javascript
var nav = body.add({elem: 'nav', text: 'this is a navbar', attr: {id: 'navbar'}}); // returns a starnode object
	container = body.add({elem: 'div', text: 'This is a container', attr: {class: 'container'}});
	footer = body.add({elem: 'footer', text: 'this is a footer', attr: {id: 'footer'}});

container.add({elem: 'p', text: 'Here is some extra content for our container.'});
```

You can create a free starnode using the .create() method, and add it the DOM later using the .add(), .addTo(), .insertBefore() or insertAfter() methods:

```javascript
// create link nodes but don't add them to the DOM yet:
var google = new starnode({elem: 'a', text: 'google.com', attr: {href: 'http://www.google.com'}});
	microsoft = new starnode({elem: 'a', text: 'microsoft.com', attr: {href: 'http://www.microsoft.com'}});
	yahoo = new starnode({elem: 'a', text: 'yahoo.com', attr: {href: 'http://www.yahoo.com'}});

body.add(google); // google link is now a child of the body element
microsoft.addTo(body); // Has the same effect. microsoft is now a child of the body node
yahoo.insertAfter(google); // The yahoo link is inserted after google and before microsoft
```

### Delete elements

```javascript
foo.delete() // removes 'foo' and all child elements from the DOM

bar.prune() // removes all child elements of 'bar'
```

### Searching the DOM

Use the starnode.get() and .getAll() methods, which bahave like the standard query() and queryAll():

```javascript
fvar bar = foo.get('#bar'); 
// returns the first child element of 'foo' with id 'bar' as a starnode

bar.getAll('.baz'); 
// returns a starnode array containing all the child elements of 'bar' with class='baz'.

```

### Templates and mixins

Because starnodes are javascript objects, defining templates and mixins is as easy as extending the prototype:

```javascript
// define a template method on all starnodes:
starnode.prototype.addBlogpost = function(title, author, text) {
	var container = this.add({elem: 'article'});
	container.add({elem: 'h1', text: title});
	container.add({elem: 'h2', text: author});
	container.add({elem: 'p', text: text});
}

var body = new starnode(document.body);
body.addBlogpost('Hello World', 'Wendy Example', 'Lorem ipsum dolor sit amet...');
// Adds a new blog post to the body element with the specified arguments.
```

### Adding Styles

You can style a whole document in one command without CSS, using .style().

```javascript
// define style rules in a JSON object as so:
var myStylesheet = {

	'.foo': {
		'color': 'red',
		'font-size': '2.5rem'
	},

	'#bar': {
		'background-color': 'blue',
		'text-decoration': 'underlined'
	}

};

new starnode(document).style(myStylesheet); 
// Adds style rules in myStylesheet to the corresponding elements in the document
```

### Adding event listeners

```javascript
foo.listen('click', function() {
	console.log('You just clicked foo');
});
// Adds event listener to foo's associated node

bar.addListeners('.baz', 'mouseover', function(event) {
	event.target.style[color] = 'purple';
});
// Binds event listeners to all child elements of bar with class=baz
```

### Miscellaneous

Starnodes also have a native .toggle() method to hide or display their element dynamically; it works in the same way as the jQuery toggle().

## Demo

Check out a demo page [here](http://www.baves.net/starnode).

If you are having trouble, the [full code](/release/starnode.js) has detailed comments on the usage of each function.

## Credits

You can see more of my projects at [baves.net](http://www.baves.net).

