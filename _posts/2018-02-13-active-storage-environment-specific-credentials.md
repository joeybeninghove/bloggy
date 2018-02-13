---
layout: post
title: Active Storage Environment-Specific Credentials
description:
  How to set up environment-specific credentials for Active Storage
  when using the same storage service
date: 2018-02-13 12:13 -0500
---

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

###### config/storage.yml
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

###### config/environments/development.rb
```ruby
Rails.application.configure do
  config.active_storage.service = :local
end
```

###### config/environments/production.rb
```ruby
Rails.application.configure do
  config.active_storage.service = :amazon
end
```

###### /private/var/.../credentials.yml.enc.1234

<small class="text-sm">(edited via `rails credentials:edit`)</small>

```yaml
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

###### config/storage.yml
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

###### config/environments/development.rb
```ruby
Rails.application.configure do
  config.active_storage.service = :amazon_development
end
```

###### config/environments/production.rb
```ruby
Rails.application.configure do
  config.active_storage.service = :amazon_production
end
```

### Encrypted credential file changes

Then we just need to update our actual credentials to add the environment key
scope to each of the credentials we want to use.

###### /private/var/.../credentials.yml.enc.1234

<small class="text-sm">(edited via `rails credentials:edit`)</small>

```yaml
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
