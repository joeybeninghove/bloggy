---
layout: post
title: Rebuilding FreshBooks with Tailwind CSS
date: 2018-01-11 18:32 -0500
tag:
- tailwind
- css
- rails
category: blog
author: joeybeninghove
description: Tailwind Demo using FreshBooks as an example
---

## Source Code

* [Tailwind Demo Source Code](https://github.com/joeybeninghove/freshbarks-tailwind-demo)

[Tailwind CSS](http://tailwindcss.com) has been blowing me away lately (dad joke) and one of the things I've done to help get up to speed quickly on it was rebuild an existing design (a tip I learned from [Adam Wathan](http://adamwathan.me) in his [rebuilding of Coinbase](https://www.youtube.com/watch?v=7gX_ApBeSpQ&t=3373s)).

I kind of like the design of FreshBooks, so I chose that as a basis for me to learn Tailwind.  It was also an opportunity for me to learn Webpack and Webpacker and how to [get Tailwind all wired up in a Rails app](https://www.artmann.co/articles/adding-tailwind-css-to-your-rails-app).

It was a really good experience for me to learn a lot of new things at once, including Flexbox in general as well as how to leverage it from the Tailwind utility classes.  I went ahead and [published the Rails app](https://github.com/joeybeninghove/freshbarks-tailwind-demo) in case anyone is interested in viewing the source.

I didn't extract any components at all, so there is a lot of repitition in the markup, but extracting those out is really straightforward and is definitely something I'd be doing on a real app where this was being used.

## Preview Pics

![mobile view](http://link.joey.io/Q3QpnN/8OssPqCoUd+)
![normal view](http://link.joey.io/nHmh6l/lU47sRrfZG+)
