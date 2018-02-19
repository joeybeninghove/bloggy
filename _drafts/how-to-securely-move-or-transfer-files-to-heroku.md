---
layout: post
title: How To Securely Move or Transfer Files To Heroku
description:
  If you're having a hard time figuring out how to transfer files to a Heroku
  instance, like for example, to import some data from another server, here is
  the easiest way I've found to do it.
date: 2018-02-16 18:03 -0500
---

## Do you need to transfer files to Heroku for:

* performing a <mark>one-off operation</mark> on some data?
* like maybe <mark>importing some data</mark> from a CSV file into a Heroku database?

If you're stuck on this like I was, here is a **simple and secure** way to do
this using the excellent [transfer.sh](https://transfer.sh) service.

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
cat mydatafile.csv \
| gpg --armor --symmetric --output - \
| curl -X PUT --upload-file "-" https://transfer.sh/mydatafile.csv
```

### OR

<h6 class="code-caption">
  {% include icons/apple.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
# conveniently copy the URL using pbcopy if on macOS
cat mydatafile.csv \
| gpg --armor --symmetric --output - \
| curl -X PUT --upload-file "-" https://transfer.sh/mydatafile.csv \
| pbcopy
```

You'll be prompted to enter a passphrase to encrypt the file before uploading it
to [transfer.sh](https://transfer.sh).

## Step 2: Download To Heroku Instance

First, spin up a bash session for your Heroku app.

<h6 class="code-caption">
  {% include icons/apple.svg class="h-4 w-4 mr-1" %}
  {% include icons/linux.svg class="h-4 w-4 mr-1" %}
  terminal
</h6>
```bash
heroku run bash
```

Then download the file from the URL returned back to you from
[transfer.sh](transfer.sh) in <mark>Step 1</mark>.

<h6 class="code-caption">
  {% include icons/heroku.svg class="h-4 w-4 mr-1" %}
  heroku run bash
</h6>
```bash
curl https://transfer.sh/123abc/mydatafile.csv \
| gpg --output - > mydatafile.csv
```
