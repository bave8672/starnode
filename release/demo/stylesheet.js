  WebFontConfig = {
    google: { families: [ 'Raleway::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

var stylesheet =  {

	'*': {
		'transition': 'all 250ms',
		'-webkit-transition': 'all 250ms'
	},

	'a': {
		'text-decoration': 'none',
		'color': 'white'
	},

	'.bg': {
		'position': 'fixed',
		'min-width': '100vw',
		'min-height': '100vw',
		'z-index': -1
	},

	'body': {
		'margin': '0',
		'color': 'white',
		'font-family': 'Raleway, sans'
	},

	'.content': {
		'width': '100%',
		'margin-left': Math.max(0, (window.innerWidth - 800)/2) + 10 + 'px',
		'max-width': '800px'
	},

	'.filter': {
		'width': '100%',
		'height': '5rem',
		'position': 'fixed',
		'z-index': 1,
		'background': 'linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%)'
	},

	'nav': {
		'display': 'inline-flex',
		'flex-direction': 'row',
		'align-items': 'center',
		'justify-content': 'space-around',
		'top': '10px',
		'position': 'fixed',
		'z-index': 2
	},

	'.navlink': {
		'text-align': 'center',
		'vertical-align': 'bottom',
		'padding-top': '1rem',
		'padding-bottom': '1rem',
		'text-decoration': 'none !important'
	},

	'.initial': {
		'height': '100vh',
		'width': '100%',
		'display': 'block',
		'background': 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 60%,rgba(0,0,0,1) 100%)',
	},

	'.jumbo': {
		'position': 'relative',
		'text-align': 'center',
		'width': '100%',
		'font-size': '10vw',
		'top': '40vh',
		'text-shadow': '0 0 4px white'
	},

	'.article': {
		'background-color': 'black',
		'margin': 0,
		'padding': '2rem 1rem'
	},

	'.button': {
		'padding': '0.5rem 0',
		'margin': '2rem',
		'margin-left': '0',
		'margin-bottom': '9rem',
		'border': '1px solid white',
		'border-radius': '10px',
		'text-align': 'center',
		'width': '8rem'
	},

	'footer': {
		'position': 'relative',
		'padding-top': '7rem',
		'width': '100%',
		'bottom': 0,
		'display': 'inline-flex',
		'flex-direction': 'row',
		'align-items': 'center',
		'justify-content': 'space-around',
		'background': 'linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%)'
	}
};
