+++
date = "2016-03-06T11:34:43-05:00"
title = "Testing a Rails Api"
draft = false
tags = ["rails", "api", "testing", "minitest"]

+++

This post comes from my recent experience in testing and evolving a fairly large Rails API (it powers three Ember apps, a build automation server, and a mobile app). I don't pretend to be a testing expert, but the practices below have helped me reduce and prevent bugs, speed up development, and ensure changes don't break existing behavior.

### This post assumes you know:

* The value of testing :)
* Basic CRUD actions in a Rails API
* How to test with [minitest](https://github.com/seattlerb/minitest) (aka [Rails minitest](https://github.com/blowmage/minitest-rails))
* [ActiveModelSerializer](https://github.com/rails-api/active_model_serializers)

The sample Rails project I used to write this post is [on github](https://github.com/johnmosesman/blog/tree/master/rails_api_testing/api_testing) if you'd like to look at it.

Let's begin!

## Model

The first model test I like to start out with (model here being an `ActiveRecord` model) is a validation test. I want to know that my fixture is valid, and that creating a brand new object is not:

```
# test/models/post_test.rb
class PostTest < ActiveSupport::TestCase
  def test_valid
    assert posts(:one).valid?
    refute Post.new.valid?
  end
end
```

I then also test all non-private methods:

```
# test/models/post_test.rb
class PostTest < ActiveSupport::TestCase
  def test_valid
      ...
  end

  def test_some_method
    assert_equal 'something', posts(:one).some_method
    assert_equal 'something else', posts(:two).some_method
  end
end
```

## Controllers

### Responses and content types

Controller testing is where it starts to get interesting. At a high-level, we want to know that the call succeeded. So, we can test the `response` and test that we're sending the correct content type (JSON).

```
# test/controllers/api/posts_controller_test.rb
class Api::PostsControllerTest < ActionController::TestCase
  def test_index
    get :index, { user_id: users(:one).id }

    assert_response :success
    assert_equal Mime::JSON, response.content_type
  end
```

The above is more of a sanity check than a thorough test, but it will help catch dumb errors like incorrect syntax.

### Asserting change (or no change)

#### Create
In the case of an action that changes the data (or should not change the data), we can use `assert_difference` or `assert_no_difference`:

```
# test/controllers/api/posts_controller_test.rb
class Api::PostsControllerTest < ActionController::TestCase
  def test_index
    ...
  end

  def test_create
    assert_difference "Post.count" do
      post :create, { post: { body: 'some body', author: 'some author', user_id: users(:one).id } }
    end

    assert_response :success
    assert_equal Mime::JSON, response.content_type
  end

  def test_create_with_invalid_parameters
    assert_no_difference "Post.count" do
      post :create, { post: { body: nil, author: nil, user_id: nil } }
    end

    assert_response :unprocessable_entity
    assert_equal Mime::JSON, response.content_type
  end
```

#### Update

In an `update` action, I like to check that the fields actually changed. This has caught bugs where I've added a new field to the model, but forgot to update the white-listed parameters, so the field never actually gets updated.

```
# test/controllers/api/posts_controller_test.rb
class Api::PostsControllerTest < ActionController::TestCase
  ...

  def test_update
    the_post = posts(:one)

    assert_no_difference "Post.count" do
      put :update, { id: the_post.id, post: { body: 'new body', author: 'new author', user_id: 5 } }
    end

    assert_response :success
    assert_equal Mime::JSON, response.content_type

    the_post.reload
    assert_equal 'new body', the_post.body
    assert_equal 'new author', the_post.author
    assert_equal 5, the_post.user_id
  end

  def test_update_with_invalid_paramters
    the_post = posts(:one)

    assert_no_difference "Post.count" do
      put :update, { id: the_post.id, post: { body: nil, author: nil, user_id: nil } }
    end

    assert_response :unprocessable_entity
    assert_equal Mime::JSON, response.content_type
  end
end
```



### Serializers

The final basic test I like to do is to setup a contract of sorts around what fields are being sent back in the serializer. This helps prevent breaking the frontend by removing/renaming fields. I treat this test like a basic model test:

```
# test/serializers/post_serializer_test.rb
class PostsSerializerTest < ActiveSupport::TestCase
  def test_fields
    serializer = Api::PostsSerializer.new(posts(:one))

    fields = [:id, :body, :author, :user_id]
    assert_equal fields, serializer.attributes.keys
  end
end
```


## Testing the data returned

While the tests above are definitely useful, I think they are missing something—especially in the `index` example above. We don't know what was actually sent to the client. Yes the call succeeded, but did we send the right data? Did we send any data at all? Basic tests like these don't instill confidence in me that our business logic is correct.

In the case of the `index` action, we have a couple of options here:

1. Parse the controller return and test the result
2. Move logic into model methods and test those

### Parsing the response

Let's revisit the `index` test we have above. In this action we're returning all of the posts that belong to a user. By parsing the `response.body` and testing its data, we have more confidence that the data we're returning is actually correct—that the post actually belongs to the user. While I think this is not an amazing solution, it does up our level of confidence in the code:

```
# test/controllers/api/posts_controller_test.rb
class Api::PostsControllerTest < ActionController::TestCase
  def test_index
    get :index, { user_id: users(:one).id }

    assert_response :success
    assert_equal Mime::JSON, response.content_type

    # Compare what the controller returned to the posts user one has.
    json = JSON.parse(response.body)
    post_json = json["posts"].first

    the_post = posts(:one)
    assert_equal the_post.id, post_json["id"]
    assert_equal the_post.body, post_json["body"]
    assert_equal the_post.author, post_json["author"]
  end
end
```

I have used this type of test in places where I wasn't using `ActiveModelSerializer` (read: _legacy code_), and in the past it has been a hint that the code is poorly structured—too much logic in the controller, or logic inside of the view ([jbuilder](https://github.com/rails/jbuilder) or AMS). But, sometimes this type of testing is better than nothing.

### Fat Models Skinny Controllers™

Parsing the response body can be cumbersome. Usually you end up having to iterate over the JSON data because you've lost the ActiveRecord niceities like querying and finding.

The approach I tend to take now is to move logic into the model, and write a model test. This simplifies the controller, but trusts that the controller is doing the simple job of requesting and returning the data. There is an element of risk here. You could `render json: nil` accidentally and forget to return the objects, but in my experience this hasn't been an issue.

So, instead of querying the posts like this and parsing the response in the controller test to make sure we got the correct posts:

`@posts = Post.where(user_id: params[:user_id])`

We can do something like (again, trivial example but it shows the point):

`@posts = Post.for_user(params[:user_id])`

Moving the logic into the `for_user` method and out of the controller moves the burden of testing from the controller onto the model (which is much easier to test, and the new method has the possibility of re-use in the future).

Then the tests look like this:

```
# test/controllers/api/posts_controller_test.rb
class Api::PostsControllerTest < ActionController::TestCase
  def test_index
    get :index, { user_id: users(:one).id }

    assert_response :success
    assert assigns(:posts)      # Threw this in for fun
    assert_equal Mime::JSON, response.content_type
  end
end

# test/models/post_test.rb
class PostTest < ActiveSupport::TestCase
  def test_valid
    ...
  end

  def test_for_user
    assert_equal [posts(:one)], Post.for_user(users(:one).id)
    assert_equal [posts(:two)], Post.for_user(users(:two).id)
  end
end
```

### Final thoughts

Even though the Rails world is "convention over configuration", there's still a lot of debate over what the proper convention is. These are just my experiences, and I hope something here helps you in your specific circumstance or project.

Either way I'd love to hear thoughts or comments around this. Feel free to email me at <johnmosesman@gmail.com> or hit me up on twitter, [@johnmosesman](https://twitter.com/johnmosesman).
