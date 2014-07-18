var hotkeys = require('..');

window.init = function() {

	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		hotkeys.defaultKeycodes('firefox');
	}

	var bindings = new hotkeys.Dispatcher();

	bindings.on('cmd -', function() { console.log("minus!"); });
	bindings.on('cmd =', function() { console.log("equals!"); });
	bindings.on('cmd ;', function() { console.log("semi!"); });

	bindings.on('ctrl a', function() {
		console.log("action 2");
	});

	bindings.on('cmd return', function() {
		console.log("BOOM");
	});

}