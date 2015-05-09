# starnode.js

This simple library transforms your humble DOM elements into starnodes, which contain methods that make it possible to generate entire webpages, complete with styles and responsive features, all from within javascript.

## Get Started

Include the following line at the bottom of your <body> tag, after any main content and before any other references to scripts that require starnode:

```
<html>
	<body>

		<!-- Body Content Goes Here -->

		<script type='text/javascript' src='path/to/starnode.js'></script>
		<!-- Script that uses starnode goes here -->

	</body>
</html>
```

If you like, you can even start from just a <script> tag by calling:

```javascript
new starnode().init();

setTimeout(function() {

	// ...

}, 0);
```

This will generate a new document element along with empty <head> and <body> tags. Any code that runs immediately afterwards must be placed inside a timeout funcnction as the page loads asynchronously.

Warning: use with caution. This feature is experimental and only appears to work in Chrome.

## Usage

### About starnodes

This library defines the starnode object, which aims to build upon the functionality of a regular DOM element. Each starnode can be bound to a real DOM node, which is accessible through starnode.node, allowing you to keep using all of the traditional node operations. However, the starnode object contains additional functions for adding, modifying and deleting DOM elements that traditional nodes do not have, as well a few useful jQuery-style methods for searching and traversing them, among other things.

### Creating starnodes from existing nodes

Any existing element can be turned into a starnode by passing it as an argument into a new starnode object:

```javascript
var myStarnode = new starnode({DOM element});
```

It can be useful to create starnodes from the document and body elements, as they can be used as roots to access all other nodes:

```javascript
var doc = new starnode({document});
	body = new starnode({document.body});
```

Use the starnode.get() function with one of the root elements to select a specific node using a query:

```javascript
var title = body.get('h1#title');
```

### Adding and inserting starnodes

You can add children to any starnode using starnode.add() as follows:

```javascript
var nav = body.add({elem: 'nav', text: 'this is a navbar', attr: {id 'navbar'}}); // returns a starnode object
	container = body.add({elem: 'div', text: 'This is a container', attr: {class: 'container'}});
	footer = body.add({elem: 'footer', text: 'this is a footer', attr: {id: 'footer'}});

container.add({elem: 'p', text: 'Here is some extra content for our container.'});
```



