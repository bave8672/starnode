starnode.prototype.navlink = function(text, url) {
	var a = this.add({elem: 'a', attr: {href: url}});
	a.add({elem: 'div', text: text, attr: {class: 'navlink'}});
};

starnode.prototype.button = function(text, url) {
	var a = this.add({elem: 'a', attr: {href: url}});
	a.add({elem: 'div', text: text, attr: {class: 'button'}});
};