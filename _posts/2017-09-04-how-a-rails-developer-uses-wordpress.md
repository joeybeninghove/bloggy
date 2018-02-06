---
layout: post
title: How A Rails Developer Uses WordPress
description: Using Rails to quickly generate one-off markup for a WordPress site
date: 2017-09-04 00:00
---

I've recently been helping out some family and friends with rebuilding their
websites and, for the sake of consistency, I chose to use WordPress for them.
Here's what happens when a Rails developer encounters a markup problem with a
WordPress site.

I decided to use [Genesis themes](https://www.studiopress.com) for these sites as per a recommendation from [my good buddy Lee](https://leehblue.com), since they seem to be more "developer" focused without all of the drag and drop visual builder nonsense that is so popular these days.

## The Task At Hand
In building a website for my mom's real estate business, I needed to display headshots of about 50 real estate agents along with their contact information.  Also, there will be more agents added on a somewhat regular basis.

While there are a million gallery plugins for WordPress, both free and paid, the ones I tried just seemed way overkill for what I needed and the markup generated tended to be pretty nasty.  The [Genesis Framework](https://my.studiopress.com/themes/genesis) already has a pretty nice grid system baked into its styles, so I knew what I wanted write in the markup, I just didn't want to have to do it manually 50 times, now or in the future.

I basically just wanted this markup:

``` html
<div class="row">
  <div class="agent one-fourth first">
    [caption width="150"]
    <span class="agent-photo">
      <img src="/wp-content/uploads/2017/08/john-doe.jpg"
        width="150" height="150" class="size-thumbnail" />
    </span>
    <div class="agent-name">John Doe</div>
    <div class="agent-phone">(111) 222-3333</div>
    <a class="agent-email" href="mailto:john@doe.com">Email Me</a>
    [/caption]
  </div>

  <div class="agent one-fourth">
    ...
  </div>
</div>
```

_The `[caption]` part is a shortcode used in WordPress used to style the caption information below the image._

The other thing I was given was a typical spreadsheet with the name, phone number and email addresses for all of the agents.

## The Options
So at this point I basically had 2 options:
1. Write some PHP code in WordPress to build a shortcode to do this all in PHP/WordPress
    * This doesn't sound fun at all, but it probably would be a more "permanent" solution
2. Whip up a quick Rails app to generate the markup I need in a repeatable fashion
    * This sounds much more fun inducing and would probably be a quicker win for now

Now, while I actually am pretty proficient with PHP coding in general, I'm a bit less experienced with doing it in the context of WordPress.  So I decided to spin up a quick Rails app to tackle this for now.  <span class="evidence">One of the things I love about Rails is that I've found it to be a great tool both for [building massive e-commerce platforms](https://cart66.com/?utm_source=joey&utm_medium=blog) and for just spinning up little hack solutions like this quickly.</span> So, `rails new my-quick-hack` to the rescue.

## The Solution
After exporting the spreadsheet into a CSV file, it was easy to load up in a Rails controller.

### home_controller.rb
``` ruby
require "csv"

class HomeController < ApplicationController
  layout false

  def index
    @csv = CSV.parse(File.read("#{Rails.root}/config/agents.csv"))    
  end
end
```

Yes, the view code below is quite nasty, no doubt about that.  But for my purposes right now, it worked great and is really all I needed.  Of course I could do some major refactoring on it from a TDD standpoint, break out some models to abstract away the CSV parsing, etc.

### But, you know...
<iframe src="https://giphy.com/embed/bWM2eWYfN3r20" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

### home/index.html.erb
``` erb
<% @csv.in_groups_of(4) do |group| %>
  <div class="row">
    <% group.each_with_index do |row, index| %>
      <% next if row.nil? %>
      <% id = [row[0], row[1]].join(" ").parameterize %>
      <div class="one-fourth <%= 'first' if index == 0 %>">
        [caption width="150"]
        <img src="/wp-content/uploads/<%= id %>-150x150.jpg"
          width="150" height="150" class="size-thumbnail" />
        <div class="agent-name"><%= row[1] %> <%= row[0] %></div>
        <div class="agent-phone"><%= row[2] %></div>
        <a class="agent-email" href="mailto:<%= row[3] %>">Email Me</a>
        [/caption]
      </div>
    <% end %>
    <div class="clearfix"></div>
  </div>
<% end %>
```

That's it.  Just `rails s`, pop open the browser to `localhost:3000`, copy the markup and paste it into the WordPress page I created for the team page.

<img src="/assets/agents-grid-screenshot.jpg" class="bordered-image">

The end result

## Happiness
Well, at least as much as you can get while still using WordPress.  I'm sure
I'm going to get folks balking at solutions like this, but honestly, until I
need something more involved, this is going to be just fine.
