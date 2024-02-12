---
id: 53
title: 'Testing WordPress websites through a virtual machine'
date: '2013-06-24T00:56:48+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=53'
permalink: /testing-wordpress-websites-through-a-virtual-machine/
categories:
    - 'Code &amp; Design'
---

I’m a fan of [Browserstack](http://browserstack.com "Browserstack") for browser testing, but sometimes it’s just nice to not have to wait around for the Browserstack servers to load. And even more nice is the ability to debug in an actual browser without going through Browserstack’s lagging servers.

Enter [VirtualBox](http://virtualbox.org "VirtualBox") and [modern.IE](http://modern.ie "modern.IE"). Internet Explorer is pushing to appeal more to developers and prove that their much hated on browser can actually stand up in a match between Chrome, Safari, Firefox, etc. so they’ve created modern.IE that offers FREE virtual machines to run IE6 – 10 locally on your Mac (or PC).

I’ve used their virtual machines through VirtualBox to test local HTML pages, but never a WordPress site. Until now. There’s a little trick to it, but it’s really not hard at all.

## 1. Download [VirtualBox](http://virtualbox.org "VirtualBox")

## 2. Download a [virtual machine](http://www.modern.ie/en-us/virtualization-tools#downloads "Download virtual machine") (or 2 or 4 or 5…) from modern.IE

Just follow the steps to get the virtual machine up and running in VirtualBox.

## 3. Set up a MAMP server

See a [previous post](http://trevan.co/how-to-set-up-the-perfect-local-wordpress-development-environment-on-a-mac/ "Local WordPress development environment") I wrote on this.

## 4. Start up your virtual machine

## 5. Open Notepad as administrator

From the Windows start screen, just start typing “note”. You should see the Notepad application show up. Right-click that and “Run as administrator”.

## 6. Modify the hosts file

Open this file (in Windows 8; not sure the exact location in older Windows versions): c:/windows/system32/drivers/etc/hosts. At the very end of the file, add this:

```
10.0.2.2  localhost:8888

```

Replace localhost:8888 with the host name of your server that you set up in MAMP. Save.

## 7. Bask in browser testing glory

Open up Internet Explorer inside your VM and navigate to localhost:8888 (or whatever your host name is). Badabing-badabang!

*\*Note: This method doesn’t just work for WordPress sites. You can test local static files just the same, as long as you have a MAMP server going.*