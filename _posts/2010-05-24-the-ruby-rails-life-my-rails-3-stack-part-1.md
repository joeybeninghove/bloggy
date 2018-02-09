---
layout: post
title: My Rails 3 Stack - Part 1
date: 2010/05/24 22:35:00
tags: [ruby, rails, mongodb, mongoid, devise, cancan, sass, haml, blueprint, compass, jquery]
canonical_url: http://www.lostechies.com/blogs/joeydotnet/archive/2010/05/24/the-ruby-rails-life-my-rails-3-stack-part-1.aspx
---

As some of you might know, About a month ago I left my almost 10 year career as a Microsoft developer to become 
an independent Ruby/Rails developer (a term I'm deeming ["pulling a Gunderloy"](http://afreshcup.com/home/2006/12/8/what8217s-going-on-here.html)).
It was long overdue for me and I couldn't be happier to be free from the shackles of Microsoft.
It seems lately there are [more and more folks](http://www.infoq.com/articles/architecting-tekpub) coming to the 
same realization as I have and are making the jump to work with more open technologies and platforms on the web.
But I'll leave that conversation to the twitterverse.

## Big Fat Disclaimer
As noted above, I've only been doing full-time professional Ruby/Rails development now for about a month.
So what you see below is the outcome of my past month of both struggles and successes.  I don't claim to
be anywhere near a Rails expert yet, so please feel free to leave **nice** and **helpful** comments about any misconceptions
I may convey below.  :D

## My Rails Stack
I've been given a pretty great opportunity to build a large greenfield product from the ground up using any 
technology stack I want.  Here is a brief overview of the technologies I've chosen to use for my current project, 
which I'm loving so far.  I'm not going to go into too much detail, but will provide a few useful links for the 
relevant projects where you can read up on how to get rolling with them.  I'm purposefully not including links 
to everything I'm going to talk about because Google is your friend.

### RVM (Ruby Virtual Machine)
This is such an awesome tool.  This not only allows you to run completely different Ruby versions 
side by side in isolation, but also the entire environment include gems are isolated from each other. 
So you can set up different Ruby environments to test out different versions, and the gems you install 
in a particular environment don't affect anything else.  This is a must have if you're experimenting 
with different Ruby versions, which I am not yet.

* [http://rvm.beginrescueend.com](http://rvm.beginrescueend.com)
* [http://github.com/wayneeseguin/rvm](http://github.com/wayneeseguin/rvm)
* [irc://irc.freenode.net/#rvm](irc://irc.freenode.net/#rvm)

### Ruby 1.8.7 (for now)
I decided to stick with Ruby 1.8.7 for now since it seems to work just fine with Rails 3 and plays 
nice with all of the gem dependencies I've taken on so far, some of which may not be up to par yet 
with Ruby 1.9.x.  I suspect at some point I'll make the switch over to Ruby 1.9 and see how it does. 
And most certainly once Rails 3 finally drops.

* [http://www.ruby-lang.org](http://www.ruby-lang.org)
* [http://rubyflow.com](http://rubyflow.com)
* [http://www.rubyinside.com](http://www.rubyinside.com)
* [irc://irc.freenode.net/#ruby-lang](irc://irc.freenode.net/#ruby-lang)

### Rails 3 (Beta 3/Edge)
I decided to go with Rails 3 for this new project, mainly because Rails 3 is quite a huge update over 
<strike>2.3.5</strike> 2.3.8, the current "offical" version of Rails.  And because Rails 3 comes with some 
really awesome new features and improvements.  I started with just running Beta 3, which is pretty solid, 
but decided to switch over to Edge Rails for a while to get some of the benefits of some of the dependencies 
I'm using that take advantage of Edge Rails.  There have been a few minor hiccups along the way, 
but nothing major so far.

There are many great resources out there for Rails 3, but if you're interested in really nice detailed 
posts and screencasts on new Rails 3 features, check out the [Rails Dispatch blog](http://railsdispatch.com/posts) 
where Yehuda himself and other great guys are posting some really great content.  The excellent 
[Rails Guides](http://guides.rails.info) are also being updated pretty rapidly to cover the changes in Rails 3.
Or if you want to dig directly into the API documentation check out one of my favorite Ruby API sites, 
[RailsAPI](http://railsapi.com).  RailsAPI is pretty cool in that it lets 
you create a customized API documentation package for Ruby, Rails and popular gems that you can either 
browse online or even download.

* [http://rubyonrails.org](http://rubyonrails.org)
* [http://github.com/rails/rails](http://github.com/rails/rails)
* [http://railsdispatch.com](http://railsdispatch.com)
* [http://guides.rails.info](http://guides.rails.info)
* [http://railsapi.com](http://railsapi.com)
* [irc://irc.freenode.net/#rubyonrails](irc://irc.freenode.net/#rubyonrails)

### Haml
A lot of folks might already know my LOVE for [Haml](http://haml-lang.com).  I've been using Haml for about a year 
and half already in the ASP.NET MVC world using NHaml.  So it was a no brainer for me to choose it for this Rails 
project.  Not sure there is really much more I can say about it except you must try it.  :)  No, seriously, just do it.
Your hands will thank you!

* [http://haml-lang.com](http://haml-lang.com)
* [http://github.com/nex3/haml](http://github.com/nex3/haml)
* [irc://irc.freenode.net/#haml](irc://irc.freenode.net/#haml)

### Sass
The lovely sister to Haml, allowing you to create DRY stylesheets with the use of variables, mixins and all kinds 
of other goodness.  This is the first time I've used Sass on a real project and even though I'm not leveraging 
all of its capabilities yet, I love the simplicity of the language.  Hopefully I can dig in a bit more soon to 
further improve my stylesheets.

* [http://github.com/nex3/haml](http://github.com/nex3/haml)
* [irc://irc.freenode.net/#sass](irc://irc.freenode.net/#sass)

### Compass/Blueprint
Taking styles and page layout to a whole new level.  Compass is a really nifty "framework of frameworks" that sits 
on top of Sass and a handful of grid-based CSS frameworks such as Blueprint or 960.gs to name a couple.  I chose to 
go with the default of Blueprint and it's been pretty good so far.  The out of the box CSS resets, browser-specific 
fixes and typography make it really easy to get a decent looking site up and running fast.

* [http://compass-style.org](http://compass-style.org)
* [http://github.com/chriseppstein/compass](http://github.com/chriseppstein/compass)
* [http://www.blueprintcss.org](http://www.blueprintcss.org)
* [http://960.gs](http://960.gs)

### jQuery
The fact that Rails 3 still ships with Prototype out of the box still kinda boggles my mind.  Nevertheless 
with the increased modularity of Rails 3, it's really easy to swap out a lot of the parts of Rails with 
alternatives.  For example, you can pretty easily swap out Prototype for jQuery as the default javascript in 
Rails 3.

###### /app/views/layouts/application.html.haml
```ruby
= javascript_include_tag :defaults
```

###### /config/initializers/jquery.rb
```ruby
if ActionView::Helpers::AssetTagHelper.const_defined?(:JAVASCRIPT_DEFAULT_SOURCES)
  ActionView::Helpers::AssetTagHelper.send(:remove_const, "JAVASCRIPT_DEFAULT_SOURCES")
end
ActionView::Helpers::AssetTagHelper::JAVASCRIPT_DEFAULT_SOURCES = ['jquery-1.4.2.min.js', 'rails.js']
ActionView::Helpers::AssetTagHelper::reset_javascript_include_default
```

* [http://jquery.com](http://jquery.com)
* [http://github.com/jquery/jquery](http://github.com/jquery/jquery)

### MongoDB
After watching the rise of document-oriented databases for a while and some of my own learning/experimentation, 
I decided to make the move to MongoDB as my primary database platform.  I say "primary" because I'm a firm believer 
in choosing the right tool for the job.  So if there are some models that are, for instance, heavily relational 
or need strict transactions then MySQL might be a good fit for those particular pieces.  If I have a set of simple data, say, 
lookup data, perhaps throwing it in a wicked fast key/value store like Reddis might be better for that particular data. 
However, most of my models so far in this project are well suited for a schema-less document store given their 
hierarchical nature and need to be flexible with possible custom attributes.

MongoDB has been an absolute joy to use so far.  It just simple stores whatever you give without complaining.
Don't have a database named my_cool_app yet?  No problem, just attempt to write to a non-existent database and it'll create it for you. 
Don't have a collection named codemonkeys yet?  No problem, just send off a new collection to MongoDB and it'll 
create a new collection (aka table) for you.  No migrations, no fuss.  I hardly even notice the database is there sometimes.

* [http://www.mongodb.org](http://www.mongodb.org)
* [http://github.com/mongodb/mongo](http://github.com/mongodb/mongo)
* [irc://irc.freenode.net/#mongodb](irc://irc.freenode.net/#mongodb)

### Mongoid
There are quite a few mappers out there now for Ruby and MongoDB.  MongoMapper, MongoDoc, Mongoid, Candy and a bunch 
of others (sorry if I left your favorite one out).  At the time when I was starting my Rails 3 project Mongoid seemed 
to be the most "Rails 3 friendly" one since it supports the new ActiveModel abstraction and Rails Validations out of the box.  I 
believe some of the others are getting up to speed now as well, but I'm really liking Mongoid so far.  Each MongoDB mapper 
takes a slightly different approach.  Some try to mimic Active Record, while others just give you the bare bones for 
you to handle your persistence and querying any way you'd like.  Right now I like Mongoid because it seems to strike a 
pretty good balance.  You get some Active-Record like querying methods, but it also has a very powerful Criteria API. 
But like most OSS projects, Mongoid has its own opinions about how you should be persisting your objects.  Specifically, 
Mongoid leads you down the path of using embedded documents as much as possible, which is the ideal way to store documents 
in MongoDB.  Oh and did I mention that Mongoid heavily favors composition over inheritance, which is a big win for me. 
Another interesting tidbit is that Mongoid is the brainchild of Durran Jordan, of Hashrocket fame.  I continue 
to be amazed at the number of awesome OSS contributions that come out of the guys at Hashrocket.

* [http://mongoid.org](http://mongoid.org)
* [http://github.com/durran/mongoid](http://github.com/durran/mongoid)
* [http://vimeo.com/9864311](http://vimeo.com/9864311) (Great talk by @modetojoy on MongoDB/Mongoid)

### Devise
One of the first things I needed to tackle in this new Rails 3 project was authentication.  I knew there were a few 
good Ruby authentication frameworks out there.  Authlogic is the "big guy" in the room here.  But Devise is gaining 
quite a bit of traction and after I spiked with it for a bit, I really liked it.  It really takes advantage of Rails 3 
and is extremely flexible and extensible.  Devise is one of the few frameworks I've used that has managed to achieve 
a high degree of flexibility while maintaining its simplicity.  Then again, I'm starting to see that characteristic in 
a lot of Ruby-based frameworks.  Some of the things that Devise will do for you is database authentication, new user 
registration, confirmation, password recovery, "remember me" functionality, user login tracking, session timeouts, 
validations and account lockout to name a few.  There also a growing number of plugins for Devise for things like 
Facebook, LDAP and OpenID authentication.

* [http://blog.plataformatec.com.br/tag/devise](http://blog.plataformatec.com.br/tag/devise)
* [http://github.com/plataformatec/devise](http://github.com/plataformatec/devise)

### CanCan
Of course authorization usually goes hand in hand with authentication.  Don't get them confused!  There are quite a 
few players solving this problem as well.  Declarative Authorization was the first one I looked at and, while it looked 
great, I didn't need quite that many features yet.  I found a simpler solution called CanCan by none other than Ryan 
Bates of [RailsCasts](http://railscasts.com) fame.  CanCan is very easy to sit on top of Devise and all authorization rules are set up in single 
model class you define named Ability.  CanCan makes no assumptions about how you want to handle authorization.  Whether 
it's role-based or custom or both, it's pretty easy to write a few simple rules to get things going.  Also very easy to 
check your authorization rules in your controllers and views with simple methods like can? and cannot?.

* [http://github.com/ryanb/cancan](http://github.com/ryanb/cancan)

## To Be Continued...
That's enough for this post I think.  In Part 2, I'll talk about the deployment and testing tools I'm currently using.

