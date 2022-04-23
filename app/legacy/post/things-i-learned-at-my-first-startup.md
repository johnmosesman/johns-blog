+++
draft = false
date = "2016-05-17T11:37:54-05:00"
title = "Things I Learned At My First Startup"

+++

Working at a startup offers tremendous opportunities for growth and personal development. The pace, energy, and atmosphere is exciting and makes weeks and eventually months fly by. We try our best, but of course we make some mistakes (ok or a lot of mistakes).

Most of us have read about the common pitfalls startups run into: hiring too soon, not validating their users' needs, investor issues, etc. Below are a few (of the many) things I learned—even though I've read and been warned about these things in the past. Sometimes you just have to learn things the hard way.

## Lesson #1: Build for today, not tomorrow.
You're an engineer. You love to build things. You love to build clever solutions to things. Here is a classic mistake:

*Manager Bob:* Hey I need you to build `Some Feature`.

*You*: Yeah! I can totally build `Some Feature`.

*You*: Even though we only need `Some Feature` today, very soon we'll need `Some Feature 2.0`. I can add some *clever flexibility* into this right now so when `Some Feature 2.0` comes along it will be trivial! I am so smart.

No. Nonononono. Don't overbuild. Cover the existing requirements and the existing requirements *only*. After being bitten by this several times, I will try my hardest to never do this again. Especially in the startup world, where speed and agility are absolutely vital, spending any extra time building something you probably won't need while at the same time complicating the system is very bad.

I have built in extra flexibility for a new feature **slated for development the very next week only to have that feature chopped**—leaving junior developers very confused with the code because I premptively decided to make it a polymorphic association with a generic "data" field that housed auxilliary data. Was that a great design in the first place? Probably not, but we had to live with it **for the entirety of the app.** And also, `Some Feature 2.0` never came along.

## Lesson #2: "Work on the hard problems"

In most work environments, but especially in startups, there are always a million things to do. The challenge is prioritization, and it comes down to this: *always work on the hard problems*.

It is all too easy to fill a day or even a week with things that keep you busy—things that *feel productive*, but really do not move the needle of your success.

I stole this phrase partially from Seth Godin in his [Startup School Podcast](https://itunes.apple.com/us/podcast/seth-godins-startup-school/id566985370?mt=2) (my all-time favorite podcast for business/entrepreneurship). He said in one episode, if you're starting a business, the hard part of your business is not what your webpage looks like, or if you have the perfect logo—it's getting your customers to notice you and buy what you are selling.

It's very easy to focus on the things we're good at—the things we know how to do. Working on hard problems is hard. It's not fun. It's searching in the unknown, and it's kinda scary at times. But those are the problems that will actually propel our projects forward.

That's not to say you shouldn't do things like respond to customers, ensure code quality and test coverage stay in good spots, but that the majority of your day should be solving problems *only you have the potential to solve.*

(Quote partial credit: [@ryanlabouve](https://twitter.com/RyanLaBouve))

## Lesson 3: Work smarter, not harder

A cliché, but soooooooo true. A friend of mine sent me [this post](https://medium.com/digital-nomad-stories/the-cult-of-work-you-never-meant-to-join-cd965fb9ea1a#.3k3vlyyxu) recently about how overworking has become a badge of honor in our culture and ultimately reduces our productivity. I highly recommend you read it.

### 40+ hours per week

80 hour work weeks. Sleeping at the office. Neglecting friends, family, exercising, hobbies, etc. I'm not saying we shouldn't work hard—we should—but outside of the occasional (and by occasional I mean *very occasional*) week or weekend when you need to grind it out, consistent times like this are almost always a symptom of a massive problem in another area.

It is so hard to do, but ask yourself, *why* are we doing this? Here's some common causes I've found, and each one of these goes directly against the startup mindset of iterating quickly based on feedback.

#### Poorly defined scope of work

"So we have our sprint...and we have the list of prioritized things to be done...so just drag everything into the sprint! Prioritization! Done!"

#### Vastly overestimating what you actually need

* "We HAVE to have this feature or we can't get clients."

If that is true, you have drastically missed on product/market fit, and need to be cutting everything else you can to re-align your product—not adding more. (But chances are, you don't actually need what you think you need.)

* "Client X / Our biggest client will leave us if we don't do this."

This is rarely the case, and in the cases where it is true you probably don't want that client anyways! They will be more trouble than they're worth.

* "We HAVE to show/demonstrate/have Features X, Y, and Z or ABC will happen."

You probably don't have to have those features. Showing less or showing a roadmap will do just fine. And similarly to if you "have" to have a feature, if you're that far off the mark, cut everything but that one feature.

#### Wavering company direction

Sometimes, when the workload is ever increasing or the string of deadlines are unmanageable, it could mean you're pursuing multiple directions. You can't entertain growing your customer base, acquisition, and conferences at the same time. Trying to sprint towards two different locations will lead to not arriving at either.

#### Deathmarching

In *all* of the cases where I've deathmarched, there was a simpler and better solution sitting right there all along. Deathmarching hurts in many ways. Team morale suffers, the product suffers, and a general toxicity starts to creep in.

**A deathmarch is your greatest canary in the coalmine for organizational health.**

## Lesson #4: "It's only as complicated as you make it."

(Quote via [@datachomp](https://twitter.com/DataChomp))

Processes, company affairs, features, implementations—it really is only as complicated as you make it. Simple is better.

## Conclusion

I hope you can learn from my mistakes and not have to make the same ones yourself. As always, feedback is welcomed at <johnmosesman@gmail.com> or [@johnmosesman](https://twitter.com/johnmosesman). Happy Startuping!
