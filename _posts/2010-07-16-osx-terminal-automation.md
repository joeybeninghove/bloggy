---
layout: post
title: OSX Terminal Automation
date: 2010/07/16 22:42:00
tags: [osx, terminal, automation]
canonical_url: //www.lostechies.com/blogs/joeydotnet/archive/2010/07/16/quick-tip-osx-terminal-automation.aspx
---

## My OSX Terminal Environment (as of today)

Some of this might be old hat for a lot of you, but maybe this will help at least a few people.  
I'm a pretty big automation addict.  During my Ruby on Rails work, I find myself opening up the 
same set of terminal windows, positioned in the same way, running the same commands...all the time.  

I typically keep at least 3 OSX terminal windows open (some with multiple tabs).  But when I sit down 
to start working with nothing open yet, I usually keep 2 terminal windows tiled to the left, 1 on top 
of another.  

The top one I usually use for most filesystem and git operations.  I also use this one to open other 
tabs for running things like **rails console** or a mongodb console if necessary.

The bottom one I usually have [rstakeout](http://github.com/EdvardM/rstakeout) running in the background 
to run my specs or cucumber scenarios automatically.  

Then I keep a third terminal window open, tiled to the right at full height running **rails server** in one 
tab and **compass watch** in another tab.

## Automating It

First step is to set up specific terminal settings for each window/tab based on how you want them to 
behave when they start.  Here is an example of a basic terminal that changes to the directory I want 
when started.

<img src='/assets/terminal.png' alt='terminal' />

And here is a separate terminal setting for automatically starting Compass when the terminal session is 
started.

<img src='/assets/terminal-compass.png' alt='terminal - compass' />

And here is a another one for autostarting the rails server when the terminal session is started.

<img src='/assets/terminal-rails-server.png' alt='terminal - rails server' />

Now, all these can easily be combined into a 'Windows Group' that can be opened by the OSX Terminal in 
one shot, opening multiple terminal windows/tabs all at once using separate terminal settings.  Just 
open the terminal windows/tabs and position them how you like them, then just save it as a window group.

<img src='/assets/terminal-windows-group.png' alt='terminal - windows group' />

Here's a quick video of a window group in action:

<object width="400" height="250"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=13406868&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=1&amp;color=&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" /><embed src="http://vimeo.com/moogaloop.swf?clip_id=13406868&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=1&amp;color=&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="400" height="250"></embed></object><p><a href="http://vimeo.com/13406868">My OSX Terminal Environment</a> from <a href="http://vimeo.com/user3814096">Joey Beninghove</a> on <a href="http://vimeo.com">Vimeo</a>.</p>

As you can see, I can get my entire terminal environment up and running with a single command.  
(Even better when I can use the fabulous [ViKing](http://www.vikingapp.com) app by Kevin Colyar to 
navigate the OSX menus using Vim bindings!)

## Wrap Up

In case you're wondering which OSX terminal theme I'm using, it's my own tweaked version of 
[IR_Black](http://blog.infinitered.com/entries/show/6) which I really like.  Also, if you want to 
try out my terminal settings directly, I've exported the terminal settings files and the window 
grouping and pushed them up to my [terminal repo on GitHub](http://github.com/joeybeninghove/terminal).  

Also I'd LOVE to hear other tips on how you're automating your development environments, specifically in OSX!

Happy Automating!

