---
layout: post
title: "Rails 3.1, Asset Pipeline, Sass Syntax & Heroku"
date: 2011-10-01 23:12
---

I'm starting to build out my first Rails application on Heroku (cedar stack), ever.  Yes, I know, I'm really late to 
the party.  But I just ran across something that might be causing folks trouble if they're attempting
to deploy a Rails 3.1 application to Heroku and prefer the `sass` syntax over the default `scss`.

(First off I want to say thanks to Benjamin Atkin for giving me the idea for this fix in 
[this blog post about Compass and Heroku](http://benatkin.com/2011/09/28/adding-compass-to-a-heroku-app).)

As much grief as I get over it, I am still an old school Sass guy and still
prefer the `sass` syntax instead of the default `scss` that is shipped with
Rails 3.1.  Thankfully, this is quite easy to change in the Rails configuration as show here.

```ruby
# Prefer SASS, 'cause that's what real men use :)
config.sass.preferred_syntax = :sass
```

However, when you try to deploy this Heroku, the server fails to start.  This can be discovered by running
`heroku logs`.

```
/app/vendor/bundle/ruby/1.9.1/gems/railties-3.1.0/lib/rails/railtie/configuration.rb:78:in 
`method_missing': undefined method `sass' for #<Rails::Application::Configuration:0x000000016152c8> 
(NoMethodError)
```

As pointed out in [Benjamin's post](http://benatkin.com/2011/09/28/adding-compass-to-a-heroku-app), this is because

<blockquote cite="http://benatkin.com/2011/09/28/adding-compass-to-a-heroku-app" class="italic mb-6">
...Heroku only runs with the asset gems from the Gemfile when it compiles the assets, and it only compiles the assets when a new slug is loaded.
<footer>Benjamin Atkin</footer>
</blockquote>

So I took his idea and created a Sass initializer to handle the setting of this for me, only when
a Sass configuration object is available.

```ruby
if Rails.configuration.respond_to?(:sass)
  Rails.configuration.sass.tap do |config|
    # Prefer SASS, 'cause that's what real men use :)
    config.preferred_syntax = :sass
  end
end
```

## UPDATE 10/02/2011
**Just found out that the initializer above won't actually get run when you run `rails generate`, which
kind of defeats the purpose.  So this code must be run from `application.rb`, either included directly 
or required.**

By doing this, it allows the Heroku `cedar` stack to properly precompile the assets and successfully
start the Rails server.

One other way to "fix" this issue is to move the `sass-rails` gem into the global group in your `Gemfile`.
But I think I prefer the solution above so I don't have to pollute the global gem group with an unnecessary
gem just to satisfy Heroku deployment.

Happy coding!
