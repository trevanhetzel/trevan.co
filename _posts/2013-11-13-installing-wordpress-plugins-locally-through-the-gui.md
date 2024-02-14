---
id: 57
title: 'Installing WordPress plugins locally through the GUI'
date: '2013-11-13T00:58:41+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=57'
permalink: /installing-wordpress-plugins-locally-through-the-gui/
categories:
    - 'Code & Design'
---

I do a lot of local WordPress development (running MAMP Pro on my MacBook Air with Mavericks). One thing that I’ve always just kind of bypassed was downloading and installing plugins directly from the WP admin area, as it requires you to provide FTP credentials. I wasn’t ever sure how to set up FTP locally until recently. It’s actually super easy!

All you have to do is add this line in `wp-config.php`:

```
define('FS_METHOD', 'direct');

```

It probably doesn’t matter where, but I added it right below the line that says `/* That's all, stop editing! Happy blogging. */`

Then you’ll have to go into MAMP and give “others” directory write privileges. That’s it!