var du = require('domutil');

module.exports = Hotkeys;

function Hotkeys(doc) {

	this.document = doc || document;

	du.bind(this.document.body, 'keypress', function(evt) {
		console.log("press");
	}, true);

}

Hotkeys.prototype.on = function(combo, handler) {

}