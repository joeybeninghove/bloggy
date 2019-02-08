---
layout: post
title: Rebuilding FreshBooks with Tailwind CSS
description: Tailwind CSS Demo using FreshBooks as an example
date: 2018-01-11 18:32 -0500
---

<div class="flex flex-col mb-6 tldr">
  <div class="bg-blue-lighter p-2 font-medium border border-b-0 border-blue rounded-t-sm">TL;DR</div>
  <div class="p-2 bg-blue-lightest border-l border-r border-b border-blue
  rounded-b-sm">
    <p>
      This is just a quick demonstration of <a href="https://tailwindcss.com">Tailwind CSS</a>, a utility-first CSS
      framework.  As part of learning Tailwind, I decided to try rebuilding one
      of the screens from the Freshbooks admin area.
    </p>
    <div class="flex items-center p-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="fill-current h-6 w-6 mr-2"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
      <a href="https://github.com/joeybeninghove/freshbarks-tailwind-demo">
        Tailwind Demo Source Code
      </a>
    </div>
  </div>
</div>

[Tailwind CSS](http://tailwindcss.com) has been blowing me away lately (dad joke) and one of the things I've done to help get up to speed quickly on it was rebuild an existing design (a tip I learned from [Adam Wathan](http://adamwathan.me) in his [rebuilding of Coinbase](https://www.youtube.com/watch?v=7gX_ApBeSpQ&t=3373s)).

I kind of like the design of FreshBooks, so I chose that as a basis for me to learn Tailwind.  It was also an opportunity for me to learn Webpack and Webpacker and how to [get Tailwind all wired up in a Rails app](https://www.artmann.co/articles/adding-tailwind-css-to-your-rails-app).

It was a really good experience for me to learn a lot of new things at once, including Flexbox in general as well as how to leverage it from the Tailwind utility classes.  I went ahead and [published the Rails app](https://github.com/joeybeninghove/freshbarks-tailwind-demo) in case anyone is interested in viewing the source.

I didn't extract any components at all, so there is a lot of repitition in the markup, but extracting those out is really straightforward and is definitely something I'd be doing on a real app where this was being used.

## Preview Pics
<img src="/assets/freshbooks-side-by-side.png" class="bordered-image">
<img src="/assets/freshbooks-full.png" class="bordered-image">
