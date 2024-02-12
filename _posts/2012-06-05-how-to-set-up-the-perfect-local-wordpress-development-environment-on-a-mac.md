---
id: 25
title: 'How to set up the perfect local WordPress development environment on a Mac'
date: '2012-06-05T00:32:37+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=25'
permalink: /how-to-set-up-the-perfect-local-wordpress-development-environment-on-a-mac/
categories:
    - 'Code &amp; Design'
---

I use WordPress for the majority of my clients’ websites and, until recently, was doing separate installs of WordPress on my live server, under a subdomain. I finally sat down and learned how to take advantage of two of WordPress’s finer features: multisite and local installations. It was a snap to get WordPress up and running locally, but took me a little while to figure out the multisite feature. So I’ve documented the process that I took to get it working in hopes I can help at least one Mac user out there who wants to speed up their WordPress development by working locally.

## STEP 1: Download &amp; install [MAMP](http://www.mamp.info/en/index.html "MAMP download") and download [WordPress](http://wordpress.org/download/ "Wordpress download")

## STEP 2: Edit the hosts file

Open up Terminal and type:

```
sudo nano /private/etc/hosts

```

Use the down arrow key to get to the very bottom of the list and type 127.0.0.1, then hit tab, then type the domain you wish to use for your WordPress location (I use localdev.com). Hit ctrl+0 then enter to save this file.

{}![Editing the hosts file](/content/images/2013/Nov/step2.jpg)

## STEP 3: Paste the WordPress files into MAMP’s /htdocs folder

Paste just the files from the ‘wordpress’ folder. Do not paste the actual ‘wordpress’ folder itself. You need its child files. The path to the /htdocs folder will be: /Applications/MAMP/htdocs

## STEP 4: Create a database

Click on ‘Open start page’ from the MAMP application, which will open up a web page in your default browser. From there, click ‘phpMyAdmin’ at the top and then enter a name for your new database and click ‘Create’.

{}![Create a database](/content/images/2013/Nov/step4.jpg)

## STEP 5: Modify your MAMP preferences

Click on ‘Preferences’ from the MAMP application. Under the Apache tab click ‘select’ and navigate to /Applications/MAMP/htdocs. Then, under the Ports tab, change your Apache port to 80 and leave the MySQL port what it is (mine is set to 8889).

{}![Modify MAMP preferences](/content/images/2013/Nov/step5.jpg)

## STEP 6: Edit your WordPress config file

Navigate in finder to the /htdocs folder and rename the wp-config-sample.php file to wp-config.php. Open that up in a text editor (Coda 2 is the bomb) and enter the database name that you created in step 4. Type ‘root’ for both your username and password.

Directly above the line that says:

```
/* That's all, stop editing! Happy blogging. */

```

**Paste this:**

```
define('WP_ALLOW_MULTISITE', true);

```

## STEP 7: Create your network in WP Admin

You’re now running WordPress locally! You should be able to navigate to http://localdev.com or whatever URL you specified in step 2 and run the famous 5-minute WordPress install.

The last step is to enable the multisite functionality by going to Tools –&gt; Network Setup from your WP dashboard. Click ‘Install’ and then follow the two steps it gives you there. I use subdomains (sub.example.com), not directories, which might affect how you handle the last step. *(Tip: you’ll have to [view hidden files](http://www.mactricksandtips.com/2008/04/show-hidden-files.html "View hidden files") to edit the .htaccess file)*

## STEP 8: Add your subdomains to the hosts file

At this point once you create a subdomain, you have to go back into Terminal and add that subdomain to the hosts file.

So in Terminal type:

```
sudo nano /private/etc/hosts

```

Enter your password when it prompts you to

Use the down arrow key to get to the very bottom of the list (right beneath the entry you added in step 2). Type 127.0.0.1, then tab, then type the subdomain you created (sub.example.com). Hit ctrl+0 to save. Each time you add a new site in WP Admin, you’ll have to repeat this step by adding a new line here in Terminal. I’m sure there’s a better way, but this works so I’m sticking with it!

{}![Editing the hosts file](/content/images/2013/Nov/step8.jpg)

## CLOSING THOUGHTS:

Make sure your servers are started in MAMP!