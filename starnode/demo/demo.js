var doc = new starnode(document);
var head = new starnode(document.head);
var body = new starnode(document.body);

head.add({elem: 'meta', attr: {charset: 'UTF-8'}});
head.add({elem: 'meta', attr: {name: 'viewport', content: 'width=device-width, initial-scale=1'}});
head.add({elem: 'title', text: 'starnode.js demo'});

var bg = body.add({elem: 'img', attr: {class: 'bg', src: 'https://download.unsplash.com/uploads/14116941824817ba1f28e/78c8dff1'}});

var filter = body.add({elem: 'div', attr: {class: 'filter'}});

var nav = body.add({elem: 'nav', attr: {class: 'content'}});
nav.navlink('GitHub', 'https://github.com/bave8672/starnode');
nav.navlink('Docs', 'http://www.google.com');
nav.navlink('More Projects', 'http://www.baves.net');

var initial = body.add({elem: 'div', attr: {class: 'initial'}});
var jumbo = initial.add({elem: 'div', text: 'starnode.js', attr: {class: 'jumbo'}});
jumbo.listen('mouseover', function(e) {
	event.target.style['text-shadow'] = '0 0 20px white';
});
jumbo.listen('mouseleave', function(e) {
	event.target.style['text-shadow'] = '0 0 4px white';
});

var article = body.add({elem: 'div', attr: {class: 'article'}});
var container = article.add({elem: 'div', attr: {class: 'content'}});
container.add({elem: 'h1', text: 'This is a Demo.'});
container.add({elem: 'p', text: 'This webpage was served as a blank HTML document containing only a <head> and <body> element.'});
container.add({elem: 'p', text: 'The page was then built from scratch in your browser using only javascript, with starnode.'});
container.button('View on GitHub', 'https://github.com/bave8672/starnode');

var footer = body.add('footer');
footer.navlink('Benjamin Aves, 2015', 'http://www.baves.net');

doc.style(stylesheet);
doc.addListeners('.navlink', 'mouseover', function(e) {
	event.target.style['text-shadow'] = '0 0 5px white';
});
doc.addListeners('.navlink', 'mouseleave', function(e) {
	event.target.style['text-shadow'] = 'none';
});
doc.addListeners('.button', 'mouseover', function(e) {
	event.target.style['background-color'] = 'white';
	event.target.style['color'] = 'black';
});
doc.addListeners('.button', 'mouseleave', function(e) {
	event.target.style['background-color'] = 'black';
	event.target.style['color'] = 'white';
});

