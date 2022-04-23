+++
date = "2016-10-27T11:45:54-05:00"
title = "Things I Wish I Knew When I Started Rails Part 2"
draft = false

+++

This is the second and final part in the things-i-wish-i-knew when I started doing Rails series. If you missed Part 1, you can [read it here.](http://johnmosesman.com/things-i-wish-i-knew-when-i-started-debugging-rails/)

Part 1 was focused solely on ways to debug problems in your app, but Part 2 is more of a grab-bag of tips and tricks I've found useful over the years or things I've seen newer developers struggle with: developing emails, keeping git and their database straight, and using alises for fun and efficiency. Let's begin!

## Emails are fun?

Chances are your app sends some kind email. Emails are great, but they can be a pain to develop and test. Especially when developing locally, having to continually fire off emails to test them is no good. Two quick tips to making email development not so painful:

### The `mailcatcher` gem

An easy way to see all of the emails going out from your system in development is to use the [MailCatcher gem](https://mailcatcher.me/). Installation and usage is easy:

```
$ gem install mailcatcher
$ mailcatcher
Go to http://localhost:1080/
Send mail through smtp://localhost:1025
```

If you configue your `development.rb` to send to the above address,

```
# config/environments/development.rb
config.action_mailer.delivery_method = :smtp
config.action_mailer.default_url_options = { :host => 'localhost:3000' }
config.action_mailer.smtp_settings = { :address => "localhost", :port => 1025 }
```

You can see all of the emails sent in development at `http://localhost:1080`!

![mailcatcher](https://raw.githubusercontent.com/johnmosesman/blog/master/things_i_wish_i_knew/mailcatcher.png)

### Email previews

Sometimes you just want to see that an email actually got sent or you just need to click a password reset link inside of one, and MailCatcher is great for that. But if you're wanting to iterate quickly on the design and layout of an email without having to run the code to keep sending them, mailer previews are your friend.

![user mailer preview](https://raw.githubusercontent.com/johnmosesman/blog/master/things_i_wish_i_knew/user_mailer_preview_2.png)

[Mailer Previews](http://guides.rubyonrails.org/action_mailer_basics.html#previewing-emails) landed in Rails 4.1, and they allow for an easy way to see mailer views, change the code, and
hit refresh to see it re-render. A must have for any extensive mailer building.

![password reset email](https://raw.githubusercontent.com/johnmosesman/blog/master/things_i_wish_i_knew/password_reset_email_cropped.png)

## Git and the database

Ah git, a terrible and necessary evil. Through some stumbling we learn how to keep the code on one branch separate from another, and then how to merge them together at the right time.

One thing that I've seen trip people up is that _your database state exists outside of git._

The pattern usually plays out like this:

> _"We need to store the user's age."_

Cool, so you make a new branch `add-age-to-user` and:

1. Generate a migration for an `age` field on `User` and pipe it through the app.
2. Run said migration and commit the code.
3. All is good.

![add age](https://raw.githubusercontent.com/johnmosesman/blog/master/things_i_wish_i_knew/add_age.png)

> _"Also, we forgot to add their email. Users need an email."_

Ok, so you make a new branch `add-email-to-user` and do the same thing:

1. Generate a migration for `email` field on `User`, and pipe that through the app.
2. Run migration and go to commit.

At this point the question is usually something like, _"Why does my schema keep changing??"_

![add email](https://raw.githubusercontent.com/johnmosesman/blog/master/things_i_wish_i_knew/extra_field_annotated.png)

### How to fix it

At this point I think it may be obvious that your database structure doesn't change when you change git branches, but it's something that I've seen bite a lot of people (including me), and hopefully the response isn't just, "Bleh I'll just commit it anyways."

There's a couple things I do in this situation, some of which could be great and some of which are not practical depending on the scenario:

1\. Ignore and avoid committing the extra schema lines (in the scenario above, don't let `age` or it's migration timestamp get committed).

This works as long as your code doesn't need something that was changed in the migration (like a dropped column that your code still references). I use the free git GUI tool [GitX](http://gitx.frim.nl/) frequently (shown above), and it allows you to easily commit or discard changes to certain lines in a file.

2\. Rollback the change on the other branch

Again this might not always be a good option, especially since rolling back will change the data, but if you're not going to return to that branch in a while, it could be worth not having to deal with avoiding committing the lines like in #1.

I wouldn't say these are amazing solutions, but they are better than incorrectly changing the schema. :) I'd love to know if anyone else has a solution they like to this problem!

## Aliases

In the course of your development you're going to type a certain set of commands repeatedly. At least for me, typing the same thing over and over again gets very annoying. Also, over the lifetime of your software development journey, saving a few seconds here and there will actually add up to significant amount of time saved. And, it will also be less wear and tear on your hands (anyone who has dealt with carpal tunnel or similar knows it can be a serious problem for devs).

One way to avoid typing more than you need to is to setup aliases for commonly-used commands. For example, instead of typing `git status` or `git commit -m` dozens of times a day, I have an alias for those two (`gs` and `gm`, respectively) in my shell config file (I use bash, so this file is `.bashrc`).

Aliases are amazing, and I have dozens of them. Here's a couple of my favorites:

```
# .bashrc
alias rdm="bundle exec rake db:migrate"
alias rdr="bundle exec rake db:rollback"
alias prodc="heroku run rails c -r production"
```

I also have a few that are things that I either can't seem to type correctly or forget what the alias is:

```
# Always forget if it's prodlog or prodlog(s) so why not both.zoidberg?
alias prodlog="heroku logs --tail -r production"
alias prodlogs="heroku logs --tail -r production"

# I can NEVER type this correctly
alias rbnev="rbenv"
```

(Side-note: it's probably not a good idea to alias destructive commands. You wouldn't want a mistype or typing quickly without thinking to dump your production database or something.)

If you want to view the aliases I have setup or all of my dotfiles in general, they're [on github](https://github.com/johnmosesman/dotfiles/blob/master/bashrc).

## Conclusion

This wraps up the things-i-wish-i-knew series. If you missed Part 1, you can [read it here.](http://johnmosesman.com/things-i-wish-i-knew-when-i-started-debugging-rails/) I hope through these two posts there is something that will help you along your dev journey!

If you have a favorite tip that I didn't talk about, I'd love to know! [Email me](mailto:johnmosesman@gmail.com?subject=Favorite dev tip) or reach out on [twitter.](https://twitter.com/johnmosesman)

Thanks for reading!

John
