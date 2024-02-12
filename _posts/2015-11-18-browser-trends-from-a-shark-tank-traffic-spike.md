---
id: 117
title: 'Browser trends from a Shark Tank traffic spike'
date: '2015-11-18T15:28:15+00:00'
author: admin
layout: post
guid: 'http://trevan.co/?p=117'
permalink: /browser-trends-from-a-shark-tank-traffic-spike/
categories:
    - Performance
    - Responsive
---

For the past year I’ve been working with [Rent Like a Champion](http://rentlikeachampion.com), who recently sealed a sweet deal with Mark Cuban and Chris Sacca on [ABC’s Shark Tank](http://abc.go.com/shows/shark-tank/episode-guide/season-07/06-week-6-rent-like-a-champion-hotshot-windcatcher-stem-center-usa). I started contracting with them a little over a year ago by completely redesigning their website and coding up the front-end responsively. We had no idea at this time last year that an airing on the show was in our near future. But fortunately, when word came that Mike Doyle, the CEO, and Drew Mitchell, one of the founders, would be pitching the Sharks earlier this year, we had already spent a good 6 months on the responsive redesign. That was critical because, as you’ll see in this article, the viewing trends from users on the night of the show proved just how important it was to have a device agnostic web application.

In preparation for the airing, we didn’t really know how much traffic we would see the night of the show, but we had a general idea and a goal to aim for. Our CTO and two back-end engineers spent a good month or so prior to the airing setting up a very scalable infrastructure that relied on multiple load balancers and application and database servers. In the end we might have been over-prepared, as we didn’t see one hiccup from the traffic that hit the Server Central infrastructure. One of the biggest things we did was ensured that the server could cache the heck out of the home page and static pages. Aside from that, there wasn’t anything too spectacular done on the front-end in preparation for the show; I basically just made sure there would be no hangups, as I spent quite a bit of time on the front-end performance from the beginning when I started coding it.

The most intriguing part of the whole thing to me was the browser and device statistics. I watched the traffic in Google Analytics in real-time as the show was being aired and saw some pretty interesting trends. Here they are!

## 80% of traffic came from phones and tablets

It makes sense that people watching a TV show would be browsing on a mobile device. It makes even more sense now after watching the analytics in real-time and seeing the stats firsthand. The biggest standout for me from that night was the fact that nearly 80% of our traffic came from phones and tablets. You always hear that “mobile is on the raise” but seeing it in action really drives that point home.

| Mobile | 60.79% |
|---|---|
| Tablet | 18.33% |
| Desktop | 20.88% |

<small>Sessions breakdown from the Shark Tank airing night</small>

Almost all of that mobile traffic was from unique visitors who entered the home page. 76.3% of them clicked through to another page, with the most popular being the Notre Dame listing page.

## People like iPhones

Out of all the mobile/handheld device traffic, the overwhelmingly most popular device was the iPhone (54.7%), followed by the iPad (19.87%). The other fourth consisted mainly of Samsung S models and Motorola Droid Turbos and Ultras.

| Apple iPhone | 54.70% |
|---|---|
| Apple iPad | 19.87% |
| Samsung Galaxy S5 | 3.53% |
| Samsung Galaxy S4 | 1.23% |
| Samsung Galaxy S6 | 0.96% |
| Motorola Droid Turbo | 0.67% |
| Motorola Droid Ultra | 0.65% |
| Plethora of other devices | 18.39% |

<small>Most popular mobile devices used to browse the site</small>

## They also like Chrome

Not surprisingly, Chrome was the most popular desktop browser. I was really happy to see that nearly all of the desktop traffic came from pretty modern browsers that can support a lot of the CSS3 properties I used throughout the site. The oldest browser was Internet Explorer 7, with only 2 visits.

| Chrome | 52.88% |
|---|---|
| Safari | 18.34% |
| Internet Explorer 11 | 14.13% |
| Firefox | 12.32% |
| Internet Explorer 10 | 1.43% |
| IE 9, 8, 7 and Opera | 0.9% |

<small>Most popular desktop browsers used to browse the site</small>

## And they came in droves

Out of all the statistics, the sheer volume of traffic within a 20 minute period was the most incredible thing to watch. We saw over a 1,000% increase in visitors compared to the day before the show aired. But like all good things, it came to an end (quickly). Traffic has gone more or less back to normal now (about 2.5 weeks after the airing), with just a bit of an increase in average daily sessions. Desktop visits are now back up to about 45% of the total traffic with Chrome still being the most popular, as homeowners and renters take back over as the majority of our traffic.

In closing, I’ll leave you with this line graph from Google Analytics…

![Shark Tank wave](http://trevan.co/wp-content/uploads/2015/11/shark-tank-wave-1024x180.png)