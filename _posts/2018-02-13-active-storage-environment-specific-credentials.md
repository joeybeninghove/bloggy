---
layout: post
title: Active Storage Environment-Specific Credentials
description:
  How to set up environment-specific credentials for Active Storage
  when using the same storage service
date: 2018-02-13 12:13 -0500
featured: true
---

## Do you want to use the <mark>same storage service</mark> (e.g. S3, Azure, Google) for <mark>multiple environments</mark> with Active Storage?

Here is a solution using the new encrypted credentials and a small tweak to the
Active Storage configuration file.

<!--more-->

As I've been digging into Active Storage for one of my latest projects, I found
myself wanting to use the same storage service (S3) for both development and
production.

From reading the docs, it looks like the expectation is that most folks will use
the `local` storage service for `development` and something like `amazon` or
`google` for `production`.  This would probably work most of the time, for most
people.

## Conventional Scenario, Different Services Per Environment

This is how most folks will probably use Active Storage, using different storage
service providers between `development` and `production`.

<h6 class="code-caption">config/storage.yml</h6>
```erb
local:
  service: Disk
  root: <%= Rails.root.join("storage") %>

amazon:
  service: S3
  access_key_id:
    <%= Rails.application.credentials.dig(:aws, :access_key_id) %>
  secret_access_key:
    <%= Rails.application.credentials.dig(:aws, :secret_access_key) %>
  region: us-east-1
  bucket: app-bucket
```

<h6 class="code-caption">config/environments/development.rb</h6>
```ruby
Rails.application.configure do
  config.active_storage.service = :local
end
```

<h6 class="code-caption">config/environments/production.rb</h6>
```ruby
Rails.application.configure do
  config.active_storage.service = :amazon
end
```

<h6 class="code-caption">rails credentials:edit</h6>
```yaml
# /private/var/.../credentials.yml.enc.1234

aws:
  access_key_id: 12345
  secret_access_key: 67890
```

## Let's Try Another Approach

I usually prefer setting up development and test buckets on S3 for my
local development to better mirror the staging and production environments
locally.  Here is how I did this using
[Active Storage](https://github.com/rails/rails/tree/master/activestorage)
and the 
[new Credentials feature](http://weblog.rubyonrails.org/2017/11/27/Rails-5-2-Active-Storage-Redis-Cache-Store-HTTP2-Early-Hints-Credentials/)
in Rails 5.2.

## Same Service, Different Credentials, Different Environments

### Changes to storage.yml

The main change to make this happen is to add some ERB goodness to the
`storage.yml` file, making it use the current environment when looking up the
storage service information.  Notice the `dig` call now looks for an environment
key as the scope for the actual AWS credentials.

<h6 class="code-caption">config/storage.yml</h6>
```erb
amazon_<%= Rails.env %>:
  service: S3
  access_key_id:
    <%= Rails.application.credentials.dig(
      Rails.env.to_sym, :aws, :access_key_id) %>
  secret_access_key:
    <%= Rails.application.credentials.dig(
      Rails.env.to_sym, :aws, :secret_access_key) %>
  region: us-east-1
  bucket: app-<%= Rails.env %>
```

### Updating the environment configs

Now we just need to update the environment configs to point to
`amazon_development` and `amazon_production` respectively.

<h6 class="code-caption">config/environments/development.rb</h6>
```ruby
Rails.application.configure do
  config.active_storage.service = :amazon_development
end
```

<h6 class="code-caption">config/environments/production.rb</h6>
```ruby
Rails.application.configure do
  config.active_storage.service = :amazon_production
end
```

### Encrypted credential file changes

Then we just need to update our actual credentials to add the environment key
scope to each of the credentials we want to use.

<h6 class="code-caption">rails credentials:edit</h6>
```yaml
# /private/var/.../credentials.yml.enc.1234

development:
  aws:
    access_key_id: dev-1234
    secret_access_key: dev-5678

production:
  aws:
    access_key_id: prod-1234
    secret_access_key: prod-5678
```

This approach embraces convention over configuration and allows each environment
to use the same storage service, but different credentials for each environment.
