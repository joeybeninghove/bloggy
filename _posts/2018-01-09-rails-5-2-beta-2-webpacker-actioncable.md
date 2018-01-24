---
layout: post
title: Rails 5.2 Beta 2 + Webpacker + ActionCable
date: 2018-01-09 11:14 -0500
tag:
- ruby
- rails
category: blog
author: joeybeninghove
description: Fixing an issue with ActionCable while using Webpacker with Rails 5.2 Beta 2
---

_This is mainly for myself so that I can remember what the heck I did to get this working in case I need it for the future._

When messing around with Rails 5.2 Beta 2, I was trying to school myself on [Webpacker](https://github.com/rails/webpacker) and moving away from Sprockets entirely.  Once of the things I noticed when doing this is that some javascript errors started showing up related to the Content Security Policy.  This is talked about in a couple issues, [one in the Rails repo](https://github.com/rails/rails/issues/31309) and [another in the Webpacker repo](https://github.com/rails/webpacker/issues/1057).

    Refused to connect to 'http://localhost:3035/sockjs-node/info?t=1515515117689' because it violates the following Content Security Policy directive: "default-src 'self' https:". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.

![javascript errors](http://link.joey.io/RhjGEk+)

The thing to do to fix this is to update `config/initializers/content_security_policy.rb` and add a `connect_src` configuration like so:

```ruby
p.connect_src :self, :https, "http://localhost:3035", "ws://localhost:3035"
```

This seems to configure the content security policy to allow the ActionCable to still work while using Webpacker.  NOTE: This probably won't fix it in your automated tests.  There is a [note about this in one of the issue comments](https://github.com/rails/rails/issues/31309#issuecomment-352849112), but I have not tested this out myself.
