SRC := index.js $(shell find lib *.js)

.PHONY: all

all: demo/bundle.js build/hotkeys.js build/hotkeys.min.js

demo/bundle.js: demo/main.js $(SRC)
	browserify -o $@ $<

build:
	mkdir -p build

build/hotkeys.js: $(SRC) build
	browserify -o $@ -s hotkeys $<

build/hotkeys.min.js: build/hotkeys.js
	./node_modules/.bin/uglifyjs $< > $@
