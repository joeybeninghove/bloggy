---
layout: post
title: How To Securely Move or Transfer Files To Heroku
description:
  If you're having a problem figuring out how to transfer files to a Heroku
  instance, like for example, to import some data from another server, here is
  the easiest way I've found to do it.
date: 2018-02-16 18:03 -0500
featured: true
---

**Do you need to transfer files to Heroku for:**

* performing a <mark>one-off operation</mark> on some data?
* like maybe <mark>importing some data</mark> from a CSV file into a Heroku database?

If you're stuck on this like I was, here is a **simple and secure** way to do
this using the excellent [transfer.sh](https://transfer.sh) service.

<!--more-->

## Prerequisites

The only prerequisites are to have **cURL** and **GPG** installed on the source
machine.  Both of these should already be installed on your Heroku instance, at
least in my experience.

If you're on macOS, cURL should already be installed, but you'll likely have to
install GPG, preferrably using Homebrew.

If on Linux, like Ubuntu for example, you can install `curl` and `gnupg` via `apt-get`.

<h6 class="code-caption">
  {% include icons/linux.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
sudo apt-get install curl gnupg
```

<h6 class="code-caption">
  {% include icons/apple.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
# cURL should already be installed with macOS
brew install gnupg
```

## Step 1: Upload Encrypted File

On the machine containing the file you want to transfer, be it your local
machine or some other server, <mark>run the command below</mark>.

<h6 class="code-caption">
  {% include icons/linux.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
# upload/encrypt file
cat turtles.csv \
| gpg --armor --symmetric --output - \
| curl -X PUT --upload-file "-" https://transfer.sh/turtles.csv

# => https://transfer.sh/123abc/turtles.csv
```

### OR

<h6 class="code-caption">
  {% include icons/apple.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
# upload/encrypt file
# conveniently copy the URL using pbcopy if on macOS
cat turtles.csv \
| gpg --armor --symmetric --output - \
| curl -X PUT --upload-file "-" https://transfer.sh/turtles.csv \
| pbcopy

# => https://transfer.sh/123abc/turtles.csv
```

You'll be prompted to enter a <mark>passphrase to encrypt</mark> the file before uploading it
to [transfer.sh](https://transfer.sh).

## Step 2: Download To Heroku Instance

First, spin up a bash session for your Heroku app.

<h6 class="code-caption">
  {% include icons/apple.svg class="h-4 w-4 mr-1" %}
  {% include icons/linux.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
# start up bash session on heroku
heroku run bash
```

Then download the file from the URL returned back to you from
[transfer.sh](transfer.sh) in <mark>Step 1</mark>.

<h6 class="code-caption">
  {% include icons/heroku.svg class="h-4 w-4 mr-1" %}
  heroku run bash
</h6>
```bash
# download/decrypt the file
curl https://transfer.sh/123abc/turtles.csv \
| gpg --output - > turtles.csv
```

You'll be prompted to enter the passphrase from Step 1 to <mark>decrypt</mark> the file and
that's it!

## Wait, is this actually secure?

Ok, sure, this certainly <mark>isn't as secure as encrypting it with a full blown key</mark>,
but that would take some of the "easy" out of all of this.  Granted, I'm not a
big wig security expert, but there does seem to be certain
types of data for which a simple passphrase encryption would suffice.

***Of course
I would not recommend you upload something extremely sensitive (e.g. credit card
numbers, passwords) in this manner***, but for mildly sensitive data, this seems
fine.  (You shouldn't be uploading that kind of stuff anywhere)

Remember, the links on [transfer.sh](https://transfer.sh)
<mark>expire after 10 days</mark> as well, so that is at least a little bit of
extra security built-in.

And heck, if you're not worried about the encryption at all, you can just bypass
the GPG encryption step altogether and make it even simpler.

<h6 class="code-caption">
  {% include icons/apple.svg class="h-4 w-4 mr-1" %}
  {% include icons/linux.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
# upload file
cat turtles.csv \
| curl -X PUT --upload-file "-" https://transfer.sh/turtles.csv

# => https://transfer.sh/123abc/turtles.csv
```

<h6 class="code-caption">
  {% include icons/heroku.svg class="h-4 w-4 mr-1" %}
  heroku run bash
</h6>
```bash
# download file
curl https://transfer.sh/123abc/turtles.csv --output turtles.csv
```
