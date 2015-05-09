'use strict';

var starnode = (function() {
	var starnode = function(node) {

		this.node = node;

		this.displayType = '';

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

		this.addTo = function(parent) {
			parent.node.appendChild(this.node);
			return parent;
		}

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

		this.init = function() {
			document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
		}

		this.getAll = function(q) {
			var result = this.node.querySelectorAll(q)
			var elems = [];
			for (var i = 0; i < result.length; i++) {
				elems.push(new starnode(result[i]));
			}
			return elems;
		}

		this.get = function(q) {
			return new starnode(this.node.querySelector(q));
		}

		this.delete = function() {
			var node = this;
			this.node.parentNode.removeChild(this.node);
			return node;
		}

		this.prune = function() {
			var children = this.get('*');
			while (this.node.firstChild) {
				this.node.removeChild(this.node.firstChild);
			}
			return children;
		}

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
		}

		this.addListeners = function(q, e, f) {
			var arr = this.node.querySelectorAll(q);
			for (var i = 0; i < arr.length; i++) {
				arr[i].addEventListener(e, f, false);
			}
		}

		this.listen = function(e, f) {
			this.node.addEventListener(e, f, false);
		}

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