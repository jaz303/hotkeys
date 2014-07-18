!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.hotkeys=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = {
    defaultKeycodes     : _dereq_('./lib/default_keycodes'),
    Dispatcher          : _dereq_('./lib/Dispatcher'),
    Hotkey              : _dereq_('./lib/Hotkey'),
    Keymap              : _dereq_('./lib/Keymap'),
    parseKeyCombo       : _dereq_('./lib/parse_key_combo')
};
},{"./lib/Dispatcher":2,"./lib/Hotkey":3,"./lib/Keymap":4,"./lib/default_keycodes":5,"./lib/parse_key_combo":7}],2:[function(_dereq_,module,exports){
module.exports = Dispatcher;

var Keymap          = _dereq_('./Keymap');
var parseKeyCombo   = _dereq_('./parse_key_combo');

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
},{"./Keymap":4,"./parse_key_combo":7}],3:[function(_dereq_,module,exports){
module.exports = Hotkey;

function Hotkey() {
    this.ch             = null;
    this.alt            = false;
    this.ctrl           = false;
    this.meta           = false;
    this.shift          = false;
    this.allowRepeat    = true;
}

Hotkey.prototype.matchesHotkey = function(key) {
    return this.ch === key.ch
        && this.alt === key.alt
        && this.ctrl === key.ctrl
        && this.meta === key.meta
        && this.shift === key.shift
        && this.allowRepeat === key.allowRepeat;
}

Hotkey.prototype.matchesEvent = function(ch, evt) {
    return ch === this.ch
        && evt.altKey === this.alt
        && evt.ctrlKey === this.ctrl
        && evt.metaKey === this.meta
        && evt.shiftKey === this.shift
        && (!evt.repeat || this.allowRepeat)
}
},{}],4:[function(_dereq_,module,exports){
module.exports = Keymap;

var defaultKeycodes = _dereq_('./default_keycodes');
var parseKeyCombo = _dereq_('./parse_key_combo');

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
    this.keymap.remove(this);
}
},{"./default_keycodes":5,"./parse_key_combo":7}],5:[function(_dereq_,module,exports){
var keycodes = _dereq_('./keycodes');

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
},{"./keycodes":6}],6:[function(_dereq_,module,exports){
// based on http://www.javascripter.net/faq/keycodes.htm

function Mapping(extras) {
    this._codeToId = new Globals();
    this._idToCode = new GlobalsReverse();

    for (var k in extras) {
        this._codeToId[k] = extras[k];
        this._idToCode[extras[k]] = k;
    }
}

Mapping.prototype.keyIdForCode = function(code) {
    return this._codeToId[code];
}

Mapping.prototype.nameForCode = function(code) {
    return Names[code];
}

Mapping.prototype.codeForKeyId = function(keyId) {
    return this._idToCode[keyId]
}

Mapping.prototype.nameForKeyId = function(keyId) {
    var code = this._idToCode(keyId);
    if (!code) return void 0;
    return Names[code];
}

var Names = {
    'backspace' : 'Backspace',
    'tab'       : 'Tab',
    'enter'     : 'Enter',
    'capslock'  : 'Caps Lock',
    'escape'    : 'Escape',
    'space'     : 'Space',
    'pageup'    : 'Page Up',
    'pagedown'  : 'Page Down',
    'end'       : 'End',
    'home'      : 'Home',
    'left'      : 'Left Arrow',
    'up'        : 'Up Arrow',
    'right'     : 'Right Arrow',
    'down'      : 'Down Arrow',
    'insert'    : 'Insert',
    'delete'    : 'Delete',
    'winkey'    : 'Windows Key',
    'winmenu'   : 'Windows Menu'
};

function Globals() {};
Globals.prototype = {
    8       : 'backspace',
    9       : 'tab',
    13      : 'enter',
    20      : 'capslock',
    27      : 'escape',
    32      : 'space',
    33      : 'pageup',
    34      : 'pagedown',
    35      : 'end',
    36      : 'home',
    37      : 'left',
    38      : 'up',
    39      : 'right',
    40      : 'down',
    45      : 'insert',
    46      : 'delete',
    188     : ',',
    190     : '.',
    191     : '/',
    192     : '`',
    219     : '[',
    220     : '\\',
    221     : ']',
    222     : "'"
};

// 0-9
for (var i = 48; i <= 57; ++i) {
    var keyId = ('' + (i - 48));
    Names[keyId] = keyId;
    Globals.prototype[i] = keyId;
}

// A-Z
for (var i = 65; i <= 90; ++i) {
    var keyId = String.fromCharCode(i).toLowerCase();
    Names[keyId] = keyId.toUpperCase();
    Globals.prototype[i] = keyId;
}

// F1-F12
for (var i = 112; i <= 123; ++i) {
    var keyId = 'f' + (i - 111);
    Names[keyId] = keyId.toUpperCase();
    Globals.prototype[i] = keyId;
}

var GlobalsReverse = function() {};
for (var k in Globals.prototype) {
    GlobalsReverse.prototype[Globals.prototype[k]] = k;
}

exports.defaults = new Mapping({
    186 : ';',
    187 : '=',
    189 : '-',
    91  : 'winkey',
    93  : 'winmenu'
});

exports.firefox = new Mapping({
    59  : ';',
    61  : '=',
    173 : '-',
    91  : 'winkey',
    93  : 'winmenu'
});

exports.opera = new Mapping({
    59  : ';',
    61  : '=',
    109 : '-',
    219 : 'winkey',
    0   : 'winmenu'
});

//
// Alternative key IDs...

var ALTS = {
    'bksp'      : 'backspace',
    'del'       : 'delete',
    'esc'       : 'escape',
    'ins'       : 'insert',
    'pgup'      : 'pageup',
    'pgdown'    : 'pagedown',
    'return'    : 'enter'
};

exports.normalizeKeyId = function(keyId) {

    keyId = keyId.toLowerCase();
    if (keyId.length > 1) {
        keyId = keyId.replace(/-/g, '');
    }

    return ALTS[keyId] || keyId;

}

},{}],7:[function(_dereq_,module,exports){
var Hotkey = _dereq_('./Hotkey');

var normalize = _dereq_('./keycodes').normalizeKeyId;

module.exports = function(str) {
    
    var hotkey = new Hotkey();

    str.trim().split(/\s+/).forEach(function(c) {
        if (c.match(/alt|option/i)) {
            hotkey.alt = true;
        } else if (c.match(/cmd|command|meta/i)) {
            hotkey.meta = true;
        } else if (c.match(/control|ctl|ctrl/i)) {
            hotkey.ctrl = true;
        } else if (c.match(/shift/i)) {
            hotkey.shift = true;
        } else if (c === '!') {
            hotkey.allowRepeat = false;
        } else {
            hotkey.ch = normalize(c);
        }
    });

    if (!hotkey.ch) {
        throw new Error("invalid hotkey: no key ID specified");
    }
    
    return hotkey;

}
},{"./Hotkey":3,"./keycodes":6}]},{},[1])
(1)
});