---
layout: post
title: Fun with PHP Anonymous Functions
description: Some quick tips about how to use PHP anonymous functions
date: 2014-12-06 00:00
---

Over the past year or so I've dove head first into the land of PHP for the first time and I have to say I've actually enjoyed it.  I plan to have quite a few posts about my experiences in PHP after using Ruby for so long including the misconceptions I had about PHP coming into it and how I think it sometimes gets a bad wrap.  These are a few quick little beginner tips that I just recently learned.

## A Sorting Example

I was quite happy to discover that PHP supports anonymous functions when I started coding up some
[real](http://cloudswipe.com) [apps](http://get.hurricane.io/joey) with it.  When it comes to things like sort functions
in PHP, the way I see most folks use them is by passing in a string name of a function to use as the comparer like this:

```php
<?php
  $herbivores = [
      ['name' => 'sheep'],
      ['name' => 'cow'],
      ['name' => 'goat']
  ];

  function comparer($a, $b) {
      return $a['name'] < $b['name'] ? -1 : 1;
  }

  usort($herbivores, 'comparer');
?>
```

This seemed a little odd to me considering I was used to just writing an inline anonymous function or passing in a
reference to one if it was more than a one-liner.  So I started playing around with these in PHP.  First using an inline
function like this:

```php
<?php
  $herbivores = [
      ['name' => 'sheep'],
      ['name' => 'cow'],
      ['name' => 'goat']
  ];

  usort($herbivores, function($a, $b) {
      return $a['name'] < $b['name'] ? -1 : 1;
  });
?>
```

I like these for simple comparers since I don't see the need to declare the function on a whole separate line taking up
unnecesssary space.  Now if it was a little more complex, I'd probably just assign it to a variable and pass the
reference into the sort function like this:

```php
<?php
  $herbivores = [
      ['name' => 'sheep'],
      ['name' => 'cow'],
      ['name' => 'goat']
  ];

  $comparer = function($a, $b) {
      return $a['name'] < $b['name'] ? -1 : 1;
  };

  usort($herbivores, $comparer);
?>
```

It's nice to know you can do this in PHP, and in a clean way as well.  Of course if you found yourself needing this
comparer in more than one place, going with the first, more popular approach of passing in a string name of a function would
probably be more suitable.

## Quick Sorting Caveat

Along the same lines of this example with sorting, I recently discovered that you can't execute inline functions and
have the returned result act as the array being sorted like this:

```php
<?php

  $herbivores = [
      ['name' => 'sheep'],
      ['name' => 'cow'],
      ['name' => 'goat']
  ];

  $omnivores = [
      ['name' => 'pig'],
      ['name' => 'chicken'],
      ['name' => 'duck'],
  ];

  function comparer($a, $b) {
      return $a['name'] < $b['name'] ? -1 : 1;
  }

  usort(array_merge($herbivores, $omnivores), $comparer);
?>
```

That will of course present you with the dreaded `Only variables should be passed by reference` error.  You have to
assign it to a variable first and then pass that in like this:

```php
<?php
  ...

  $merged = array_merge($herbivores, $omnivores);

  usort($merged, $comparer);
?>
```

Kind of annoying, but not the end of the world.  Overall I've been happy with the ability to do these types of things in
PHP that I've been used to doing in Ruby.  I'd love to hear if anyone more experienced in PHP has any other tips along these lines, let me know!  :)
