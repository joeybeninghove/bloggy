---
layout: post
title: Vlad, RVM and Bundler sittin' in a tree
date: 2010/09/17 2:21:00
tags: [ruby, sinatra, deployment, vlad, rvm]
canonical_url: //www.lostechies.com/blogs/joeydotnet/archive/2010/09/17/vlad-rvm-and-bundler-sittin-in-a-tree.aspx
---

(Thanks to Chad for nudging me to write this post :)

Up until now, my only experience with deploying Rails or any other Ruby-based web application
has been to use the "standard" [Capistrano](http://www.capify.org/index.php/Capistrano).  For 
the main Rails 3 application I've been building the past few months, Capistrano has been fine 
and was mostly a set it and forget it kinda thing.

One of my clients asked me to do a small side project to perform a simple task and naturally I chose 
the most excellent [Sinatra](http://www.sinatrarb.com/) framework.  I could go on and on about the awesomeness of Sinatra, but that's
not the point of this post.  Suffice it to say when I finished this small Sinatra application, I needed to 
deploy it somehow.  Manual deployments are for the birds, so my first knee-jerk reaction was to get
Capistrano wired up to do the automated deployment.  But after taking a glance at my existing Capistrano
deployment script for my Rails 3 application, it seemed like overkill for this tiny Sinatra ditty.

<img src='/assets/vlad.png' alt='Vlad the Deployer' style='float: right; margin: 10px' />

The first alternative I ran across was a deployment tool named [Vlad the Deployer](http://rubyhitsquad.com/Vlad_the_Deployer.html) 
(which clearly gets an award for the best name ever).  What attracted me right off the bat was the simplicity of its usage
and configuration.  I also liked the fact that it uses pure Rake for everything, instead of some of the 
"magic" that Capristrano does under the hood.  

Getting Vlad up and running is pretty straightforward, but I did have a couple issues getting it integrated 
into my particular deployment process.  Like all good Ruby developers 2 of my must use tools are 
[RVM](http://rvm.beginrescueend.com) & [Bundler](http://gembundler.com).  Bundler is great for managing 
gem dependencies and RVM keeps you sane when working with many different versions of Ruby and gems at 
the same time.  

One thing I like to do during deployments is make sure "bundle install" gets run on the server.  
This ensures that any new gems I've introduced in my Gemfile get automatically installed on the server 
during deployment.  Usually this wouldn't be much of an issue, but I'm a pretty big fan of RVM, so much 
so that I actually run it on my staging/production servers as well.  RVM does some *serious* magic under 
the hood, including altering various environment variables affecting the path.  Here is the series of 
steps I had to take to get Vlad to properly run "bundle install" during deployment.  (NOTE: I'm mainly 
posting this to hopefully get feedback on a better way.  I really don't like my solution too much.)

## Minor server preparation
Before I show the deploy script itself, you do need to make sure your server is set up properly with
RVM and Bundler installed in the global gemset.  Here are 2 great articles that describe this process:

* [Thoughts in Computation - Using Phusion Passenger and Apache2 on Ubuntu with RVM and Gemsets ](http://www.thoughtsincomputation.com/posts/using-phusion-passenger-and-apache2-on-ubuntu-with-rvm-and-gemsets)
* [RVM and project-specific gemsets in Rails](http://everydayrails.com/2010/09/13/rvm-project-gemsets.html)

## Extend Vlad's update Rake task
Since Vlad uses simple Rake tasks for everything, it's easy to "tack on" steps before or after the 
built in Vlad tasks.  In this case I wanted to run my Bundler command right after the built in update
process was complete.  Here's one easy way to do that:

```ruby
namespace :vlad do
  task :update do
    # do stuff here that gets run after update is complete
  end
end
```

FYI, if you want to run something *before* the update process starts, you can simply add a dependency
to the built in update task like so:

```ruby
namespace :vlad do
  task :update => :some_other_task
end
```

## Create a Bundler task
Next I created a separate task (see next section about remote_task) to perform the Bundler command I 
needed to run on the server and invoked it inside of Vlad's built in update task:

```ruby
namespace :vlad do
  remote_task :bundle do
    # do bundler stuff here
  end

  task :update do
    Rake::Task['vlad:bundle'].invoke
  end
end
```

## Remotely running commands via SSH
Before I show the commands necessary, it's important to understand that all of this will be run in
the context of an SSH session.  Thankfully, there was a nice feature of Vlad that was extracted out
into its own gem known as [remote_task](http://github.com/seattlerb/rake-remote_task).  
This is a handy way to run Rake tasks in the context of remote
servers and is used heavily under the hood with Vlad.  We're also using it here for our custom Bundler
task and a "run" method can be called with whatever commands you want to be run on the remote server in 
an SSH session.

## Step by step
For clarity I put each command into its own local variable, each of which I'll describe below.

### Initialize RVM
When you login to a server via SSH, you have set of environment variables which include how paths
are resolved when running commands.  Luckily, RVM takes care of all of that for us.  Usually when using
RVM you simply [load it via your .bashrc](http://rvm.beginrescueend.com/rvm/install), but for some reason I couldn't get this working in the 
context of the SSH session used as part of the remote_task.  I'm sure this is due to my lack of bash and
*nix skills which I'm actively trying to beef up.  But to work around it for now, I just manually source
the RVM bootstrap script myself:

```ruby
init_rvm = "source ~/.rvm/scripts/rvm"
```

### Trust your RVM gemset
I'm not going to dive into [RVM gemsets](http://rvm.beginrescueend.com/gemsets/basics) as part of this post, but just think of it as a way to manage gems
in isolation from other applications and environments.  I like to use project-specific gemsets for everything
I do to keep things nice and clean.  A nice companion to gemsets is the use of an [.rvmrc file](http://rvm.beginrescueend.com/workflow/rvmrc) to 
automatically switch to the correct gemset when navigating to your application's directory.  Creating a 
.rvmrc is stupidly simple:

```
rvm ree@ema
```

Starting in [version 1.0 of RVM](http://wayneeseguin.beginrescueend.com/2010/08/22/ruby-environment-version-manager-rvm-1-0-0), 
there was a security measure put in place to force you to "trust" .rvmrc
files when changing into a directory with a .rvmrc for the first time.  Normally this is fine, but it 
presented an issue in the context of an automated script.  This security measure can be disabled by this 
next command:

```ruby
trust_rvm = "rvm rvmrc trust #{release_path}"
```

This tells RVM that I explicity trust the .rvmrc located in my release_path which is the root of my 
application on the server.

### Run bundle install - take 1
With RVM all loaded up, we can now issue our bundle command to install any new dependencies if necessary.
So naturally I tried the command below:

```ruby
goto_app_root = "cd #{release_path}"
bundle_install = "bundle install --without test"
```

But this blew up in my face with a nasty exception:

```
/home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:198:in `cached_specs': undefined method `spec' for nil:NilClass (NoMethodError)
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:196:in `each'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:196:in `cached_specs'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:195:in `each'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:195:in `cached_specs'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:157:in `fetch_specs'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/index.rb:7:in `build'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:155:in `fetch_specs'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/source.rb:70:in `specs'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/definition.rb:161:in `index'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/definition.rb:160:in `each'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/definition.rb:160:in `index'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/index.rb:7:in `build'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/definition.rb:159:in `index'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/definition.rb:153:in `resolve'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/definition.rb:93:in `specs'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/definition.rb:88:in `resolve_remotely!'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/installer.rb:35:in `run'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/installer.rb:8:in `install'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/cli.rb:217:in `install'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/vendor/thor/task.rb:22:in `send'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/vendor/thor/task.rb:22:in `run'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/vendor/thor/invocation.rb:118:in `invoke_task'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/vendor/thor.rb:246:in `dispatch'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/lib/bundler/vendor/thor/base.rb:389:in `start'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/gems/bundler-1.0.0/bin/bundle:13
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/bin/bundle:19:in `load'
  from /home/joey/.rvm/gems/ree-1.8.7-2010.02@ema/bin/bundle:19
```

### Run bundle install - take 2
I had read somewhere previously (sorry, can't remember exactly where) about sometimes needing to 
explicitly specify the target path for the "bundle install" command.  In this case I can just use
the $BUNDLE_PATH environment variable that RVM manages for me:

```ruby
bundle_install = "bundle install $BUNDLE_PATH --without test"
```

This seems to fix the exception above, but I'll be honest, I'm not exactly sure why yet.  (And yes, 
that does bug the heck out of me)

## Putting it all together
Now that we have all of our commands ready to go, we can simply call the built in "run" method
and pass in each command concatenated one after another:

```ruby
namespace :vlad do
  remote_task :bundle do
    # loads RVM, which initializes environment and paths
    init_rvm = "source ~/.rvm/scripts/rvm"

    # automatically trust the gemset in the .rvmrc file
    trust_rvm = "rvm rvmrc trust #{release_path}"

    # ya know, get to where we need to go
    # ex. /var/www/my_app/releases/12345
    goto_app_root = "cd #{release_path}"

    # run bundle install with explicit path and without test dependencies
    bundle_install = "bundle install $BUNDLE_PATH --without test"

    # actually run all of the commands via ssh on the server
    run "#{init_rvm} &amp;&amp; #{trust_rvm} &amp;&amp; #{goto_app_root} &amp;&amp; #{bundle_install}"
  end

  task :update do
    Rake::Task['vlad:bundle'].invoke
  end
end
```

If all is well, you should see a nice green message from Bundler saying your bundle is complete.

As I mentioned before I'm not all that happy with this solution, as it seems like there is probably
a better way to get Vlad, RVM and Bundler all working nicely together.  I'd be really interested
to know of a better way.

Anyways, I hope this post benefits somebody in the future.  Even if it's myself a year from now.  :)
