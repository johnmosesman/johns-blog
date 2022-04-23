+++
draft = false
date = "2019-07-02T10:01:04-05:00"
title = "Your first projects as a new developer"
tags = ["career"]
+++

In my opinion, building small side projects is one of the best career practices you can implement.

Especially when you're just starting out, these projects give you the experience you need to transition from things you _say you know_ to things you can _show you did._ Even eight years into my career I still learn a tremendous amount from working on little things on the side.

## Lower your perceived risk

As a new developer looking for their first job, the number one factor a company is assessing when trying to hire you is this:

> "Will this person work out, or are we going to waste time and resources training them?"

That's not a judgment against you as a person, but a risk analysis the company is trying to weigh.

An experienced developer should get up to speed fairly quickly and begin contributing value to the company. A newer developer obviously can't do that, and they will require more investment for the company to see a return. The company knows that a new or "green" developer will require a lot of on the job training and help&mdash;and that's ok&mdash;that is what it means to be new after all.

Your goal here is not to come in knowing all of the answers and be ready to contribute on the level of a seasoned developer, but to __demonstrate to the company that you do in fact know some things__, you're motivated, and you learn quickly. This helps alleviate their worries that you won't be able to hang with them.

This is why side projects are so great. A list of side projects shows a potential employer that you don't just have head knowledge&mdash;you can actually do something, and _you can show it._

Are you a pro already? No. Can you handle anything thrown at you? Of course not, but it _does_ set you apart from other people _who also have no job experience, and have nothing to show._

A list of side projects show you have a foundation and baseline of knowledge and experience to build upon, and all of this translates to the company as lower risk.

So with that in mind, what types of projects should we focus on?

# CRUD apps

A CRUD app is both a descriptor of the type and quality (pun) of the first apps you should make.

If you're not familiar, _CRUD_ stands for: _Create, Read, Update, and Destroy._ These are the basic actions 90% of the programs in the world perform, and that's why it's so important.

Even today, I primarily work on building CRUD apps. Sure they're a little more complex and have more edge cases than in my early days, but at their core they're still CRUD apps.

This is because at the root of all technology is __data storage and data transfer.__ Even though the presentation and user interfaces for our applications get more sophisticated over time, at their core they're all really doing the same thing: creating new data, retrieving (or reading) data, updating data, and destroying (or deleting) data.

Take your twitter feed for example. You can make a new tweet (create). You can see a list of other people's tweets (read)&mdash;_well ok maybe Twitter is a bad example since you can't update a tweet (twitter pls)_&mdash;but you can update your profile, and you can delete a tweet. There's a lot of stuff that makes Twitter work&mdash;from the website and app interface to the algorithm that shows you your timeline in a dumb order&mdash;but in the end it's a CRUD machine.

## Make some CRUD

![Users CRUD](/images/users_crud.png)

So making CRUD apps is your first task. Pick something silly or stupid. Make a little app that keeps track of your pets' info. Make an app that ranks your favorite video games with commentary&mdash;it really doesn't matter. Pick something simple, small, completable, and ideally fun or interesting for you to help with your motivation. Can you list all of your pets? Great. Can you add new pets? Cool. Update and delete them? Awesome, you have a CRUD app!

To do this you'll probably need (or want) to use a framework around a programming language you like. So if you're learning Javascript, you may need to learn React. If you chose Ruby, you'd probably pick Rails. [Like I mentioned in my last post]({{< ref "how-to-pick-a-programming-language.md" >}}), it really doesn't matter what technology or framework you use, just pick one and build an app with it.

If you've talked to a recruiter and have a particular type of job in mind, find out what technology they use at that job, and try to use that. Regardless, just pick something you can build your app in.

## Dress up your CRUD

Once you've got a functioning CRUD app, start to spruce it up a bit. This is where you'll continue to further your learning by pressing into new and unknown areas. Take your existing work and expand on it a bit.

For example, once you build your app, add a way for users to sign up, log in, and have their own accounts. Now instead of just creating a list of your pets with their own info, _each user_ will have their own list of pets. It's a simple concept, but it will mean learning how to manage authentication and scope data and interactions to a particular user. If you're working with a backend technology, send the user an email when they signup.

You see, these may seem like dumb and pointless tasks, but you're practicing the very skills you'll need on the job. You may be building a simplified version of these things right now, but every programmer has and will add authentication and email-sending at some point in their careers&mdash;multiple times. By doing these things you're proving to a future employer: __I know how to do these things. Here's the app I made. I can show you.__

From the interviewer's perspective, it is easier to believe:

> "This person can do A, B, and C, and so I believe we can teach them X, Y, Z".

As opposed to:

> "This person has no experience. Should we give them a shot?"

Even if a pet tracker app sounds silly, there's still tremendous value in making it. You will learn a ton from it, and in the end, it's a real and tangible thing that exists on the internet.

Here's a few ideas for some extra challenges you can take on to stretch your knowledge past the basics:

* Authentication - let users create accounts and log in
* Account management - allow users to update their profile and reset their password resets
* Emails - send an email on key actions (a welcome on sign up or a link to reset their password)
* Data validation - ensure a user has a valid email and that the email is unique across the system

## Don't practice the stuff you know

I want to take a second to describe a mistake I often see new programmers make, and I have often made this same mistake myself.

A little backstory: growing up, I took classical piano lessons for about nine years. Over the years I would get different piano pieces to learn, and I would always do the same thing: practice the piece starting at the beginning and work towards the end.

Over time I could perform the first half of the piece quite well, but since I always started at the beginning, the majority of my practice would be on the first half, and not as much on the things that followed it.

The result was I would know the first half of the piece, and I could play it fast and it sounded like a real piano piece. It was fun to play the first half&mdash;I felt like a real piano player. So I would play the first half of the piece _over and over_, and then when I got to the middle part, I would slow waaaaay down and start to pick it out note by note.

You see, I didn't like pressing through the messy, awkward, tedious part of the piece I didn't know. It was much more fun to play the parts I __did__ know&mdash;those parts sounded good and were easier to play&mdash;I already knew them.

I see the same mistake made among new programmers. It's much easier to stay in your comfort zone with the things you already know. It's safe and comfortable there. Like I mentioned in the previous post, sometimes new programmers will stick to practicing HTML and CSS over and over and over. Yes those are valuable skills, but they're not enough.

__Especially when you're just starting out, you _have_ to keep pressing forward.__

### Are you learning something new every day?

A good metric to know if you're learning is if you find yourself confused or frustrated every day. It _is_ confusing and frustrating to learn new things&mdash;especially when you're just starting out&mdash;but that means _you're learning._ Of course we don't want to be _so_ confused and frustrated beyond our means to understand it, but if you just practice the same CRUD app over and over and over, at some point you're no longer growing, and you're just practicing the first half of the song on repeat. No one wants to hear half a song performed really well.

So practice, yes, and continue to hone your skills, but __press forward into the unknown.__

The tech world is constantly evolving. Technology changes. Best practices change. You must always be learning and adapting. There's no finish line; it's a constant journey.

### If it's boring, you probably know it.

I think one of the best ways to know when you _really_ know something is when it gets boring. Once you stop being challenged, the boredom will set in. It will feel more like busy work rather than interesting, mentally-stimulating work. At that point, you probably know it, and it's time to move onto something that will continue to grow you.

### Live on the edge

One final word, but I don't think you have to make crazy or erratic moves to keep learning. If you think of your knowledge and experience as a bubble that slowly expands outward, everything on the edge of the bubble is something new and unfamiliar that will cause you to grow.

You don't have to jump from basic CRUD apps to a distributed-blockchain-machine-learning robots&mdash;just push on the edge of what you know. Add user logins. Send some emails&mdash;try using a background worker.

Just press a little bit forward each day. It's cliché, but it really is a journey of a thousand footsteps.

If you feel like you've gotten the hang of CRUD apps, take a crack at [building and consuming some APIs]({{< ref "after-crud-apis.md" >}}).

As always, feel free to reach out to me on twitter ([@johnmosesman](https://twitter.com/johnmosesman)) if you have any questions on this or any other topic around development.

John

