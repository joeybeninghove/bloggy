---
layout: post
title: Drawing An Old Television in CSS
description: Using some simple CSS tricks to draw an old school television set
date: 2018-02-01 10:56 -0500
---

When I was looking for an old television icon to use for the
[Abbott & Costello Ipsum](/abbott-costello-ipsum) thing I made the other day, I
realized I could probably just do it using CSS alone.  Turns out I was right.

<div class="flex mb-6">
  <div class="flex flex-col items-center">
    <div class="flex w-32 justify-between">
      <div class="antenna-l border border-grey-dark border-b-0"></div>
      <div class="antenna-r border border-grey-dark border-b-0"></div>
    </div>
    <div class="flex p-4 border-4 rounded-lg border-grey-dark bg-grey w-96 h-64 mb-4">
      <div class="w-full h-full p-2 border border-grey-dark rounded-lg mr-6 bg-grey-lighter"></div>
      <div class="flex flex-col justify-around text-grey-dark">
        <div class="h-12 w-12 rounded-full bg-grey-lighter flex justify-center items-center border border-grey-dark">
        </div>
        <div class="h-12 w-12 rounded-full bg-grey-lighter flex justify-center items-center border border-grey-dark">
        </div>
      </div>
    </div>
  </div>
</div>

Note: This is leaning mostly on [Tailwind CSS](https://tailwindcss.com) with a
little custom CSS for handling the skewing of the antennas.

## HTML

```html
<div class="flex">
  <div class="flex flex-col items-center">
    <div class="flex w-32 justify-between">
      <div class="antenna-l border border-grey-dark border-b-0"></div>
      <div class="antenna-r border border-grey-dark border-b-0"></div>
    </div>
    <div class="flex p-4 border-4 rounded-lg border-grey-dark bg-grey w-96 h-64 mb-4">
      <div class="w-full h-full p-2 border border-grey-dark rounded-lg mr-6 bg-grey-lighter"></div>
      <div class="flex flex-col justify-around text-grey-dark">
        <div class="h-12 w-12 rounded-full bg-grey-lighter flex justify-center items-center border border-grey-dark">
        </div>
        <div class="h-12 w-12 rounded-full bg-grey-lighter flex justify-center items-center border border-grey-dark">
        </div>
      </div>
    </div>
  </div>
</div>
```

## CSS

```css
.antenna-l, .antenna-r {
  /* @apply call is from Tailwind */
  @apply h-16 w-4 bg-grey rounded-t-lg;
}

.antenna-l {
  transform: skew(45deg);
}

.antenna-r {
  transform: skew(-45deg);
}
```

## CodePen

[Old Television using CSS](https://codepen.io/joeybeninghove/pen/EQVwpE)
