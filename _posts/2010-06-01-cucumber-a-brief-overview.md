---
layout: post
title: Cucumber, A Brief Overview
date: 2010/06/01 15:30:00
tags: [ruby, bdd, testing, cucumber]
canonical_url: http://www.lostechies.com/blogs/joeydotnet/archive/2010/06/01/cucumber.aspx
---

## Cucumber

I've found [Cucumber](http://cukes.info) to be a pretty nice way of doing high level acceptance/integration 
testing. It's also the first time I've ever thought that ATDD (acceptance test driven development) is 
actually achievable. The idea is that you write your "stories" in plain english, preferrably with your 
client/customer/product owner using the given/when/then style of syntax. Once written, these stories can 
be run through the Cucumber framework where it is parsed and coupled with custom ruby code (some of which 
you have to write) to essentially give you executable specifications. Of all the attempts I've seen out 
there to achieve ATDD and executable specifications, Cucumber really seems to have it nailed the best so 
far. Writing the stories does take some getting used to as you do somewhat have to learn to speak the 
"language" of Cucumber. But after writing your first couple "features", as Cucumber calls them, you pretty 
much get the hang of it.

### Example

Here is an example of what a Cucumber feature looks like.

###### /features/users/add_new_user.feature
```cucumber
Feature: Add new user
    In order to allow a new user to access the system
    As an admin
    I want to add a new user to the system

    Scenario: New link is clicked from the users page
        Given I am logged in as an admin
        And I am on the users page
        When I follow "New"
        Then I should be on the new user page

    Scenario Outline: Required text fields are blank 
        Given I am logged in as an admin
        And I am on the new user page
        When I fill in "" for ""
        And I press "Save"
        Then I should see an error for ""

        Examples:
            | field_name |
            | First name |
            | Last name  |
            | Email      |
            | Password   |
```

The first section under the feature name is simply text to describe the feature in a typical As a/I want 
to/So that format. That text is for display purposes only and is not used during execution.

Next comes the scenarios which are executed when run through Cucumber. The first scenario simply verifies 
that when a link named "New" is clicked from the main users page, that it takes you to the "New User" 
page. This is a pretty simple one, but it's nice to have some of these as kind of smoke tests.

The second one is interesting in that it acts as an outline to keep your cucumber features DRY. If there 
is one thing you'll notice about the Ruby/Rails community and the tools/frameworks used is that there 
is an extreme emphasis on keeping things DRY, which I love. What this outline does is use tokens in the 
actual scenario steps, then specify a simple table representation that is used to plug in each "example" 
value when the scenario is run. So this scenario outline actually gets run 4 different times, once with 
each value for listed. The closest parallel I can think of in .NET land is RowTests with MBUnit, but I'm 
sure there are others such as Fitness, which I haven't used too much.

I've used Cucumber to drive out almost every feature so far in this Rails app I'm building. And I can 
definitely say it's been worth it. Especially when I go to update my gems to a new version or even try 
out the edge version straight from the Git repo. I've been able to lean on my Cucumber features to give 
me a nice sense at a high level as to the health of my application from the user's point of view.

## Great, so how does all this work?

Under the hood, Cucumber is actually spinning up the Rails app, opening the pages you tell it and clicking 
links and filling out text fields on the actual page. It does this using a web testing framework such as 
Capybara or Webrat. Each one comes with a set of pre-defined steps that you can use to cover a lot of the 
common actions you need to do on a web page such as clicking links/buttons, filling out forms and inspecting 
the content on the page using css or xpath helpers. Capybara seems to be taking over Webrat's long rule in 
this space and is the default option when getting Cucumber set up. There is also the ability to test 
javascript/AJAX using Capybara with either EnvJs or Culerity/Celerity. Unfortunately I haven't been able 
to get this working yet, but I plan to very soon because I'm already starting to build some non-trival 
client side stuff now that I'd really like to get some automated tests around.

## No, really, how DOES this work?!?

Ok, so the "magic" of Cucumber is all in the step definitions, which are defined using Ruby. There is also 
some supporting Ruby code that you get out of the box with Cucumber that can help get you started. 
For example, it creates a file named "paths.rb" for you which is where you tell Cucumber where to navigate 
given a set of text. So when Cucumber encounters a line like this in your plain text scenario, "And I am 
on the users page", it automatically knows the phrase "I am on" and signals to Cucumber that you're 
wanting to navigate somewhere. Then it looks at the text after that, which is "the users page" in this 
case. This is where you need to give Cucumber a little help.

Here is an example of how to help a cuke out.

###### /features/support/paths.rb
```ruby
module NavigationHelpers  
  def path_to(page_name)  
    case page_name  
      when /the users page/  
        users_path  # rails routing helper method  
      when /the new user page/  
        new_user_path  # rails routing helper method  
    end  
  end  
end  
```

Since the Cucumber feature files are plain text and you are encouraged to use whatever language feels natural 
to you and your customer, you're going to inevitably write something that Cucumber just doesn't know how 
to do out of the box. This is where custom step definitions come into play. But don't worry, they're not 
as scary as they may look.

From the scenario above, Cucumber has no idea how to interpret "Given I am logged in as an admin" without 
a little help. Below you can see that I'm specifiying a regular expression for the text that Cucumber 
needs help with and then simply using Capybara to visit a page, fill in a couple fields and click a button 
to perform the login using the actual login page. Don't let the regular expressions stuff scare you off. 
The awesome thing about running your Cucumber features is that when it comes across something it doesn't 
understand it gives you the exact snippet of Ruby code that you can literally copy/paste from the terminal 
into a custom step file like the one show below. Since I'm still not a regular expression guru, I LOVE 
that Cucumber helps me with that!

###### /features/step_definitions/login_steps.rb
```ruby
Given /^I am logged in as an admin$/ do  
  user = Factory.create(:admin) # I'll get to this later (factory_girl)  
  visit(login_url)  
  fill_in('Email', :with => user.email)  
  fill_in('Password', :with => user.password)  
  click('Login')  
end  
```

Cucumber integration with Capybara (or Webrat) comes with a nice set of web related steps that cover a 
lot of the common cases. But at some point you'll definitely want to define your own web related steps. 
I just created a file named "customwebsteps.rb" to place them in. This is a simple web step I defined to 
allow me to assert that an error is shown on the page containing the text I supply, which comes from my 
plain text scenario. Notice that you can chain together other web steps within each other like I'm doing 
below. My custom web step below is simply leveraging one of the built in Capybara web steps to do what it 
needs.

###### /features/step_definitions/custom_web_steps.rb
```ruby
Then /^I should see an error for "([^\"]*)"$/ do |text|  
  Then "I should see \"#{text}\" within \".error\""  
end  
```

## Clear as mud?

Well hopefully that gives you a little insight into how to get going with using Cucumber to drive top-down 
development using acceptance testing. At least, this has been my experience with it so far. I'd be very 
interested to hear your feedback and some of the ways you've been successful with acceptance testing using 
Cucumber or any other framework for that matter.
