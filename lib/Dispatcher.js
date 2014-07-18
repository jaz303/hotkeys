module.exports = Dispatcher;

var Keymap          = require('./Keymap');
var parseKeyCombo   = require('./parse_key_combo');

function Dispatcher(el, keymap) {
    this._root = el || document.body;
    this._keymap = keymap || new Keymap();
    this._root.addEventListener('keydown', this._dispatch.bind(this), true);
}

Dispatcher.prototype.getKeymap = function() {
    return this._keymap;
}

Dispatcher.prototype.on = function(hotkey, fn) {

    if (typeof hotkey === 'string') {
        hotkey = parseKeyCombo(hotkey);
    }

    return this._keymap.bind(hotkey, fn);

}

Dispatcher.prototype._dispatch = function(evt) {

    var binding = this._keymap.bindingForEvent(evt);
    if (binding) {
        evt.stopPropagation();
        evt.preventDefault();
        binding.action();
    }

}