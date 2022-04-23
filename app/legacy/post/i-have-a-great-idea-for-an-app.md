+++
date = "2016-10-05T11:41:43-05:00"
title = "\"I have a great idea for an app.\""
draft = false
tags = ["startups"]

+++

People that know me know that I build apps and do web things, and so I'm often approached with something that usually starts like, "I have a great idea for an app." Outside of being a developer or working in a development-related field, it is very difficult to know how much work it takes to build an app, what type of work it takes, and who it requires work from. That's the inspiration behind this post: to outline some basic questions and practices around "building an app." Below are my thoughts about the process of building an app, and a few key questions to ask along the way.

Most of the time the conversations with these people never lead to anything, but I enjoy talking through what could be and helping out a friend who has questions. This post outlines some key conversation points.

(Side-note: This blog is usually for developers, but this post is specifically for non-developers.)

## Step 1: The Idea

Ideas are great. They're fun; they're exciting—and that's the problem. Almost any idea sounds great in your head or on paper, but there's a massive gap between what seems like a good idea and *something people actually want or will use.*

If you're wanting to build an app, the first question to answer is: "Will people actually want to use this?"

Many people and businesses are saddened after paying the cost and time of developing an app/product/service only to find out in the end that nobody wanted it, or at least didn't want it in its current form. The startup world has tried to circumvent this process by using techniques like [Lean Startup](http://theleanstartup.com/) and focusing on building a [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) (minimal viable product) to try to avoid wasting time and resources.

In the business world they call this "market validation," and this brings us to the first important question:

**Important Question #1: Do people actually want to buy what you are selling?**

There are many ways to try to answer this question, and obviously the faster and the cheaper you answer it, the better.

Here are some of the questions I like to ask:

1. How can you test this idea without having to build an app? (Can you test it with pen and paper or by using Excel?)
2. If you *absolutely have to have* an app to test your idea (see #1), what is the smallest app you can build to test it? (Even a non-working prototype—just something you can get infront of people.)
3. Does this idea already exist currently in some form? What do people think about it? Where is your idea different or the same?

## Step 2: The Execution

Ok, so you've got an idea and you're fairly confident that people will want to use it. Now what? Most people have no clue what to do next, and that makes sense. What we developers do typing away on our keyboards is very opaque to the outside world. And because of that, there's one important distinction to made: *an app isn't just the icon on your phone.*

### The parts of an app

When you browse through Facebook or Instagram or send a text message to your friend, you're interacting with the visual portion of the app—the thing that's on your phone—but there's a lot more going on in the background. Any app that is connected to the internet has some web component (i.e., servers) that is chugging along all day.

Most apps today are really just a pretty presentation layer—they're not doing a lot of processing or computing. The app requests data (like all of your Facebook posts) and presents it to you in a nice feed, and sends data back to the server (like when you post a picture of your coffee). Most people know this, but what most people don't think about is that **mobile application development and web development are two completely different skills.**

To use a music analogy, just because someone can play the saxophone doesn't mean they know how to play the trumpet, and vice versa. Now yes, there are basic concepts of music that transfer between the two, but you wouldn't want to hire a saxophonist and hand him a trumpet for your Friday night shin-dig. Of course there are people who can play both the saxophone and the trumpet, and there are developers who can do both mobile and web development.

### Clean, beautiful apps

I'm sure all of us have interacted with an app that was beautifully designed and intuitive and easy to understand. I'm also sure we've interacted with some apps or websites that were the opposite (government websites I'm looking at you).

We appreciate things like our iPhones and our fancy heart-shaped latte art because they have "good design." They're pretty to look at and easy to use.

Just like mobile app development or web development, design is also a skill. You can even break design into similar categories like app design or web design. And like a developer has different skillsets, a designer could have none or all of these skills as well. If the appearance/feel of the app is important to you (or more importantly, your users), a designer can be very important. So here's question #2:

**Important Question #2: What kind and how many developers/designers do you need to hire?**

### The feature set

Once you've found the right developer(s)/designer(s), it's important to *very specifically* nail down exactly what the first version of the app should do. By writing it down in *excruciating detail* you remove future frustrations and problems with unclear expectations.

Harkening back to Step 1, what is the absolute minimum amount of things that need to be in the app for it be complete? It is much better to build a small thing, test it, and change it based on feedback than build for six months to a year, release it, and find out you were wrong about some assumptions that could have been fixed a month in.

### Maintenance

An app is not something you can just start and forget. Technology requires maintenance: security updates, bug fixing, handling user support requests, ensuring the servers can support the user load, etc. All of these things require a developer on a on-going basis, so there will be some kind of support/maintenance piece to the hiring process (talked about below). Also, it costs money to run servers. Usually this cost isn't exorbitant, but it is there.

## Step 3: The Business

Just as important as what the app is and does is what the business is and does. In most cases you're not just building a fire-and-forget app, you're building a platform. Here are some important questions to consider:

### How do you make money?

Chances are you want to make money on this app to pay for the development cost and time spent. There are a few ways to go about this—each with their own pros and cons:

#### Purchase the app

A one-time fee to purchase the app from a website or the app store ($2.99, $99, etc.).

Pros:

* Easy and upfront

Cons:

* App stores usually take a cut (10-30%)
* No recurring revenue

#### Free with ads

Make the app free and shove those ads in to get that sweet, sweet ad money!

Pros:

* Free app means more people will try it

Cons:

* Ads don't really pay that much until you hit massive scale
* Cheapens the experience (most people don't like ads)

#### Subscription based

A monthly subscription to use your app/platform.

Pros:

* Recurring revenue (woot!!)

Cons:

* Some people don't want to pay monthly and just want a free or one-time cost

#### Some combo of the above

Whichever type you choose will affect what type of users you get, and what the users expect from you. We've already stated it, but:

**Important Question #3: How do you make money?**

## Step 4: The Hire

So you're got what you think is the right thing to build, you've explicity described what it should do, you know how to monetize it, and you think you've found the right people to build it. What does the hiring process look like?

Similar to a full-time job offer, there are generally a few different kinds of offers:

1. Cash payment
2. Equity in the business
3. Some cash + some equity

Let's talk about each one of these from the perspective of the developer and you, the business owner.

### Cash payment

The simplest and easiest of hirings. You pay the person(s) in cash (probably some upfront and some upon completion of the work) and work out a reasonable timeframe.

Pros for the developer:

* Get paid (yay!)
* No assumed risk if business fails

Cons for developer:

* If the business is a success, capped potential return

Pros for the business owner:

* Simpler transaction
* Don't give away ownership of business

Cons for business owner:

* Requires more cash upfront

### Equity

Instead of taking cash, the team agrees to take a piece of ownership in the business.

Pros for developer:

* Large potential upside if success
* Joining a team

Cons for developer:

* Assuming very large risk of getting little or no return for time and work invested

Pros for business:

* Free building cost
* Building a capable team

Cons for business:

* Giving away piece of business
* Assuming risk of hiring the wrong person (who also has equity in your business)
* Legally more complex to maneuver

### Cash + Equity

This one I think is obvious. It's some mixture of the above two.

**Important Question #4: How will you pay them?**

### "Why won't anyone take my equity?"

In this next section, I'm going to illustrate a common developer position using my own life as an example.

For me personally, 99.999% of the time I will not take equity. The reason for this is by taking equity I am committing myself to putting time and energy into building the business (not just building the app), and *personally trying to make it a success*. If I am not willing to do that, then I am banking my success in the confidence that the other people involved will do the same.

Most new businesses fail (some stats say 9/10)—even those with the best intentions and efforts. I build apps for people for a living, and I get paid to do so and it lets me pay my monthly bills and live my life. If I took equity on apps I built for other people, I would be trying to build a dozen businesses at the same time right now—and spread that thin surely all would fail! Accepting equity is simply way too much risk to take on.

I know as a business owner this can be very discouraging. Usually there isn't an abundance of free cash to be spent, and a quality, well-designed app is expensive to make. Of course it varies drastically based on the functionality, but you can expect it to cost in the $5k-20k range easily (be leerly of someone who can sell you an app for $500).

And while most times I do believe in the idea and the people behind it, I cannot responsibly stake my family's livelihood on it. Even if it is a success, the payday could be years in the future (again the stats show most businesses take at least two years to reach profitability), and unfortunately rent won't wait two years to be paid. The only situation where I can responsibly take equity is if the business is the sole focus of my energy (ie, a full-time venture).

I hope this section is helpful to potential business owners. I think you will find this sentiment is shared among a vast portion of developers/designers.

## Conclusion

In conclusion, I hope this post has better equipped you to start pursuing and asking the right questions about your project.

If you'd like to work with me, feel free to shoot me an email at <mailto:johnmosesman@gmail.com>, hit me up [on twitter](https://twitter.com/johnmosesman), or learn more [about me here](http://johnmosesman.com/about/).

Thanks for reading!

John
