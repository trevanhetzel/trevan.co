# Trevan's theme

My custom theme for [Ghost](http://github.com/tryghost/ghost/)

## Usage

I'm using the [Bourbon](http://bourbon.io/) library with a [SMACSS](http://smacss.com/) file structure. All the CSS was built mobile-first.

Colors can be changed site-wide in ```assets/css/scss/variables/```. Same with fonts, although you'll also need to update the reference to Google Fonts in ```default.hbs```.

The JS libraries I'm using ([Highlight](http://highlightjs.org/) & [Reading Time](https://github.com/michael-lynch/reading-time)) are in ```assets/js/lib/```

As far as browser support, I've tested in IE8+, Android, iOS, and all the major desktop browsers. IE8 gets a single column version because it doesn't support media queries and the site was built mobile first. If you need support for IE8, I'd just throw in a reference to [Respond.js](https://github.com/scottjehl/Respond) or follow a method like [Sparkbox's](http://seesparkbox.com/foundry/structuring_and_serving_styles_for_older_browsers).

## Copyright & License

Do whatever you want with my theme. Just don't steal my content. Cool?

----

Copyright (C) 2013 Trevan Hetzel - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
