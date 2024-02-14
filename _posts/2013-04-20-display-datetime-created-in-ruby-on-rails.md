---
id: 49
title: 'Display date/time created in Ruby on Rails'
date: '2013-04-20T00:56:12+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=49'
permalink: /display-datetime-created-in-ruby-on-rails/
categories:
    - 'Code & Design'
---

Displaying the time and date something was created is a super simple thing to do in Rails, once you find out how! Took me a while to find the solution from Googling, so I figured I’d write a short little tutorial here on how to do it.

So basically I am coding the tutorials section of [Sidecar](http://sidecarhq.com) and wanted to show when a tutorial was created. Here’s how to do it without touching the model or controller:

In your view, you can simply use `created_at` to output the date/time an item was added to the database. So within your loop (i.e. `<% @tutorials.each do |tutorial| %>`…) just put `<%= tutorial.created_at %>`. This will output something like this: ‘2013-04-20 01:32:11 UTC’. Clearly not what we want as it’s hard to read and unconventional. We can format the output of the date by using ‘.strftime’ appended to ‘.created\_at’. Like this: `<%= tutorial.created_at.strftime("%b %d, %Y") %>`, which will output ‘Apr 20, 2013’.

You can find a list of all the strftime formats [here](http://apidock.com/ruby/DateTime/strftime)