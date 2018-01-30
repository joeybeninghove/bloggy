---
title: Funky CSS Border Utilities
description: Generating CSS utility classes for advanced border radiuses, mainly for the purposes of simulating hand-drawn borders
layout: post
date: 2018-01-30 13:14 -0500
---

<div class="flex flex-col mb-6">
  <div class="bg-orange-lighter p-2 font-medium border border-b-0 border-orange rounded-tl-sm-lg rounded-tr-sm-sm">TL;DR</div>
  <div class="p-2 bg-orange-lightest border-l border-r border-b border-orange rounded-br-md-xl rounded-bl-lg-sm">
    If you need a quick way to apply some funky CSS border radiuses, I've built a
    script to generate a set of utility classes to make it easier.
    <div class="flex items-center p-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="fill-current h-6 w-6 mr-2"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
      <a href="https://github.com/joeybeninghove/funky-css-border-utilities">
        Funky CSS Border Utilities
      </a>
    </div>
  </div>
</div>

As part of some prototyping in the next version of the [e-commerce platform
app](https://cart66.com)
I'm building, I wanted to experiment with the idea of simulating "hand-drawn"
borders for certain elements using CSS.  I've been using [Tailwind
CSS](https://tailwindcss.com) for a
majority of the front-end work, but it doesn't come with utility classes for
adjusting the `border-radius` values for both the horizontal and vertical axes
separately.  So I whipped up a little Ruby script to generate some utility
classes that still have the same Tailwind naming flavor.

## Some Examples

<div class="flex flex-wrap mt-6 mb-6">
  <div class="w-full sm:w-64 md:w-64 bg-blue-lightest border-5 border-blue p-4 pl-6 rounded-tl-sm-lg text-left mr-2 mb-2">
    .rounded-tl-sm-lg
  </div>
  <div class="w-full sm:w-64 md:w-64 bg-blue-lightest border-5 border-blue p-4 pl-6 rounded-br-xl-md text-left mr-2 mb-2">
    .rounded-br-xl-md
  </div>
  <div class="flex flex-col w-full sm:w-64 md:w-64 bg-blue-lightest border-5 border-blue p-4 pl-6 rounded-tr-md-xl rounded-bl-lg-md text-left mr-2 mb-2">
    <div>.rounded-tr-md-xl</div>
    <div>.rounded-bl-lg-md</div>
  </div>
  <div class="flex flex-col w-full sm:w-64 md:w-64 bg-blue-lightest border-5 border-blue p-4 pl-6 rounded-tl-xl-lg rounded-tr-sm-md rounded-bl-md-sm rounded-br-xl-xl text-left">
    <div>.rounded-tl-xl-lg</div>
    <div>.rounded-tr-sm-md</div>
    <div>.rounded-bl-md-sm</div>
    <div>.rounded-br-xl-xl</div>
  </div>
</div>

## PostCSS and cssnext

Since I'm using this in an existing Webpack and PostCSS pipeline in my Rails
app, this particular script generates CSS in the form of [cssnext](http://cssnext.io/) so that I can
take advantage of [custom properties and var](http://cssnext.io/features/#custom-properties-var).

## Configuration

The border radius values are driven by a set of custom properties with a default
configuration, though they can be customized to whatever you want.

```css
:root {
  --h-xl-size: 155px;
  --v-xl-size: 155px;
  --h-lg-size: 100px;
  --v-lg-size: 100px;
  --h-md-size: 55px;
  --v-md-size: 55px;
  --h-sm-size: 35px;
  --v-sm-size: 35px;
}
```

## Class Naming

The structure of the CSS class names used here are broken down like this:

`rounded-{corner}-{horizontal_size}-{vertical_size}`

So applying a class of `rounded-tl-sm-md` using the default configuration from
above would generate the following CSS declarations:

```css
.rounded-tl-sm-md {
  border-top-left-radius: 35px 55px;
}
```

## Source Code

I've pushed up the Ruby script along with a CSS file that was generated using
that script.  It also includes an HTML file to see examples of lots of different
sizes of various border radiuses.

<a href="https://github.com/joeybeninghove/funky-css-border-utilities">
  Funky CSS Border Utilities
</a>

## What's Next?

Here are a couple ideas I have for enhancements to make next after using these
utility classes myself for a little while.

### More Granular Scale?

I'm thinking it might be better to use a numeric scale, rather than a
`sm`, `md`, etc one.  So doing something like `rounded-tl-2-4` might make more
sense to allow you to really get creative with different sizes of each corner
instead of getting stuck with just 4 or so sizes.

### PostCSS Plugin

It'd also be great to turn this into an actual [PostCSS](http://postcss.org/)
plugin so that it can be put directly into a Webpack/PostCSS pipeline right
along side other plugins like Tailwind.  I just created it in Ruby originally
because I'm much more familiar with that than the PostCSS plugin infrastructure.

## Thoughts?

I'm really curious to know what you think about all of this.
[Hit me up on twitter](https://twitter.com/joeybeninghove) and let me know!
