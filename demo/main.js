var Hotkeys = require('..');

window.init = function() {

	var bindings = new Hotkeys();

	bindings.on('cmd shift a', function() {
		console.log("action 1");
	});

	bindings.on('cmd ctl z', function() {
		console.log("action 2");
	});

}