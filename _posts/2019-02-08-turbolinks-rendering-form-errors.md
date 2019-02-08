---
layout: post
title: Turbolinks Rendering Form Errors
description: Handy gem to add support for render to Turbolinks
date: 2019-02-08 15:45 -0500
featured: true
---

When working in one of my Rails apps where I'm using Turbolinks, I ran into a [limitation of Turbolinks](https://github.com/turbolinks/turbolinks/issues/85) usage in Rails.

Turbolinks handles `redirect_to` just fine, but it actually does NOT handle `render`.  The main scenario that brought this to my attention was when using the default `form_with` tag in Rails 5 to render and submit forms.  It defaults `remote: true` for these forms, submitting them via AJAX.

That's all fine and dandy if the form POST was successful, because the controller is likely doing a `redirect_to` in those cases.  But if the data submitted has validation errors, you might want to `render` out the view with the invalid model to show the validation errors.

This is where Turbolinks, out of the box, falls down.  Thankfully, there is a little gem to augment Turbolinks to support `render` as well.

I just installed it in my Rails app and it worked perfectly without any configuration or other steps at all.

Here it is: [turbolinks_render](https://github.com/jorgemanrubia/turbolinks_render)
