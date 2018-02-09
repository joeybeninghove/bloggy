---
layout: post
title: "Grape APIs - Few Quick Tidbits"
date: 2012-01-21 22:46
categories: [ruby, grape, api, rest]
---

It's been pretty quiet here for a long time, but I've been busy building a few businesses, one of which includes a new
product I'm helping to build and launch with a couple friends.  One of the things I've been building is a robust REST
API using [Grape](https://github.com/intridea/grape).  If you want a quick overview, check out their README on the GitHub repo.  I've really enjoyed using Grape and figured I'd share a few little tidbits of how I'm using it so far.  

## Configuring URL prefix

For a long time I was just using Rails 3 to "mount" my Grape API class like this:

###### routes.rb
```ruby
mount MyApp::API => '/api'
```

This worked well for a while, but then I had a need to plug in some Rack middleware (such as Rack::Cors, which I plan to
blog about soon).  Long story short, I couldn't mount it the same way anymore, but still needed to configure the base
URL for the API to point to `/api`.  Grape makes this really easy.

###### my_app_api.rb
```ruby
module MyApp
  class API < Grape::API
    prefix 'api'
  end
end
```

Quick side note, I do still mount the API in the Rails routes for the `test` environment only for my automated API
integration tests.  But since I already have the prefix defined in the API, I just mount it to root for these purposes.

###### routes.rb
```ruby
if Rails.env == 'test'
  mount MyApp::API => '/'
end
```

## Delegate to the Rails logger (if desired)

###### my_app_api.rb
```ruby
logger Rails.logger
```

Simple.

## Request logging, including body

###### my_app_api.rb
```ruby
before do
  # Of course this makes the request.body unavailable afterwards.
  # You can just use a helper method to store it away for later if needed. 
  Rails.logger.info "Request Body: #{request.body.read}"
end
```

Easy peasy.

## Global exception handling

###### my_app_api.rb
```ruby
rescue_from :all do |e|
  # Log it
  Rails.logger.error "#{e.message}\n\n#{e.backtrace.join("\n")}"

  # Notify external service of the error
  Airbrake.notify(e)

  # Send error and backtrace down to the client in the response body (only for internal/testing purposes of course)
  Rack::Response.new({ message: e.message, backtrace: e.backtrace }, 500, { 'Content-type' => 'application/json' }).finish
end
```

Handy.

## HTTP Basic Authentication

###### my_app_api.rb
```ruby
http_basic do |username, password|
  User.authenticate!(username, password)
end
```

No sweat.

## Helper methods

###### my_app_api.rb
```ruby
helpers do
  def current_context
    @context = # some call to retrieve context based on API key maybe?
  end

  # anything else needed by a group of or all resource/verb blocks
end
```

Straightforward.

## Sending back errors with validation messages

###### my_app_api.rb
```ruby
resource :turtles
  post do
    # make sure you filter/whilelist the request body attributes!
    turtle = Turtle.create(JSON.parse(request.body.read))
    error!(turtle.errors.messages, 400) unless turtle.valid?
  end
end
```

Smooth sailing.

## General API building tips

I can't recommend enough the article that [John Nunemaker](http://railstips.org) wrote recently on [Creating an API](http://railstips.org/blog/archives/2011/12/01/creating-an-api).  A great read with
some great tips.

That's all for now.  Happy coding!  :)
