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