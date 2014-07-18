# hotkeys

A hotkey manager.

## Installation

### npm

Get it:

	$ npm install hotkeys

Require it:

	var hotkeys = require('hotkeys');

## API

### Dispatcher

#### `var dispatcher = new hotkeys.Dispatcher()`

#### `dispatcher.getKeymap()`

#### `dispatcher.on(keyCombo, fn)`

### Binding

#### `binding.remove()`

### Keymap

#### `var keymap = new hotkeys.Keymap([keycodes])`

#### `keymap.bind(hotkey, action)`

#### `keymap.remove(binding)`

#### `keymap.bindingForEvent(evt)`

### Functions

#### `hotkeys.defaultKeycodes([defaults])`

Get or set the default keycode mapping. See "Browser Compatibility", below.

#### `hotkeys.parseKeyCombo(keyCombo)`

## Browser Compatibility

`hotkeys` supports differences between reported `keyCodes` for various browsers. Variants for Firefox, Opera and Chrome/IE/Safari are supplied out of the box but it's trivial to add new mappings - check out `lib/keycodes.js` for the gory details.

To set up `hotkeys` for specific browser support call `hotkeys.defaultKeycodes()` before calling any other library functions. Valid arguments are either `defaults` (for Chrome/IE/Safari), `firefox` or `opera`. Browser detection is the responsibility of your code, it is not included in the `hotkeys` library.