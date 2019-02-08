---
layout: post
title: "Quick Fix (and a question): Mongoid Edge"
date: 2010/06/10 12:44:00
tags: [ruby, mongodb, mongoid, rspec]
canonical_url: //www.lostechies.com/blogs/joeydotnet/archive/2010/06/10/quick-fix-and-a-question-mongoid-edge.aspx
---

I just went throught the process of upgrading my current app to the latest edge for Rails 3, Mongoid 
and all of my other gems. And when I went to run my specs, I received this error:

```
Database command 'drop' failed: {"ns"=>"your_db.system.indexes", "errmsg"=>"assertion: can't drop system ns", "ok"=>0.0}
```

The only time a drop is called is in my **spec_helper.rb** file:

###### /spec/spec_helper.rb
```ruby
Rspec.configure do |config|  
  # other config stuff here  
  
  config.before(:each) do  
    Mongoid.master.collections.each(&amp;:drop)  
  end  
end  
```

What that block does is drop all of my Mongoid collections before each spec is run to ensure I have a 
"known state" for my specs. This has always worked just fine as is, but it appears that something has 
changed in the latest Mongoid causing it to error on attempting to drop "system.indexes". After some 
tinkering, this is how I resolved it:

###### /spec/spec_helper.rb
```ruby
Rspec.configure do |config|  
  # other config stuff here  
  
  config.before(:each) do  
    Mongoid.master.collections.select { |c| c.name != 'system.indexes' }.each(&amp;:drop)  
  end  
end  
```

Simple fix, but it gets the job done. I just simply exclude "system.indexes" from the collections to 
drop and all is well. Since this is only for my tests, I think this should be fine. But...

I want to know if anyone else knows why this is happening and if there is a better way to resolve it. 
Anyone?
