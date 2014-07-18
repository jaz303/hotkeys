var Hotkey = require('./Hotkey');

var normalize = require('./keycodes').normalizeKeyId;

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