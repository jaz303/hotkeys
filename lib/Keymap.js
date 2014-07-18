module.exports = Keymap;

var defaultKeycodes = require('./default_keycodes');
var parseKeyCombo = require('./parse_key_combo');

function Keymap(keycodes) {
    this._keycodes = keycodes || defaultKeycodes();
    this._map = {};
}

Keymap.prototype.bind = function(hotkey, action) {
    
    var binding = new Binding(this, hotkey, action);

    var forChar = this._map[hotkey.ch] || (this._map[hotkey.ch] = []);
    forChar.push(binding);

    return binding;

}

Keymap.prototype.remove = function(binding) {

    var forChar = this._map[binding.hotkey.ch];
    if (!forChar) return;

    var ix = forChar.indexOf(binding);
    if (ix >= 0) {
        forChar.splice(ix, 1);
    }

}

Keymap.prototype.bindingForEvent = function(evt) {

    var ch = this._keycodes.keyIdForCode(evt.keyCode);
    if (!ch) {
        return null;
    }

    var forChar = this._map[ch];
    if (!forChar) return;

    for (var i = 0; i < forChar.length; ++i) {
        if (forChar[i].hotkey.matchesEvent(ch, evt)) {
            return forChar[i];
        }
    }

    return null;

}

function Binding(keymap, hotkey, action) {
    this.keymap = keymap;
    this.hotkey = hotkey;
    this.action = action;
}

Binding.prototype.remove = function() {
    this.keymap.removeBinding(this);
}