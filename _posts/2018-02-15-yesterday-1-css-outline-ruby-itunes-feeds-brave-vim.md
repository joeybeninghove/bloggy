---
layout: post
title: 'Yesterday #1 - CSS Outline, Ruby iTunes Feeds & Brave Vim'
date: 2018-02-15 11:29 -0500
---

## Have you ever had one of those _serendipitous moments_ when ...

... someone posts a link about <mark>fixing a problem</mark> ...

... that you're literally <mark>working on right this moment</mark> as well?

This happens to me from time to time and it's a great feeling.  I was thinking
this might happen to other folks as well.

So I had this crazy idea about literally looking at my browser history from
<mark>yesterday</mark>, pulling out the interesting
links from what I was working on and posting them with commentary.

### Wait a minute, isn't this yet another spammy link blog?

Well, I certainly hope not.  I don't particularly like following dedicated link
blog accounts which have no face.  But, I do really like it when somebody with a
face finds something relevant to what I'm working on right now, or might be soon.

So this is my attempt to try to provide something useful based on my everyday
work.  I made the links <span class="text-2xl font-medium">big and bold</span> to make it more
<mark>scan-friendly</mark>, so please **scan and
skip** the ones you don't care about.

## [Executing Remote SSH Commands][ssh-commands]
Because I needed a reminder about how to run remote commands over SSH, which of
course is trivial, but this article had some additional tips about the use of
`sudo`.  This ultimately didn't end up working out for what I was trying to do,
but still a useful reminder nonetheless.

## [Gauges WordPress Plugin][gauges]
One of my favorite analytics services just released a new WordPress plugin.
While this particular announcement isn't that relevant to me, I'm glad to see
some <mark>more effort being breathed into Gauges</mark> itself as an overall product.

## [CSS Outline Helpful For Debugging][outline]
I've started using this CSS property as an easy way to debug layout issues in
CSS, as [pointed out by Adam Wathan](https://twitter.com/joeybeninghove/status/963844950180945921).
I made a little <mark>utility class</mark> to make this easier to toggle on/off which I've
found handy.

```css
body.debug * {
  outline: 1px solid red !important;
}
```

```html
<body class="debug">
</body>
```

## [List Of User Agent Strings][user-agents]
When you do a lot of back-end scraping and HTTP calls to fetch HTML from
websites like I do, looking up specific user-agent strings is a necessity.

## [Easy Way To Transfer Files - transfer.sh][transfer]
Nice little service I discovered to easily transfer files from one place to
another.  Keep in mind though, unless you encrypt the file before sending it,
it's <mark>publicly accessible</mark> and readable by anyone on the world wide web!

I'm using this to transfer a non-sensitive file from one server to a Heroku bash
dyno and it seems to be working well.

## [iTunes Feeds In Ruby?][itunes]

The Ruby standard library has more than you think.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en"
dir="ltr">JavaScript: &quot;Look if you want to capitalize a word, you&#39;ll
need to roll that yourself.&quot;<br>Ruby: &quot;iTunes support in stdlib? Sure,
no problem!&quot; <a
href="https://t.co/VDzRVpsS4E">https://t.co/VDzRVpsS4E</a></p>&mdash; Brandon
Hays (@tehviking) <a
href="https://twitter.com/tehviking/status/963550871618490368?ref_src=twsrc%5Etfw">February
13, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js"
charset="utf-8"></script>

That tweet pretty much sums it up.

## [Material Colors In Tailwind CSS][tailwind]
As my love affair with [Tailwind CSS](https://tailwindcss.com) continues, this
is a nice example of the power of their decision to <mark>use javascript for the
configuration</mark>.  :fire:

## [Using Carbon In Vim][carbon]
If you're using the most excellent [Carbon](https://carbon.now.sh) tool for
<mark>creating screenshots of your code</mark>, this is a nice [vim plugin][carbon] to make
it easier.

## [Multiple Heroku Accounts Plugin][heroku-accounts]
I have to deal with a couple different Heroku accounts at the same time, and
this plugin makes it really easy to do.  I just wish there was a way to have it
automatically switch to a particular account on a per-project basis.  Maybe
there is, but I'm still looking into it.  <mark>Anyone know about this?</mark>

## [Brave Browser + Vim Status][brave]
I really like Brave as a web browser, but the one showstopper for me is lack of
a vim extension (like Vimium).  It looks like they're <mark>well on their way</mark> to
getting this going, which is nice.  If only I had the time to actually
contribute to it.

## [IRB Command History][irb]
Helpful little <mark>snippet</mark> you can place in your `.irbrc` file to keep a history of
commands.

```ruby
require 'irb/ext/save-history'
IRB.conf[:SAVE_HISTORY] = 100
IRB.conf[:HISTORY_FILE] = "#{ENV['HOME']}/.irb-history"
```

## [Import CSV Data Into PostgreSQL][postgresql]
Nice detailed article <mark>comparing ways to import bulk data</mark> into PostgreSQL.  I'm
going with a Ruby/YAML approach at the moment since my dataset isn't that large,
but this is nice to know if/when the data I'm dealing with grows.

## [One Word: Robots][robots]
<p class="responsive-video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/fUyU3lKzoio" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</p>

[ssh-commands]: https://www.cyberciti.biz/faq/unix-linux-execute-command-using-ssh/
[gauges]: https://wordpress.org/plugins/gauges-analytics/
[outline]: https://developer.mozilla.org/en-US/docs/Web/CSS/outline
[user-agents]: http://www.useragentstring.com/pages/useragentstring.php?name=Chrome
[transfer]: https://transfer.sh/
[itunes]: https://github.com/ruby/ruby/blob/01a656c3fb1dd5fe8d3401880a2219221b252313/lib/rss/itunes.rb
[tailwind]: https://gist.github.com/davidpiesse/74f5eaa23eb405e61b58cfe535d9907c
[carbon]: https://github.com/kristijanhusak/vim-carbon-now-sh
[heroku-accounts]: https://github.com/heroku/heroku-accounts
[brave]: https://github.com/brave/browser-laptop/issues/9531
[robots]: https://www.youtube.com/watch?v=fUyU3lKzoio
[irb]: https://coderwall.com/p/l8azzq/add-history-to-the-ruby-irb-console
[postgresql]: https://infinum.co/the-capsized-eight/superfast-csv-imports-using-postgresqls-copy
