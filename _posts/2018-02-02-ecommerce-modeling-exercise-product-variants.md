---
layout: post
title: Ecommerce Modeling Exercise - Product Variants
description: Ecommerce modeling exercice to find a product variant from selected option values
date: 2018-02-02 11:17 -0500
---

<div class="flex flex-col mb-6 tldr">
  <div class="bg-orange-lighter p-2 font-medium border border-b-0 border-orange rounded-t-sm">TL;DR</div>
  <div class="p-2 bg-orange-lightest border-l border-r border-b border-orange
  rounded-b-sm">
    <p>
      Exploring and learning ways to model products and variants in an ecommerce
      application.  Specifically, how to <a href="#finding-variant">find the matching variant</a>
      when a customer selects a set of options like "Small Red Cotton Shirt".
    </p>
    <div class="flex items-center p-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="fill-current h-6 w-6 mr-2"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
      <a href="https://github.com/joeybeninghove/product-variants-example">
        Product Variants Example
      </a>
    </div>
  </div>
</div>

As part of building the next version of our [ecommerce
product](https://cart66.com), I've been going through some modeling exercises on
how we want to model our products and related options/variants.  I've taken a
lot of inspiration from
[SpreeCommerce](https://guides.spreecommerce.org/developer/products.html), as it
seems like a really well thought out approach in this particular area.

So the basic flow we're looking to build at this point is, say a merchant wants
to sell a t-shirt.  They would maybe create a product named "Shirt" and then
that product would have different types of options like `Size`, `Color` and
`Material`.  And maybe the specific values for those options would include
something like `Small`, `Red` and `Cotton`, respectively.

## Creating Product With Options
Here is how a product like that might be created in Ruby using this kind of
modeling:

```ruby
product = Product.create!(name: "Shirt")

product.option_types.create!(name: "Size").tap do |size|
  %W(Small Medium Large).each do |name|
    size.option_values.create!(name: name)
  end
end

product.option_types.create!(name: "Color").tap do |color|
  %W(Red Blue Orange).each do |name|
    color.option_values.create!(name: name)
  end
end

product.option_types.create!(name: "Material").tap do |material|
  %W(Cotton Poly).each do |name|
    material.option_values.create!(name: name)
  end
end
```

## Creating Product Variant
An individual `Variant` would be a specific combination of the available option
values with its own `sku`, `price` and even dimensions, weight, stock level, etc.

Here is how a `Variant` might get created for a "Small Red Cotton Shirt":

```ruby
# first, let's get some option values to use for our new variant
small =
  product.option_types
    .find_by(name: "Size").option_values
    .find_by(name: "Small")

red =
  product.option_types
    .find_by(name: "Color").option_values
    .find_by(name: "Red")

cotton =
  product.option_types
    .find_by(name: "Material").option_values
    .find_by(name: "Cotton")

# then we'll create the variant for these values
product.variants.create!(
  option_values: [small, red, cotton], price: 12.95)
```

## Generating All Variants
Of course, this would get repeated for every possible combination, probably
automatically as option types/values get added to a product.  Here is one way to
create variants for every possible combination:

```ruby
class Product < ApplicationRecord
  # ...

  # yes, I'm sure this could still be optimized
  def generate_variants
    option_type_value_groupings = {}

    option_types.each do |option_type|
      option_type_value_groupings[option_type.id] =
        option_type.option_values.map(&:id)
    end

    all_value_ids = option_type_value_groupings.values
    all_value_ids =
      all_value_ids.inject(all_value_ids.shift) do |memo, value|
        memo.product(value).map(&:flatten)
    end

    all_value_ids.each do |value_ids|
      variants.create(option_value_ids: value_ids,
                      price: master.price)
    end
  end
end
```

<a name="finding-variant"></a>
## Finding Variant From Selected Option Values
Now if we present the customer with a product order form with some drop-down
lists for `Size`, `Color` and `Material` and they select `Small`, `Red` and
`Cotton`, we need to know which specific `Variant` that relates to so that we
can do things like get the actual price and maybe check stock levels for that
particular variant, etc.

```ruby
class ProductTest < ActiveSupport::TestCase
  test "finding variant from selected option values" do
    # create product set up with various option types/values
    product = create_product

    # grab some option values to use
    small = find_option_value_by_name(...)
    red = find_option_value_by_name(...)
    cotton = find_option_value_by_name(...)

    # simulate customer picking small, red, cotton on a product form
    chosen_option_value_ids = [small.id, red.id, cotton.id]

    # find the variant that matches the selected option values
    variant = product.variants
      .joins(:option_values)
      .where(option_values: { id: chosen_option_value_ids })
      .group(:id)
      .having("count(variants.id) = ?", chosen_option_value_ids.count)
      .first

    assert variant.option_values.include? small
    assert variant.option_values.include? red
    assert variant.option_values.include? cotton
  end
end
```

The trick here is the use of `group` and `having` to narrow it down to just the
`Variant` that contains **all** of the chosen option values.  Otherwise, you end
up with all of the variants that have _any_ of the chosen option values.

## Models

Here are the models used in this example:

```ruby
class Product < ApplicationRecord
  has_many :option_types, dependent: :destroy

  has_one :master,
    -> { where is_master: true },
    class_name: "Variant",
    inverse_of: :product,
    dependent: :destroy

  has_many :variants,
    -> { where is_master: false },
    inverse_of: :product,
    dependent: :destroy

  # ...
end

class OptionType < ApplicationRecord
  belongs_to :product
  has_many :option_values, dependent: :destroy
end

class OptionValue < ApplicationRecord
  belongs_to :option_type
  has_many :option_value_variants, dependent: :destroy
  has_many :variants, through: :option_value_variants
end

class Variant < ApplicationRecord
  belongs_to :product
  has_many :option_value_variants, dependent: :destroy
  has_many :option_values, through: :option_value_variants
end

class OptionValueVariant < ApplicationRecord
  belongs_to :option_value
  belongs_to :variant
end
```

## Schema

And here is the schema used behind the scenes:

```ruby
ActiveRecord::Schema.define(version: 2018_02_02_154750) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "option_types", force: :cascade do |t|
    t.bigint "product_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_option_types_on_product_id"
  end

  create_table "option_value_variants", force: :cascade do |t|
    t.bigint "option_value_id"
    t.bigint "variant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_value_id"], name: "index_option_value_variants_on_option_value_id"
    t.index ["variant_id"], name: "index_option_value_variants_on_variant_id"
  end

  create_table "option_values", force: :cascade do |t|
    t.bigint "option_type_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_type_id"], name: "index_option_values_on_option_type_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "variants", force: :cascade do |t|
    t.string "sku"
    t.integer "price_cents", default: 0, null: false
    t.string "price_currency", default: "USD", null: false
    t.boolean "is_master"
    t.bigint "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_variants_on_product_id"
  end

  add_foreign_key "option_types", "products"
  add_foreign_key "option_value_variants", "option_values"
  add_foreign_key "option_value_variants", "variants"
  add_foreign_key "option_values", "option_types"
  add_foreign_key "variants", "products"
end
```

## Sample Code

[https://github.com/joeybeninghove/product-variants-example](https://github.com/joeybeninghove/product-variants-example)

## Thoughts?

This is mainly just me exploring and learning, so if you have any ideas or
improvements to any of this, I'd love to [hear
them](https://twitter.com/joeybeninghove)!
