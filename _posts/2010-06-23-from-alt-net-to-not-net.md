---
layout: post
title: From ALT.NET to NOT.NET
date: 2010/06/23 12:44:00
tags: [ruby, rails, microprenuer, community]
canonical_url: //www.lostechies.com/blogs/joeydotnet/archive/2010/06/23/from-alt-net-to-not-net.aspx
---

For a long time now I've been known as "joeyDotNet". Of course I'll never make the mistake tying my 
name to a particular technology like that again. Especially given some of the recent changes I've 
made in my career. For the past 10 years I've been primarily a web developer using Microsoft-based 
technologies. In the latter years I started to grow pretty frustrated with both the Microsoft 
development stacks as well as their operating systems. The ALT.NET "movement" helped a little, but 
for me, the bloat of the development tools and ceremony required in the languages overshadowed the 
well-intentioned ALT.NET efforts. Of course this is merely my own personal opinion.

A couple months ago I made a pretty big change by leaving .NET completely to start focusing on learning 
and building software using tools and frameworks that I enjoy and involve less friction. But instead of 
hearing me whine about my specific issues with .NET development, I thought maybe I would give a glimpse 
into my experience so far as I've become part of the NOT.NET crowd.

Perhaps I'm a glutton for punishment, but I find that in order to really learn something, I have to throw 
myself into the lake and basically sink or swim. That's pretty much what I've done by leaving .NET into 
the world of Ruby. Today marks exactly 2 months that I've been working exclusively with Ruby/Rails and 
I have to say it has been a very enjoyable experience so far (and frustrating at a few times). I've 
dabbled with the Ruby language and with Rails a bit over the past couple years, so I had an idea of what 
I was getting into. Doing it 100% day in/out is a completely different story though. But at this point, 
I'm not looking back a bit.

## Good

### Operating systems are cool again

One of things I've very much enjoyed is being able to completely ditch Windows as an operating system in 
favor of using my MacBook Pro with OSX for everything. It's no secret that I'm a pretty big Apple fan, 
and I think, for good reason. The simplicity of the OS and the top notch software that is available for 
OSX makes the actual usage of the various design and development tools fun and productive again.

### Simple tools, less friction

Since I'm a huge fan of Vim, I'm naturally using MacVim as my main editor, along with a few Terminal 
windows and a browser. That's it. No fancy IDEs or designers to get in my way. Just code. I am using 
a couple Vim plugins to allow better navigation around the code. [NERDTree](http://www.vim.org/scripts/script.php?script_id=1658) 
and [Command-T](http://www.vim.org/scripts/script.php?script_id=3025) which I would highly recommend. 
I've also jumped head first into Git as my primary source control and I continue to be very happy with 
that decision. All those years wasted on Subversion, which incidentally performs subversive acts on 
the instituion of actually getting things done!

### Doing more with less

One of the common themes I've found so far in working with Ruby in general and Rails in particular is 
how much work you can actually get done with so little code/effort. In 2 months time I've been able to 
build a fairly sizable greenfield Rails app from the ground up and almost ready for the first production 
deployment next week. All while I do a TON of learning in the process. I have no clue how long this 
would've taken me in .NET, but I'm certain it would have been significantly longer. Once you don't have 
to deal with IDEs, solutions, project files, unnecessarily complex build scripts, high-ceremony 
languages or even compilation, you really start to realize how much overhead all of that stuff adds, 
preventing you from getting real work done, fast!

### Buh-bye IoC containers

In my experience with C# over the years, it became apparent to me that in order to be productive in 
building flexible software in .NET that the use of an IoC container to handle dependency resolution 
was pretty much required. And I totally bought into it, using them heavily for many years. And for 
the most part, I think it was a good idea. However I will freely admit that a lot of my usage of them 
was to enable mocking and easier testing. I think if a lot of developers were honest about it, they'd 
say the same thing. That's not to say that's the only reason of course. IoC has its place in doing some 
crazy stuff with decorators/proxies and all kinds of other useful jazz. Contrast that with Ruby and I 
can honestly say I have not missed IoC containers one bit. Being able to work in a much more open 
language has been a joy. Composition over Inheritance is the real deal in Ruby and it's being demonstrated 
more and more in frameworks like Rails 3 and Mongoid. Being able to open up and extend any class in 
Ruby is also extremely powerful (and dangerous!).

### Feeling the love

Perhaps one of the more feel-good things about working with open technologies like Ruby is the community. 
I honestly have never experienced a community who is more willing to help out with anything like I've 
seen in the Ruby community so far. I've made a great many friends so far and hope that I can start 
contributing back to the community once I get my head above water. Open source in the .NET world has 
grown a bit over the years, but it still seems light years away from the Ruby and related communities. 
And I'm not sure why, but I can't help but think it has something to do with a certain corporate 
entity behind .NET.

### Making dreams come true

For quite a few years now I've had an increasing urge to go "out on my own" and be "independent". 
More specifically I've dreamed for a long time now about making a living by building my own software. 
A [Microprenuer](http://www.micropreneur.com), if you will. But the whole time I pretty much knew there is absolutely NO way I would 
build my own software products using Microsoft technology. In my opinion technologies like Rails, 
Node.js and MongoDB are much better suited to building next generation web applications than anything 
on the Microsoft stack right now. I'm sure many will differ with that opinion, but that's just how I 
see it. So in order to move closer to my dreams and goals, I knew I would have to move away from the 
Microsoft world at some point. I'll always wish I had done it sooner, but with Rails 3 getting ready 
to "ship" it seems like a great time to be focusing my efforts there.

## Bad

### Becoming one with the \*nix

I admit it. Early on, it has been tough to get up to speed on the nix tools and setting up Linux servers, 
etc. I've always been a pretty big command line junkie. But I've learned that being a \*Windows command 
line dude is a whole lot different than sitting down at a Bash shell for the Linux slice you just bought 
and now need to get setup with a full Rails stack. Nevertheless, I've forced my way through it thanks 
to the interwebs and honestly in great part due to the great articles over on [Slicehost](http://articles.slicehost.com). 
I still have a lot more to learn, but I'm starting to realize that those crazy bearded Linux heads are 
onto something. :)

### Living on the edge

In accordance with my sink or swim style, I decided to jump on the edge of quite a few things including 
Rails 3 beta and all of the associated "pre" gems for testing, persistence and others. That has been 
painful at times. Sometimes it takes you a little bit to troubleshoot a huge stack trace of errors to 
find an issue with an incompatible gem. Lots of times it was fixed by just updating the gem or actually 
applying specific patches. All in all, it hasn't been too bad though and it has forced me to dig into 
the actual code of the frameworks I'm using which has only increased my learning of the Ruby language 
and certain patterns used in the language.

## Ugly

Well about the only thing ugly so far is probably some of my Ruby code. I've hit a few roadblocks here 
and there because of my lack of some of the advanced capabilities of Ruby as a language. And sometimes 
I've had to just get it working and move on until I get more proficient with Ruby. Often times I 
just "know" that there is a better way to do a particular thing, even if I don't know exactly what that 
way is. Like anything else, I'm sure I'll come back a month later, a year later and throw up a little 
in my mouth when I see some of the Ruby I'm writing. But I'm down with the continuous improvement 
lifestyle, so I'll just keeping moving forward. :)

Well this was basically a stream of consciousness post, but perhaps it will give some insight into 
the life of a fellow geek that is striving to reinvent his career.
