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
    'caps'      : 'capslock',
    'del'       : 'delete',
    'esc'       : 'escape',
    'ins'       : 'insert',
    'pgup'      : 'pageup',
    'pgdown'    : 'pagedown',
    'return'    : 'enter',
    'win'       : 'winkey'
};

exports.normalizeKeyId = function(keyId) {

    keyId = keyId.toLowerCase();
    if (keyId.length > 1) {
        keyId = keyId.replace(/-/g, '');
    }

    return ALTS[keyId] || keyId;

}
