---
layout: post
title: RVM, Bash Scripting and Rails 3 Edge
date: 2010/07/19 17:34:00
tags: [rvm, bash, rails]
canonical_url: http://www.lostechies.com/blogs/joeydotnet/archive/2010/07/19/rvm-bash-scripting-and-rails-3-edge.aspx
---

I've only begun to tap into the power of bash scripting, but I had a need to automate setting up a 
Rails 3 app on edge, using [RVM](http://rvm.beginrescueend.com) like I want.  So I decided to whip up a very simple script that does 
the following for the name of app you're creating:

* Creates a new [RVM gemset](http://rvm.beginrescueend.com/gemsets/basics) for the app
* Creates a directory for the app
* Creates an [.rvmrc](http://rvm.beginrescueend.com/workflow/rvmrc) file under the new app directory to ensure the proper gemset is used whenever you switch to it
* Note: This assumes you have [REE 1.8.7](http://www.rubyenterpriseedition.com) installed under rvm (rvm install ree), which is the main ruby I'm still using for everything
* Installs latest prerelease of [bundler](http://github.com/carlhuda/bundler)
* Installs latest **[edge](http://github.com/rails/rails)** [version of rails 3](http://github.com/rails/rails)

Here's the bash script:
```bash
#! /bin/bash

# usage: bash rails3.sh &lt;appname&gt;

# source rvm to allow the environment to be changed (i.e. gemset)
source ~/.rvm/scripts/rvm

# create new gemset with the same name as the app name supplied
rvm gemset create $1

# then use the gemset, setting it as the active one
rvm gemset use $1

# create the app dir
mkdir $1

# generate a .rvmrc file to handle the autoswitching of rvm to use the gemset
echo "rvm ree-1.8.7-2010.02@$1" >> $1/.rvmrc

# install bundler prerelease that is required by rails 3 edge
gem install bundler --pre --no-rdoc --no-ri

# install rails prerelease (beta 4 currently, but this will get updated to edge in a sec)
gem install rails --pre --no-rdoc --no-ri

# create new rails app the way i currently like it, with the --edge argument
rails new $1 --skip-activerecord --skip-prototype --skip-testunit --edge

cd $1

# install all dependencies, including latest rails 3 edge
bundle install
```

What this quickly gives you is a new Rails 3 app running on edge, with everything installed in its 
own RVM gemset to keep from polluting the rest of your ruby environments or applications.

Of course I'm no bash expert, so I'd love to hear any improvements or other bash scripting-fu you 
guys are doing.

