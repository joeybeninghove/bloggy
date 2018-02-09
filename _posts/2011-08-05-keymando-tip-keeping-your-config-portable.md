---
layout: post
title: Keymando Tip - Keeping your config portable
date: 2011/08/05 21:50:00
tags: [osx, keymando, mouseless, keyboard, shortcuts, macros, automation, portability]
---

<img src='/assets/keymando.png' alt='Keymando' class='float-right ml-4' />

One of the tools I'm having a blast using these days is [Keymando](http://keymando.com) by his awesomeness [Kevin
Colyar](http://kevin.colyar.net).  Being a huge keyboard junkie and mouseless computing fanatic, this is the kind of
tool I've been needing for a long time in OSX.  I will probably be posting my own review of this product after I spend a
bit more time with it.  But I wanted to share a quick tip about managing its configuration file and plugins.

I have a very specific way I like to manage most my config files and other related 'dot files'.  I maintain a ['dotfiles' Git
repository](https://github.com/joeybeninghove/dotfiles) under a ~/.dotfiles directory which contains various configs such as my .bashrc, .vimrc, .vim directory and
plugins and many other files that I like to keep portable and versioned.  Then I just symlink all of the necessary configs to
my home directory and everything runs smooth as silk.  

Well as I've started playing around with my Keymando
configuration script (***which happens to be Ruby, how awesome is that!***), it feels like the type of config I want to maintain
in my .dotfiles directory.  The default location for Keymando's configuration file is under ***~/Library/Application
Support/Keymando/keymandorc.rb***.  In the current version of Keymando, you can change your target location for its
configuration and plugins directories through its ***Setup*** screen.

<img src='/assets/keymando_setup.png' alt='Keymando Setup' />

You can click each one and it will pop up a dialog allowing you to choose an alternate location for your Keymando
configuration file, directory and plugins directory.  If you manage a ***hidden*** .dotfiles directory like I do,
by default this will not show up in the OSX Finder dialog.  Well I just learned a little tip about [how to toggle the
showing/hiding of hidden files/directories in OSX Finder
dialogs](http://www.macworld.com/article/142884/2009/09/106seehidden.html).  You just simply have to press
***Command-Shift-.*** (that last key is a period) and then I can choose my .dotfiles/keymando directory I've set up to
store my Keymando configuration and plugins, which of course is part of my Git repository so it gets all the benefits of
that as well.

<img src='/assets/osx_finder_dialog.png' alt='OSX Finder dialog showing hidden
files/folders' class='bordered' />

Each developer/power user typically has their own way of managing configuration files, but hopefully this showed you an
example of one way to keep them nicely organized and more importantly, portable.  And if you haven't already, you should
definitely check out [Keymando](http://keymando.com).  It is already transforming the way I work and use OSX in a pretty
fundamental way.
