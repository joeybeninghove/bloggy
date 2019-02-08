---
layout: post
title: Jekyll, Quickly
description:
  In kind of a spin-off of fun, this is a Jekyll starter kit that can be used to quickly build out a production-ready Jekyll static site.
date: 2019-02-08 00:44 -0500
featured: true
---

I may not actually _write_ blog posts that often, but I sure can spin my wheels building and updating my blog engine.  I recently updated my Jekyll setup and decided to spin it off into its own starter kit that can be used to easily spin up other Jekyll sites when needed.

Here it is: [jekyll-fun](https://github.com/joeybeninghove/jekyll-fun)

<small class="text-grey">(spin-off of my [fun](https://github.com/joeybeninghove/fun) prototyping toolkit I started many years ago)</small>

### What It Includes
- [Webpack 4](https://webpack.js.org/) for managing all of the assets
- [Tailwind](https://tailwindcss.com/) baked in for utility-first CSS
- [Stimulus](https://stimulusjs.org/) as a lightweight javascript framework
- [PostCSS](https://github.com/postcss/postcss) used to load Tailwind and make [postcss-import](https://github.com/postcss/postcss-import) and [postcss-preset-env](https://github.com/csstools/postcss-preset-env) available to use
- [BrowserSync](https://www.browsersync.io/) for live reloading of browser after code changes
- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) for generating SEO tags
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) for generating a sitemap

Maybe someone else will find it useful.
