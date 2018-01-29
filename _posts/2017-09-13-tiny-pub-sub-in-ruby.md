---
layout: post
title: Tiny Pub/Sub In Ruby
date: 2017-09-13 00:00
tag:
- ruby
category: blog
author: joeybeninghove
description: A cool and tiny pub/sub implementation in Ruby
---

I recently had a need to do a very simple in-memory notification mechanism in Ruby and came up with a tiny little class which seems to do exactly what I needed.  It's not nearly as fancy or comprehensive as something like [Wisper](https://github.com/krisleech/wisper), but you can't beat the footprint of it.

## A Simple Notifier
```ruby
class Notifier
  attr_reader :events

  def initialize
    @events = {}
  end

  def subscribe(event, &handler)
    @events[event] ||= []
    @events[event] << handler
  end

  def broadcast(event, data=nil)
    return if @events[event].nil?

    @events[event].each do |handler|
      handler.call(data)
    end
  end
end
```

## Usage
So the usage is very straight forward as you might expect.

```ruby
notifier = Notifier.new

# something that needs to be notified when a task is completed
notifier.subscribe("clone:succeeded") { |data| puts data }

# the thing doing the task
notifier.broadcast("clone:succeeded", "http://somesite.com")

# => http://somesite.com
```

## Specs (you do write specs, don't you?) :smile:
```ruby
describe Notifier do
  describe "#subscribe" do
    it "adds the given handler to the specified event" do
      notifier = Notifier.new
      block = lambda {}

      notifier.subscribe("foo", &block)

      expect(notifier.events["foo"]).to include block
    end

    context "when called twice for the same event" do
      it "adds the second handler to the same event" do
        notifier = Notifier.new
        block1 = lambda {}
        block2 = lambda {}

        notifier.subscribe("foo", &block1)
        notifier.subscribe("foo", &block2)

        expect(notifier.events["foo"]).to include block1
        expect(notifier.events["foo"]).to include block2
      end
    end
  end

  describe "#broadcast" do
    it "calls the handlers for the given event" do
      notifier = Notifier.new
      block = lambda { |data| puts data }
      notifier.subscribe("foo", &block)

      expect(block).to receive(:call).with("bar")

      notifier.broadcast("foo", "bar")
    end

    it "does NOT call handlers for other events" do
      notifier = Notifier.new
      block1 = lambda { |data| puts data }
      block2 = lambda { |data| puts data }
      notifier.subscribe("foo1", &block1)
      notifier.subscribe("foo2", &block1)

      expect(block1).to receive(:call).with("bar")
      expect(block2).not_to receive(:call).with("bar")

      notifier.broadcast("foo1", "bar")
    end
  end
end
```

## Singleton Version
I played around with a singleton version of this too, in cases where you didn't want to pass around the instance of the `Notifier` class.  Thankfully, Ruby gives us a [Singleton](http://ruby-doc.org/stdlib-2.4.1/libdoc/singleton/rdoc/Singleton.html) module we can easily include to make this happen.

```ruby
require "singleton"

class Notifier
  include Singleton

  # ...
end
```

Then you just have to replace `new` with `instance` and you're good to go.

```ruby
notifier = Notifier.instance

# something that needs to be notified when a task is completed
notifier.subscribe("clone:succeeded") { |data| puts data }

# the thing doing the task
notifier.broadcast("clone:succeeded", "http://somesite.com")

# => http://somesite.com
```
