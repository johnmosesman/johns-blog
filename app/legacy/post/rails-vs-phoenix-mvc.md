+++
date = "2016-09-06T11:40:23-05:00"
title = "Rails vs Phoenix MVC"
draft = false

+++

As I was beginning to read and learn about the [Elixir](http://elixir-lang.org/)/[Phoenix](http://www.phoenixframework.org/) world, I stumbled across [this talk](https://www.youtube.com/watch?v=3LiLjVCDEpU) at the Elixir Warsaw Meetup by José Valim, the creator of Elixir.

In this talk he's giving a high-level overview about the benefits of using Phoenix: the productivity benefits we're accustomed to from Rails, and the performance of the underlying Erlang runtime.

While I was watching it, there was a slide where he talked about Phoenix's MVC pattern, and he showed this image (at [26:05](https://youtu.be/3LiLjVCDEpU?t=26m5s)):

<img src="https://raw.githubusercontent.com/johnmosesman/blog/master/elixir_separation_concerns/phoenix_mvc.png" width="400" height="400">

I noticed that the controller was the center point of the image. The controller would reach out to the "leaf" nodes—none of the leaf nodes are connected.

The typical MVC diagram I'm used to seeing is more of a triangle. It usually looks something like this:

<img src="https://raw.githubusercontent.com/johnmosesman/blog/master/elixir_separation_concerns/classic_mvc.png" alt="https://stackoverflow.com/questions/6873469/delphi-7-trying-to-understand-the-mvc-pattern" width="400" height="400">

Here the nodes are all interconnected.

When José was talking about the first image above he said this:

> "Functional programmers like to split side-effects—things that change the world around you...side-effects is where the complexity in our applications exist."

When he said this, it made me think of many of the Rails apps I've encountered. Usually they look something like this:

```
class SomeController < ApplicationController
  def blah
    @model = ...
    @model.perform_side_effects
    render ...
  end
end

class Model < ActiveRecord::Base
  def perform_side_effects
    self.some_association.perform_side_effects
  end
end

class SomeAssociation < ActiveRecord::Base
  def perform_side_effects
    do_the_actual_work
  end

  private
    def do_the_actual_work
      update_attributes(...)
    end
end
```

In the controller action we find the model, and then call a model method to do the work (after all, you do practice _Fat Models Skinny Controllers™_ don't you??).

That model method calls another method, which calls another method, which calls a private method that finally does the "side-effect." Sometimes, the method calls can nest three or four times deep (especially as the app grows in size).

## Read- and Maintain-ability

Arguably the most difficult part of software is reading (and understanding) someone else's code, and then being able to maintain that code effectively.


I'm starting to think that the Phoenix pattern would be an excellent thing to bring into my Rails apps. If only the controllers produced side-effects, it would be very easy to read through the controller action and _see what is actually going to change._

If all change happens in controllers, the Rails models would become more like a functional programming language's modules—independent functions that transform data without persisting side-effects. That sounds easier to use, compose, and test.

While I'm sure I'm not the first person to think this, it is something I'm going to implement moving forward—whether I'm in Rails or Phoenix land.
