+++
date = "2016-11-02T11:47:40-05:00"
title = "Querying Postgres JSON columns With ActiveRecord"
draft = false
tags = ["rails", "ruby", "postgres"]

+++

If you've been following me on Twitter recently, you might have noticed that I have been singing the praises of Postgres' support for JSON columns. They make things that I initially thought would be complicated so so easy (and fun!).

In this post we'll look at how easy it is to query JSON columns in conjunction with ActiveRecord. We're assuming you are using Postgres 9.3+, which has [excellent function support](https://www.postgresql.org/docs/9.6/static/functions-json.html) for JSON columns.

Let's begin!

## JSON vs JSONB

Postgres supports two different types of JSON columns: `json` and `jsonb`. There are some slight differences in how the columns store the data (regarding things like how it treats whitespace), but here is a description from the [Postgres docs themselves:](https://www.postgresql.org/docs/9.4/static/datatype-json.html)

> "The json data type stores an exact copy of the input text, which processing functions must reparse on each execution; while jsonb data is stored in a decomposed binary format that makes it slightly slower to input due to added conversion overhead, but significantly faster to process, since no reparsing is needed. jsonb also supports indexing, which can be a significant advantage."

My tl;dr from that paragraph is `json` is faster at writing, but `jsonb` is faster at reading ("significantly"—according to the docs). As a general rule your app will read more often than it writes. Also, users tend not to notice if posting their photo takes a little bit longer, but they will _definitely_ notice a slow loading feed—so the majority of the time I tend to use `jsonb` over `json` to get that fast-read bonus.

Working with either type programatically is practically the same, so choose whichever type makes sense for your situation.

## Modeling Data From External Sources

One of the most useful cases I've found for using JSON columns is for storing extra metadata from an external service—like if your app auths users with Github or Instagram.

Take for example the data returned for an Instagram photo. Here's the data result for a photo I made on a test Instagram account:

```
{"id"=>"1266746625732819233_000000000",
 "link"=>"https://www.instagram.com/p/some_url/",
 "tags"=>["test"],
 "type"=>"image",
 "user"=>
  {"id"=>"11234564039",
   "username"=>"johnstest",
   "full_name"=>"Johns Test",
   "profile_picture"=>
    "http://scontent.cdninstagram.com/t51.2885-19/1266746625732819233_000000000_a.jpg"},
 "likes"=>{"count"=>0},
 "filter"=>"Normal",
 "images"=>
  {"thumbnail"=>
    {"url"=>
      "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/1266746625732819233_000000000_n.jpg",
     "width"=>150,
     "height"=>150},
   "low_resolution"=>
    {"url"=>
      "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/1266746625732819233_000000000_n.jpg",
     "width"=>320,
     "height"=>320},
   "standard_resolution"=>
    {"url"=>
  ...
}
```

That's a lot of data. You could just pick out the pieces you want, but especially in the beginning of building an app, you probably don't know what data you will want in the future, and the idea of making several associated models for each photo's comments, likes, users that commented, etc., doesn't sound like a fun option either.

In cases like this I like to just shove all of that data into a JSONB column—and the reason that works so well is Postgres has _excellent_ querying functions for JSON columns.

## Querying it

Let's say we're building an app that displays a user's Instagram photos in a fancy way. Say our data modeling looks something like this:

```
photos:
 - id      (integer)
 - data    (jsonb)
```

Let's use this as the example of what `data` contains:

```
{
  "id"=>"1266746625732819233_00000000000",
  "tags"=>["hashtag1", "hashtag2"],
  "filter"=>"Normal",
  ...
}
```

### Find all photos with the "Normal" filter

What if we wanted to display the most boring photos a person has? Let's find all photos whose `data` column has a `filter` attribute of "Normal." We can use the `->>` operator to query the field as text:

```
Photo.where("data->>'filter' = 'Normal'")
```

### Find all photos with more than one hashtag

_#best #photo #ever #letsfindit._

[Pulling from the docs again](https://www.postgresql.org/docs/9.6/static/functions-json.html), we can use the `jsonb_array_length()` function to see how many objects are in the array:

```
Photo.where("jsonb_array_length(data->'tags') > 1")
```

#### Object vs text

One important note here, in the first example we used `->>` to query the `filter` attribute of `data`. The `->>` operator returns text as its result. If we use that same operator in the example above, we get this error:

```
PG::UndefinedFunction: ERROR:  function jsonb_array_length(text) does not exist
```

Postgres is telling us it doesn't know how to find the length of a `text` object.

Instead, we use the `->` operator which returns the result as a JSON object so the `jsonb_array_length ` function can do its length calculation. (See [Table 9-42](https://www.postgresql.org/docs/9.6/static/functions-json.html) for more details.)

The `->` operator allows you to continue to nest attributes until you get to what you want. For example, if your `data` column looked like this:

```
{
  "images"=>
    {"thumbnail"=>
      {"url"=>"http://some_url.com"},
      ...
}
```

You could query against the nested `url` attribute like so:

```
Photo.where("data->'images'->'thumbnail'->>'url' = 'http://some_url.com'").first
```

We use the `->` operator to keep returning objects until we reach the final attribute where it's ok to use `->>` to return as text.

### Find all photos with a specific hashtag

Finding a specific hashtag ("pizza") is just as easy, we just need a different query function: the `?` operator. The docs for `?` say, "Does the string exist as a top-level key within the JSON value?"—or "does the array have this value?"

```
Photo.where("data->'tags' ? :value", value: "pizza")
```

(Side-note: You might be used to using the `?` as a placeholder for queries: `Photo.where("created_at > ?", 1.week.ago)`. In the example above having two `?`'s is ambiguous, so we switch to a named parameter, `:value`.)

## JSON columns play well with others (i.e., ActiveRecord)

We only used `where` clause examples above, but JSON columns are just as flexible as any other database column—you can join against them, group by them, and anything else you can think of!

Just for the sake of trying to make a complicated example, let's say you wanted the following:

```
Find 10 users,
who have at least five photos each,
where each photo has at least one comment,
most recent photos first.
```

That could look something like this:

```
Photo
  -- Has at least one comment
  .where("(data->'comments'->>'count')::int > 0")

  -- User has at least five photos
  .group("data->'user'->>'id', data->'created_time'")
  .having("COUNT(id) > 5")

  -- Most recent photos first
  .order("data->'created_time' DESC")

  .select("data->'user'->>'id'")
  .limit(10)
```

Easy enough right?

(Side-note: notice in the where clause we casted the text output of `->>` into an `int` with `::int` to do the comparison.)

## Conclusion

There you have it. Postgres' amazing JSON column support makes that data blob feel like any other plain old database column. There are many more functions we didn't cover, so I encourage you to read through the [docs page](https://www.postgresql.org/docs/9.6/static/functions-json.html).

Thanks for reading!

John
