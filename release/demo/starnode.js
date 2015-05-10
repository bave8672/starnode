'use strict';

var starnode = (function() {
	/**
	 * Defines the starnode object, which behaves like a standard DOM element with additional functionality built into it.
	 * 
	 * @param  {DOM Element} node can be null
	 * 
	 * @return {starnode}
	 */
	var starnode = function(node) {

		/**
		 * starnode retains the original DOM node and it's standard functionality, accessible through starnode.node
		 * 
		 * @type {DOM Element}
		 */
		this.node = node;

		/**
		 * Saves the display setting for this object (only used for the starnode.toggle() function)
		 * 
		 * @type {String}
		 */
		this.displayType = '';

		/**
		 * Creates a new DOM element as a starnode and returns it.
		 * 
		 * @param  {string or object} a Can be a String: creates an empty node with tag type matching the string. OR: 
		 *                    			Object: creates an element with a specified tag name, text and attributes, using the format:
		 *
		 * 								a = {
		 * 									elem: {string},
		 * 									text: {string},
		 * 									attr: {
		 * 										{key}: {string},
		 * 										etc...
		 * 									}
		 * 								}
		 * 	
		 * @return {starnode}   The created starnode can be added or inserted onto another starnode later.
		 */
		this.create = function(a) {
			var element;
			if (typeof a === 'string') {
				element = document.createElement(a);
			}
			else {
				element = document.createElement(a.elem);
			}
			if (a.text) {
				var textnode = document.createTextNode(a.text);
				element.appendChild(textnode);
			}
			for (var key in a.attr) {
				if (a.attr.hasOwnProperty(key)) {
					element.setAttribute(key, a.attr[key]);
				}
			}
			return new starnode(element);
		}

		/**
		 * Adds a starnode to this starnode in the DOM and returns that node.
		 * 
		 * @param {starnode, string} a Can take a starnode as an argument, or a string. If the latter, a new starnode is created using this.create().
		 */
		this.add = function(a) {
			if (a.hasOwnProperty('node')) {
				this.node.appendChild(a.node);
				return a;
			}
			else {
				var element = this.create(a);
				this.add(element);
				return element;
			}
		}

		/**
		 * Adds this starnode as the child of another starnode, and returns the parent.
		 * 
		 * @param {starnode} parent 
		 */
		this.addTo = function(parent) {
			if (parent.hasOwnProperty('node')) {
				parent.node.appendChild(this.node);
			}
			else {
				parent = this.create(parent);
				this.addTo(parent);
			}
			return parent;
		}

		/**
		 * Inserts a starnode element after another starnode.
		 * 
		 * @param  {starnode, DOM Element} a creates a new starnode if the argument is not one already.
		 * 
		 * @return {starnode}   The parent will be returned as a starnode; it will now have this as a child.
		 */
		this.insertAfter = function(a) {
			if (a.hasOwnProperty('node')) {
				this.node.parentNode.insertBefore(a.node, this.node.nextSibling);
			}
			else {
				var element = this.create(a);
				this.insertAfter(element);
				return element;
			}
		}

		/**
		 * Inserts a starnode element before another starnode.
		 * 
		 * @param  {starnode, DOM Element} a creates a new starnode if the argument is not one already.
		 * 
		 * @return {starnode}   The parent will be returned as a starnode; it will now have this as a child.
		 */
		this.insertBefore = function(a) {
			if (a.hasOwnProperty('node')) {
				this.node.parentNode.insertBefore(a.node, this.node);
				return a;
			}
			else {
				var element = this.create(a);
				this.insertBefore(element);
				return element;
			}
		}

		/**
		 * Refreshes the page and creates a new html document with <head> and <body> tags. Use with caution! Only appears to work in Chrome.
		 * Any code run directly after this must be wrapped in a setTimeout() function callback due to the asyc load of the page.
		 */
		this.init = function() {
			document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
		}

		/**
		 * Returns an array of starnodes that are children of this element and match a search query.
		 * 
		 * @param  {string} q Search query, e.g 'h1.myClass'
		 * 
		 * @return {array object}   an array of starnode objects.
		 */
		this.getAll = function(q) {
			var result = this.node.querySelectorAll(q)
			var elems = [];
			for (var i = 0; i < result.length; i++) {
				elems.push(new starnode(result[i]));
			}
			return elems;
		}

		/**
		 * Returns the first child element matching a query as a starnode.
		 * 
		 * @param  {string} q Search query
		 * 
		 * @return {starnode}   
		 */
		this.get = function(q) {
			return new starnode(this.node.querySelector(q));
		}

		/**
		 * Deletes a starnode object along with it's associated node and all of its children, and returns it.
		 * 
		 * @return {starnode}
		 */
		this.delete = function() {
			var node = this;
			this.node.parentNode.removeChild(this.node);
			return node;
		}

		/**
		 * Delets all of a starnode's child elements and returns them in an array.
		 * 
		 * @return {array object} An array containing all of the deleted children as starnodes.
		 */
		this.prune = function() {
			var children = this.getAll('*');
			while (this.node.firstChild) {
				this.node.removeChild(this.node.firstChild);
			}
			return children;
		}

		/**
		 * Applies style settings to the children of this element using a JSON stylesheet.
		 * 
		 * @param  {object} stylesheet A CSS-like JSON object containing the styles to be applied.
		 *
		 * 		Contains search queries as first-level keys, followed by the styles for each query like so:
		 *
		 * 		stylesheet = {
		 * 		
		 * 			'#myID': {
		 * 				'color': 'red',
		 * 				'text-decoration': 'underline'
		 * 			},
		 *
		 * 			'.myClass': {
		 * 				'background-color': 'purple'
		 * 			}
		 * 			
		 * 		}
		 *
		 * @return {object} Returns the stylesheet.
		 */
		this.style = function(stylesheet) {
			for (var q in  stylesheet) {
				if (stylesheet.hasOwnProperty(q)) {
					var list = this.node.querySelectorAll(q);
					var attribs = stylesheet[q];
					for (var attr in attribs) {
						if (attribs.hasOwnProperty(attr)) {
							for (var i = 0; i < list.length; i++) {
								list[i].style[attr] = attribs[attr];
							}
						}
					}
				}
			}
			return stylesheet;
		}

		/**
		 * Adds event listeners to all children of this element that satisfy the query.
		 * 
		 * @param {string} q Search query to match elements.
		 * @param {string} e Event, e.g 'click'
		 * @param {function object} f Callback function.
		 */
		this.addListeners = function(q, e, f) {
			var arr = this.node.querySelectorAll(q);
			for (var i = 0; i < arr.length; i++) {
				arr[i].addEventListener(e, f, false);
			}
		}

		/**
		 * Adds an event listener to this element.
		 * 						
		 * @param  {string} e Event
		 * @param  {function object} f Callback
		 */
		this.listen = function(e, f) {
			this.node.addEventListener(e, f, false);
		}

		/**
		 * Recreates the useful jQuery toggle() method.
		 * 
		 * @return {string} Returns the current display setting.
		 */
		this.toggle = function() {
			var disp = this.node.style['display'];
			if (disp !== 'none') {
				this.displayType = disp;
				this.node.style.display = 'none';
			}
			else {
				if (this.displayType === 'none') {
					this.displayType = '';
				}
				this.node.style['display'] = this.displayType; 
			}
			return this.node.style['display'];
		}

		return this;
	};

	return starnode;
})();