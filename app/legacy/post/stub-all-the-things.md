+++
date = "2016-03-13T11:36:41-05:00"
title = "Stub All The Things"
draft = false

+++

Continuing with the testing theme, one very sharp tool in your testing toolbox is stubbing. Good stubbing allows you to test one specific piece of your code while easing the pain of setup and state configuration.

The three places I've used this the most are:

1. External calls
2. Logic outside of the current context
3. Tricky setup / state configuration

### Assumes you know:

* Basics of testing Rails apps
* The concept of stubbing
* How to use the [mocha](https://github.com/freerange/mocha) gem

Leggo!

## Stubbing external calls

Stubbing external calls is a great idea for a couple reasons:

1. HTTP requests are slow and will slow down your test suite considerably.
2. Some services don't have test environments, so you may end up burning through your allotted bandwidth or creating bad data.

[Bitly](https://bitly.com/) is a service a lot of companies use, and is our first example. Say you have a class that just takes in a URL, sends it to Bitly to shorten it, and returns the shortened URL:


```
# app/services/bitly_service.rb
class BitlyService
  def self.shorten_url(url)
    return Bitly.shorten(url)
  end
end
```

We don't want to actually send a call to Bitly every time we run our tests. So, we can stub the Bitly return:

```
# test/services/bitly_service_test.rb
require 'test_helper'

class BitlyServiceTest < ActiveSupport::TestCase
  def test_shorten_url
    Bitly.stubs(:shorten).returns("bit.ly/something")
    assert_match /bit.ly/, BitlyService.shorten_url("some_url")
  end
end
```

This test is sort of trivial due to the simplicity of the method, but it does speed up our tests and would allow us to test any other logic in that method (if for example we added a `return if url.blank?` to the beginning).

I know this works because in my sample project for this post I didn't even have to include the Bitly gem. I just needed a blank class to resolve the reference to the class:

```
# models/bitly.rb
class Bitly
end
```

## Stubbing logic outside of the current context

Switching examples, let's say we have an `ActiveRecord` class called `Classroom`, and a classroom `has_many :students`. Let's also assume we want a method that returns the name of the best student in a class:

```
# models/classroom.rb
class Classroom < ActiveRecord::Base
  has_many :students

  def best_student_name
    student = Student.best_student_in_class(self)
    student.name if student.present?
  end
end
```

Without stubbing, we would need to setup our fixtures in a way that we know which student was going to be returned as the "best" one. In some cases that may not be very hard, but let's say the "best" student is a combination of the highest grades, best attendance, most class participation, etc. In other words, more logic than we would want to set up and maintain through fixtures.

To keep this test focused on what the `Classroom` object does with the _result_ of the `best_student_in_class` method and not _how_ that method works, we can look at what we're expecting to get back, and stub the return as that. From the example above, we expect to get a `Student` object back with a property or method of `name`.

Using mocha, we can stub the return of this method as an object that also stubs the method `name`:

`Student.stubs(:best_student_in_class).returns(stub(name: "jimmy"))`

We can also use the `with()` keyword to tie specific arguments to specific results. This allows us to test the filled classroom and the empty classroom case:

```
# test/models/classroom_test.rb
class ClassroomTest < ActiveSupport::TestCase
  def test_best_student
    populated_classroom = classrooms(:one)
    empty_classroom = classrooms(:two)

    Student.stubs(:best_student_in_class).with(populated_classroom).returns(stub(name: "jimmy"))
    Student.stubs(:best_student_in_class).with(empty_classroom).returns(nil)

    assert_equal "jimmy", populated_classroom.best_student_name
    assert_equal nil, empty_classroom.best_student_name
  end
end
```

(It's neat that this works and my `Student` class is empty. :))

## Stubbing tricky setups

Next, let's say we want to make a `size` method on `Classroom` that returns small, medium, or large based on the number of students in the classroom:

```
# models/classroom.rb
class Classroom < ActiveRecord::Base
  has_many :students

  ...

  def size
    number_of_students = self.students.count

    case number_of_students
    when 0..25
      "small"
    when 26..50
      "medium"
    else
      "large"
    end
  end
end
```

The method is simple enough: based on the number of students, return a string.

Testing this for the small case is easy. Make a classroom fixture, a student fixture, and call the method: `assert_equal "small", classrooms(one).size`.

Now for the medium/large case. Some options:

1. Don't test it (bad)
2. Use a junior dev to create 50 fixtures (fixture bloat and poor use of time)
3. Create 50 objects in the test (slow and against best practices)
4. Sweet sweet stubbing. (aw yisss)

Similar to the example above where we stubbed a student, and further stubbed a property on the student (`name`), we can stub the `students` association and the `count` method:

```
# test/models/classroom_test.rb
class ClassroomTest < ActiveSupport::TestCase
  def test_size
    classroom = classrooms(:one)

    classroom.stubs(:students).returns([1, 2])
    assert_equal "small", classroom.size

    classroom.stubs(:students).returns(stub(count: 40))
    assert_equal "medium", classroom.size

    classroom.stubs(:students).returns(stub(count: 100))
    assert_equal "large", classroom.size
  end
end
```

Easy enough!

### Bonus: `any_instance`

In the examples above, we stubbed the method right onto our fixture and called a method on that object later in the test. But sometimes you may not have access to the actual object you want to stub. It might be created or referenced in the middle of the test and done away with afterwards.

In those cases, `mocha` comes with a handy method called `any_instance`. Just as it sounds, any object created of that type will have the various stubbings applied to them.

Example: `Student.any_instance.stubs(:name).returns("bill")`. With that line, all students will be named `bill`.

From my personal experience, tons of`any_instance` use is a code smell. This might mean that the code is not structured well. If it's difficult to test individual concerns, then it's a possibility that the code is all one mangled mess. Again not always, but sometimes.

## Conclusion

As always you can find me at <johnmosesman@gmail.com> or [@johnmosesman](https://twitter.com/johnmosesman).


