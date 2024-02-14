---
id: 37
title: 'Connecting two models in Ruby on Rails 3'
date: '2012-11-15T00:36:41+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=37'
permalink: /connecting-two-models-in-ruby-on-rails-3/
categories:
    - 'Code & Design'
---

\*Over the past month or so I have been teaching myself to program. I chose to learn Ruby as my first non-HTML or Javascript language, using Ruby on Rails for the framework. As part of my learning process, I wrote myself a tutorial covering a roadblock I encountered: connecting two models together. I had generated a scaffold for Tutorials and a scaffold for Categories and I wanted to intertwine the two so I could assign tutorials to categories. A few tutorials got me started, but I spent hours upon hours trying to get it to work. Finally, after talking with the super intelligent and awesome guys at [Big Wheel Brigade](http://bigwheelbrigade.com "Talented Ruby on Rails developers") and [Noah Clark](http://noahc.net) getting me started on this Rails path, I came to understand (sort of) how to approach this problem.

So here is the guide I now use when I want to connect two models (be it tutorials to categories, clients to projects, etc.). I am not a Rails expert at all; in fact I barely know anything about programming, but I’m learning as I go and making things actually work, so I encourage anyone smarter than me to critique this all they want. Just don’t make fun of my misunderstanding of Rails 🙂 Hopefully this helps some other beginners out there like me.

Another note: this tutorial assumes you have already created the Category and Tutorial models, views and controllers. I did so by [generating scaffolds.](http://viget.com/extend/rails-3-generators-scaffolding "Generating Scaffolds")\*

Let’s say we have a Category model and a Tutorial model and we want to be able to assign tutorials to categories. Sounds easy enough, right? Let’s get to work.

## 1. Create the relationships

Inside the category model, we’re going to put a HABTM relationship:

```
has_and_belongs_to_many :tutorials

```

Then inside the tutorial model, we’re going to do the exact same thing, replacing tutorials with categories:

```
has_and_belongs_to_many :categories

```

## 2. Create a table to link the two models together

Run the following in the command line to create a new table:

```
rails generate migration
add_categories_tutorials_table

```

This creates an empty migration.

## 3. Create the table in the migration file

Open up the migration file that was just created (found in the db –&gt; migrate folder). The generate command we ran created two empty methods, so we need to add some code to them to get this thing to work. In the ‘up’ method (starts out as ‘def up’), put the following:

```
create_table :categories_tutorials do |t|
    t.integer :category_id
    t.integer :tutorial_id
end

```

This will create the table with two fields: category\_id and tutorial\_id.

Next we have to “drop” that table. So in the ‘down’ method, put this:

```
drop_table :categories_tutorials

```

## 4. Migrate the database

Migrate the database now by running this in the command line:

```
rake db:migrate

```

If you get an error at this point when viewing your interface, you’ll probably have to drop the database altogether and migrate again. You can do that by running this in the command line:

```
rake db:drop
rake db:migrate

```

## 5. Modify the form

Now we need to be able to select with category a tutorial belongs to. So inside the tutorial’s form loop, we want to loop through the categories and add some checkboxes:

```
<% Category.all.each do |category| %>
    <div class="checkboxform">
        <%= check_box_tag "tutorial[category_ids][]", category.id %>
        <label><%= category.name %></label>
    </div>
<% end %>

```

After this, we need to go back into the tutorial model and add this attribute:

```
:category_ids

```

And in the category model add this attribute:

```
:tutorial_id

```

## 6. Mess with the controllers

Here comes the part where my brain is still a bit confused as to what the code actually means, but it works and that’s all I know!

So open up tutorials\_controller.rb and inside the ‘index’ and ‘show’ methods up top, add this:

```
@cats = Category.select("DISTINCT name, id")

```

Make sure you add it inside both methods.

Now do the same thing in categories\_controller.rb. Inside the ‘index’ and ‘show’ methods:

```
@cats = Category.select("DISTINCT name, id")

```

## 7. Insert into your views

At this point, you should be able to see a list of categories in your form. Hooray! If not, try restarting your server, migrating the database, or drop/migrate the database.

Once you can add tutorials with categories checked with no errors, it’s time to display them in your views. Let’s say we want to show which categories a tutorial belongs to. You would do something like this inside your ‘show.html.erb’ tutorial file:

```
<% @tutorial.categories.each do |category|%>
    Posted in: <strong><%= link_to category.name, category_path %></strong>
<% end %>

```

## 8. Write a tutorial, assign it to a category and have a beer to celebrate