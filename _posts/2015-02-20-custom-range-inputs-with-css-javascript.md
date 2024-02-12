---
id: 95
title: 'Custom range inputs with CSS &#038; JavaScript'
date: '2015-02-20T01:16:34+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=95'
permalink: /custom-range-inputs-with-css-javascript/
categories:
    - CSS
    - JavaScript
---

> Styling range inputs is a joke
> 
> — Trevan Hetzel (@trevanhetzel) [February 18, 2015](https://twitter.com/trevanhetzel/status/567881635342856195)

I found out last night that styling HTML5 range inputs is kind of a joke, as I put it. Just a joke in that it’s way more involved to customize them than I feel like it should be, as it requires several vendor prefixes (to be expected I guess) and some JavaScript. So after [reading](http://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/) a few articles and browsing [Anna Tudor’s awesome collection](http://codepen.io/collection/DgYaMj/) of custom ranges on CodePen, I wanted to jot down the solution I came up with.

Starting with a simple element…

`<input type="range" class="range">`

We’ll target `.range` and first give it a `width` (not really required, but good for cross-browser consistency). Then we’ll set `-webkit-appearance` to `none` to reset the “thumb” in Chrome and Safari (don’t need to do so for Firefox).

Once those basic properties are in, the rest of the styling is done on the thumb and the track using, which are targeted using pseudo-elements.

```
// Thumb
&::-webkit-slider-thumb {
    -webkit-appearance: none; // needed again for Chrome & Safari
    @include rangeThumb;
}

&::-moz-range-thumb {
    @include rangeThumb;
}

&::-ms-thumb {
    @include rangeThumb;
}

// Track
&::-webkit-slider-runnable-track {
    @include rangeTrack;
}

&::-moz-range-track {
    @include rangeTrack;
}

&::-ms-track {
    @include rangeTrack;
}

&:focus { // override outline/background on focus
    background: none;
    outline: none;
}

&::-ms-track { // A little somethin' somethin' for IE
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

```

It’d be much cleaner if we could chain those pseudo-elements together to just end up with one chained selector for the thumb and one for the track, **but** apparently browsers won’t render the styles in this case if it sees a vendor prefix that it doesn’t understand. Since that’s the case, I find it best to use Sass include since the code for the thumb and track is repeated three times. Those just contain your standard properties in the way you’d style any other block level element.

```
@mixin rangeThumb {
    border: 1px solid #3498db;
    width: .875em;
    height: .875em;
    border-radius: 4px;
    background: #eee;
    cursor: pointer;
    margin-top: -5px;
}

@mixin rangeTrack {
    width: 100%;
    height: .313em;
    cursor: pointer;
    border-radius: 3px;
    background: #fff;
}

```

That’s it for the CSS! You could stop there, but if you’re wanting to do ranges right you’re going to want to fill the track on either side of the thumb to better indicate the value.

### Result with CSS only

{}![Styled with CSS only](/content/images/2015/Feb/range_style_css.png)

### Result with JavaScript enhancement

{}![Styled with CSS and JavaScript enhancement](/content/images/2015/Feb/range_style_js.png)

So let’s add the fill with JavaScript! Again, I feel like you should be able to do this just with CSS, but unfortunately you can’t yet (except for IE which actually supports `::-ms-fill-lower` and `::-ms-fill-upper`).

Here’s my JavaScript solution I settled on, which again takes inspiration from Anna Tudor’s [Pens](http://codepen.io/collection/DgYaMj/).

```
var sheet = document.createElement('style'),
    $rangeInput = $('.range'),
    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {
    var curVal = el.value,
        style = '';

    for (var i = 0; i < prefs.length; i++) {
        style += '.range::-' + prefs[i] + '{background: linear-gradient(to right, #34495e 0%, #34495e ' + curVal + '%, #fff ' + curVal + '%, #fff 100%)}';
    }

    return style;
}

$rangeInput.on('input', function () {
    sheet.textContent = getTrackStyle(this);
});

```

The point of the above script is to insert a `<style>` block in the DOM and then insert into it a CSS background gradient for the three vendor prefixed track selectors. Kind of hacky, huh? The reason you can’t just do this in your external stylesheet is because you have to constantly change the background gradient positions when the value of the input changes. There’s actually a way to update styles in an external stylesheet, but from what I found it’s almost impossible to delete/update them without knowing exactly what line number they’re on (which is just a pain). So I’m sticking with the `<style>` block for now.

To break down the script a bit more, I’m first creating a new stylesheet and saving the range in a variable as a jQuery object and setting an array that contains each vendor prefix name. Next I append the stylesheet to the `body` element so it’s actually in the DOM. After that is the function that gets called whenever the `input` event is fired on the range element. When that event is fired, `sheet.textContent` (kind of like `.html()` but for stylesheets) is set equal to the `getTrackStyle` function, which returns three vendor prefixed track properties with the background gradient position based on the current value.

Done!

Although…

On the project I was working on, I had multiple range inputs. The above JavaScript won’t work properly with more than one input because whenever one input’s value is changed the rest of the inputs render the same background gradient. To combat that, I ended up setting a unique ID on each input and created a separate `<style>` block for each one. My event handler then looked like this:

```
$rangeInput.on('input', function () {
    var curId = $(this).parent().attr('id');

    if (curId == 'range-distance') {
        sheet1.textContent = getTrackStyle(this, curId);
    } else if (curId == 'range-price') {
        sheet2.textContent = getTrackStyle(this, curId);
    }
});

```

`curId` gets passed into `getTrackStyle`, which then uses the unique ID to make the vendor prefixed track selectors more specific:

```
var getTrackStyle = function (el, curId) {
    var curVal = el.value,
        style = '';

    for (var i = 0; i < prefs.length; i++) {
        style += '#' + curId + ' input::-' + prefs[i] + '{background: linear-gradient(to right, #2c3e50 0%, #2c3e50 ' + curVal + '%, #f4f5f4 ' + curVal + '%, #f4f5f4 100%)}';
    }

    return style;
}

```

There you have it! Here’s the Pen I made as well (doesn’t contain support for multiple inputs): <http://codepen.io/trevanhetzel/pen/emMPxa>