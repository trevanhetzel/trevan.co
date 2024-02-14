---
id: 39
title: 'Connecting Models in Rails Part 2'
date: '2012-12-14T00:36:50+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=39'
permalink: /connecting-models-in-rails-part-2/
categories:
    - 'Code & Design'
---

Last month, I [wrote about](http://trevan.co/connecting-two-models-in-ruby-on-rails-3/ "Connecting models in Ruby on Rails") the process I discovered to link two models together in Ruby on Rails using a HABTM association. Well, I’ve since learned and am on to bigger and better things, like connecting three models together in one view. So this post will not only hopefully serve as learning material for some other rails n00b, but it’s also going to help me grasp this concept even more by writing about it.

So here’s what we’re going to be doing. We’re going to create a super basic app that allows you to add projects. Inside those projects, you’ll be able to add todo items. And then inside the todo items, you’ll be able to comment on them. So we’ll have projects -&gt; todos -&gt; comments, nested in that order. I’m going to first show you the code to achieve this structure and then go into it more depth and show *why it works*. Because remember, you shouldn’t ever [code by accident or coincidence](http://trevan.co/dont-code-by-accident/ "Don't code by accident").

## Here we go.

First things first. Create a new rails app and create the database. I’ll call mine projectapp.

```
rails new projectapp
cd projectapp
rake db:create
rails s

```

Next we’ll generate a quick and dirty scaffold to get our M’s, V’s and C’s in place for the projects.

```
rails generate scaffold Project title:string
rake db:migrate

```

Now you can add, edit, delete and view projects. Go ahead and add one!

We’ll do the same thing for the todos and comments now.

```
rails generate scaffold ProjectTodo title:string project_id:integer
rake db:migrate

rails generate scaffold ProjectTodoComment comment:string project_todo_id:integer
rake db:migrate

```

Notice how we created a project\_id column in the ProjectTodo database. This will allow us to “connect” with the project model and database. Same with the project\_todo\_id column; it will allow us to connect the comments with the todos.

## Model Associations

Now we have to create the model associations.

```
class Project < ActiveRecord::Base
  attr_accessible :title
  has_many :project_todos
end

class ProjectTodo < ActiveRecord::Base
  attr_accessible :project_id, :title
  belongs_to :project
  has_many :project_todo_comments
end

class ProjectTodoComment < ActiveRecord::Base
  attr_accessible :comment, :project_todo_id
  belongs_to :project_todo
end

```

## Throw a form for the todos on the project show page

With our model associations in place, we can add a form to add the todos. We’ll add this form right on the project show page like so:

```
<%= form_for @project_todo do |f| %>
  <%= f.hidden_field :project_id, :value => @project.id %>
  <strong><%= f.label :title, 'Todo' %>:</strong>
  <%= f.text_field :title %>
  <%= f.submit 'Add Todo' %>
<% end %>

```

Notice the hidden field with the value set to `@project.id`. This is essential, because it saves the todo to the database with the correct id of the project set.

You’ll get an error if you try reloading the page because we haven’t created any instance variables inside the controller that will act as our “gateway” for the view and controller. So to do that, we’ll add this single line to the ‘show’ method in projects\_controller.rb:

```
# Display the form to create a new todo
@project_todo = ProjectTodo.new

```

The `@project_todo` is an instance variable that allows you to have the ‘new’ form inside the show view (notice how we’re in the show method), because it’s equal to ProjectTodo.new.

At this point, you should be able to add todos to a project. Next we’re going to loop through those todos and actually display them underneath the form.

## Loop through the todos

To get the todos to show, we need to create a loop on the show page:

```
<% @project.project_todos.each do |todo| %>
  <%= todo.title %>
<% end %>

```

This will give us the list of all project\_todos associated with a project. Since we have declared in our models that a project\_todo belongs to a project, this is all we have to do to loop through them.

## Add a form for comments in the todo loop

Now we can nest a form inside the above loop to add comments to a todo. The first thing we’ll do is add the following line to the ProjectsController so we can display the form in our project show page.

```
# Display the form to create a new comment
@project_todo_comment = ProjectTodoComment.new

```

Now we can insert a form in show.html.erb and loop through the comments, inside our todo loop. So our todo loop becomes:

```
<% @project.project_todos.each do |todo| %>
  <p><%= todo.title %></p>

  <%= form_for(@project_todo_comment) do |f| %>
      <%= f.hidden_field :project_todo_id, :value => todo.id %>
      <%= f.text_area :comment %>
      <%= f.submit 'Add Comment' %>
  <% end %>

  <% todo.project_todo_comments.each do |comment| %>
      <%= comment.comment %>
  <% end %>

<% end %>

```

Now you can add and show comments to todos. Yay!

## Tidy things up

We’ve gotten through the fundamental functionality of adding todo items with comments to a project. Now you’d obviously want to tidy it up by styling your views, but I’ll leave that to you. What I will do though is show you how to redirect back to the project you were on when adding a todo. Right now, if you add a todo it takes you to that todo’s show page. In my case, I don’t really want that. So what I’d do is replace this line in the ProjectTodosController (inside the ‘create’ method):

```
format.html { redirect_to @project_todo, :notice => 'Project todo was successfully created.' }

```

with this:

```
format.html { redirect_to project_url(@project_todo.project_id), :notice => 'Project todo was successfully created.' }

```

You can do the same in the `ProjectTodoCommentsController` too:

```
format.html { redirect_to project_url(@project_todo_comment.project_id), :notice => 'Project todo comment was successfully created.' }

```

## Conclusion

While this may or may not be the best way to approach a situation like this, I know that it works. I’m no Ruby or Rails expert, but I’ve done enough research and through trial/error I’ve found the above method to be the best way so far to accomplish what I was after. Super awesome Ruby devs: feel free to leave a comment if you can accomplish this easier or by a different means.