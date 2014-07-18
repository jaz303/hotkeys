SRC := index.js $(shell find lib *.js)

.PHONY: all

all: demo/bundle.js

demo/bundle.js: demo/main.js $(SRC)
	browserify -o $@ $<
