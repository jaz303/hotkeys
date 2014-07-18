var keycodes = require('./keycodes');

var defaults = keycodes.defaults;

module.exports = function(newDefaults) {

	if (!newDefaults) {
		return defaults;
	}

	if (typeof newDefaults === 'string') {
		newDefaults = keycodes[newDefaults];
	}

	defaults = newDefaults;

}