---
layout: post
title: Doubling speed of specs with Spork
date: 2011/08/10 12:00:00
tags: [mongoid, spork, performance, inheritance, preloading, rspec, mongodb]
---

<img src='/assets/speed.jpg' alt='Speed!!!' class='bordered-image' />

## Background

Ok, so this is going to require a bit of background explanation.  In one of my current Rails apps, we are using [Mongoid](http://mongoid.org).  We are also using quite a bit of inheritance in our Mongoid models.  Whether or not that's a good thing is a topic for another blog post.  :)  Well in the current version of Mongoid, if you use inheritance, you have to preload all of your Mongoid models on application startup so that it can properly perform queries and persistence.  I've benchmarked the preloading process and in this app, it takes about 4 seconds.  [Durran commented the other day](https://twitter.com/modetojoy/status/100973092263821312) saying that this should improve once Rails 3.1 becomes official.  Regardless, the Mongoid preloading was actually not the worst of our speed problems.

## Baseline benchmark
One of the things that's been bugging me is how long it takes to run a simple spec in this app, mainly the "setup" process to load the Rails environment, etc.  Let's take a look at how bad this was for us.  First, here is how our spec_helper looked:

```ruby
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

RSpec.configure do |config|
  config.mock_with :rspec

  # some data seeding here
end
```

And here is the result of running one simple spec, which doesn't even do anything:

```
✝ time rspec spec/foo_spec.rb

Pending:
  foo should do something
    # Not Yet Implemented
    # ./spec/foo_spec.rb:4

Finished in 1.7 seconds
1 example, 0 failures, 1 pending

real  0m18.958s
user  0m16.360s
sys 0m1.882s
```

**18 seconds!!!**  Absolutely ridiculous amount of time to simply perform the setup process for running a spec.  Let's see if we can improve this a bit.

## Enter Spork, attempt #1
I kept hearing about folks using [Spork](https://github.com/timcharper/spork) to speed up their Rails environment loading, which includes speeding up spec runs.  So after getting Spork installed, here is what my spec_helper looked like:

```ruby
require 'spork'

Spork.prefork do
  ENV["RAILS_ENV"] ||= 'test'
  
  # this loads the environment and all initializers, which includes our mongoid
  # preloading, so this is not a good idea since we'd have to restart spork
  # every time we changed our model code.
  require File.expand_path('../../config/environment', __FILE__)
  
  Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}
end

Spork.each_run do
  RSpec.configure do |config|
    config.mock_with :rspec

    # some data seeding here...
  end
end
```

This would normally work great, but since we have to preload our Mongoid models on application startup (due to inheritance), this would mean that any time we made changes to our Mongoid models, we'd have to restart Spork.  That of course kind of defeats the purpose of using Spork in the first place.  So I did a bit more digging into the Rails boot process to see how I could make this work, because I really wanted to leverage Spork for at least **some** of our Rails environment loading.

## Brief lesson in what environment.rb actually does
Opening up **environment.rb** revealed that it is actually doing 2 things in separate steps:

1. requiring the **application.rb** file
2. calling initialize on the Application class contained in **application.rb**

```ruby
# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
# This is also when the Mongoid models get preloaded
MyApp::Application.initialize!
```

That was a nice little hint that got me thinking about a possible solution.  But first...

## Understanding when gems get loaded by Bundler
After a bit more benchmarking, I noticed that the actual require of gems by Bundler was taking 8-9 seconds.  That is done in inside of application.rb shown here:

```ruby
require File.expand_path('../boot', __FILE__)

# various requires here...

Bundler.require(:default, Rails.env) if defined?(Bundler)

module MyApp
  class Application < Rails::Application
    # usual app init stuff here...
  end
end
```

But notice one very important piece of information here.  The Bundler.require call is made **outside** of the Application class.  That means that as soon as this file is required, then the Bundler.require call is getting made.  Looking back at the first thing that our **environment.rb** does, that means the first step ends up requiring all gems using Bundler.  The very thing that was taking the most time.  This is also one of those things we can definitely add to our prefork block for Spork, because those aren't likely to change very much during day to day development.

## Spork, attempt #2
Armed with a bit more knowledge on the Rails environment loading process and which parts are actually taking the most time, let's change our **spec_helper** a bit.

```ruby
require 'spork'

Spork.prefork do
  ENV["RAILS_ENV"] ||= 'test'
  
  # notice i'm NOT loading the full environment.rb here, only application.rb
  require File.expand_path('../../config/application', __FILE__)
  
  Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}
end

Spork.each_run do
  # this is the important part, still calling initialize on each run
  # because this is when the mongoid models get preloaded
  MyApp::Application.initialize!

  RSpec.configure do |config|
    config.mock_with :rspec

    # some data seeding here...
  end
end
```

Notice now that we're not requiring **environment.rb** anymore in our prefork block, but instead requiring **application.rb** directly.  This ensures that all gems get loaded only once, when starting up Spork for the first time.  This immediately shaves off 8-9 seconds off of the time it takes to run our specs in this case.

Also important to note is down in the each_run block for Spork, I've added the MyApp::Application.initialize! call because that's when our Mongoid models get preloaded.  This ensures that we're able to change our model code and have it automatically reflected in our next test run.

After starting up Spork, let's see how long our spec takes to run now:

```
✝ time rspec --drb spec/foo_spec.rb

Pending:
  foo should do something
    # Not Yet Implemented
    # ./spec/foo_spec.rb:4

Finished in 1.81 seconds
1 example, 0 failures, 1 pending

real  0m8.914s
user  0m0.214s
sys 0m0.080s
```

**8 seconds!!!**  For most folks this would be pitiful, but moving down from 18 seconds down to 8 seconds, I'd say that's a pretty big improvement.  Hoping to continue improving the speed of our specs, but I thought this was a great start.  Hopefully this will help some folks who are struggling using Spork and Mongoid together in the same application.

*(image by [vivekchugh](http://www.sxc.hu/profile/vivekchugh))*
