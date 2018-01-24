---
layout: post
title: How To Use jQuery In Rails 5.2 Using Webpack
date: 2018-01-17 15:38 -0500
tag:
- rails
- webpack
- javascript
category: blog
author: joeybeninghove
description: How To Use jQuery In Rails 5.2 Using Webpack
star: true
---

As you may have heard, starting in Rails 5.1, [jQuery is no longer added by default](http://weblog.rubyonrails.org/2017/4/27/Rails-5-1-final/) to new Rails applications.  Since I've just started recently building a new app on Rails 5.2, I encountered the inevitable situation where I wanted to use jQuery for something.  Since I'm already [on the webpack/webpacker bandwagon](/rails-5-2-beta-2-webpacker-actioncable/), I wanted to see how to go about incorporating jQuery into my webpack setup.

I had a couple goals in mind:

* Load jQuery via webpack along with all of my other javascript dependencies
* Make jQuery available to all of my javascript modules without having to `import` or `require` it everywhere

It was pretty straightforward, but I couldn't find a single place that had all of the steps involved, so here it is.

## Add jQuery via Yarn

```
yarn add jquery
```

## Update webpack config
_config/webpack/environment.js_

```javascript
const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

module.exports = environment

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery'
  })
)
```

The main section to be added is to tell webpack to provide the jQuery plugin to all of the javascript modules using [ProvidePlugin from webpack](https://webpack.js.org/plugins/provide-plugin/).

## Bask in jQuery glory

Here is a little snippet from my foray into the [Stimulus javascript framework](https://github.com/stimulusjs/stimulus), using jQuery to access one of the elements.

_app/javascript/src/controllers/shippable_controller.js_

```javascript
import { Controller } from "stimulus"

export default class extends Controller {
  toggle() {
    if (this.checkbox.checked) {
      $(this.fields).removeClass("hidden");
    }
  }

  get fields() {
    return this.targets.find("fields");
  }

  get checkbox() {
    return this.targets.find("checkbox");
  }
}
```
