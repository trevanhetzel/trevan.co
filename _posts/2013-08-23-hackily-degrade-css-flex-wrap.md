---
id: 55
title: 'Hackily degrade CSS flex-wrap'
date: '2013-08-23T00:57:43+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=55'
permalink: /hackily-degrade-css-flex-wrap/
categories:
    - 'Code &amp; Design'
---

The [CSS Flexible Box Layout Module](http://www.w3.org/TR/css3-flexbox/ "CSS3 Flexbox") (flexbox) will solve a lot of pain points for developing flexible box layouts. It’s going above and beyond what we’ve ever been able to do with standard positioning and floats, allowing you to easily code up multiple column responsive layouts that adjust position based on content and without media queries. I say **will solve** because browser support is not there yet. In my opinion, the most powerful property introduced with flexbox is flex-wrap, which when set to wrap or wrap-reverse, allows elements inside a flex container to flow to multiple lines. However, from my tinkering, I’ve found that only the latest versions of Chrome support the flex-wrap property, so we have to gracefully degrade our layouts to provide a similar layout in every other browser.

Let’s look at the code required to make a multiple column layout that shifts list items to new rows when needed in order to always cover the amount of horizontal space our container allows.

**HTML**

```
<ul class="container">
  <li>Lorem ipsum</li>
  <li>dolor sit amet</li>
  <li>consectetur adipiscing elit</li>
  <li>Donec molestie</li>
  <li>acus sit amet condimentum rhoncus</li>
  <li>quam justo </li>
  <li>porta lacus, quis luctus urna ante quis sem</li>
</ul>

```

**CSS**

```
.container {
  margin: 0 auto;
  padding: 0;
  list-style: none;
  max-width: 900px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: box;
  display: flex;
  flex-wrap: wrap;
}
li {
  padding: 10px 50px;
  background: #bada55;
  margin: 10px;
  text-align: center;
  flex: auto; // Very important. Needed to tell the browser to take up all the horizontal space it can
}

```

### Chrome &amp; Opera result (our desired result)

{}![](/content/images/2013/Nov/Screen_Shot_2013_08_23_at_2_16_07_PM.png)

### Firefox result

{}![](/content/images/2013/Nov/Screen_Shot_2013_08_23_at_2_17_40_PM.png)

### Safari result

{}![](/content/images/2013/Nov/Screen_Shot_2013_08_23_at_2_18_32_PM.png)

As you can see, the only desirable result comes from our webkit browsers. Firefox and Safari just don’t render the flex-wrap property, and thus our content is jammed together (in Firefox) or strung out on a super long line (Safari).

So what do we do? Well since Chrome is the only current stable browser besides Opera to support flex-wrap anyway, we can just target it by removing all other vendor prefixed display values and just use display: -webkit-flex. Safari, Firefox, Opera and IE don’t pick this up, so their hacked up rendering of flexbox will be nonexistent.

**It would look like this in any browser that doesn’t support -webkit-flex:**

{}![](/content/images/2013/Nov/Screen_Shot_2013_08_23_at_2_40_22_PM.png)

***Note:** Opera does render flex-wrap well, but only via display: flex, which Firefox also renders, but in a crappy way. So this is not ideal, as we’re preventing Opera from using flexbox. Like I said, this is a hack and Opera only accounts for 1.6% of total browser usage.*

### Falling back

The result above is nothing close to our desired outcome, so here comes the fallback. We’re simply going to add in float and width properties to our list items. Pretty simple! Chrome will ignore the float value because the display of the container is set to display: -webkit-flex. It will however use the width we set as a starting point, so in our instance we’re going for 3 columns so we’ll give it a width of 31% (to account for the margins) and give it a box-sizing property.

```
.container {
  margin: 0 auto;
  padding: 0;
  list-style: none;
  max-width: 900px;
  display: -webkit-flex;
  flex-wrap: wrap;
}
li {
  padding: 10px 50px;
  background: #bada55;
  margin: 10px;
  text-align: center;
  flex: auto;
  float: left;
  width: 31%;
  webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

```

### Final code

See the Pen [Flex-wrap fallback](http://codepen.io/trevanhetzel/pen/dtKLm) by Trevan Hetzel ([@trevanhetzel](http://codepen.io/trevanhetzel)) on [CodePen](http://codepen.io)

<script async="" src="http://codepen.io/assets/embed/ei.js"></script>