+++
draft = true
date = "2020-04-24T12:02:05-05:00"
title = "I had a really great experience pairing"
tags = ["meta"]

+++

I had a really great experience pairing recently.

I was tasked with producing a SQL query that would calculate a rolling month-by-month cost report&mdash;costs in, out, transferred around, and some calculations based on that.

Similar to any budget, the left over amounts at the end of each month were rolled into the next month's as the starting costs. After trying a couple different approaches, it seemed like this called for a [recursive CTE](https://www.postgresql.org/docs/current/queries-with.html) (a way to do "recursive" SQL queries&mdash;even though it's more like iteration than true recursion).

This post isn't about recursive CTE's (it's about pairing), but recursive CTE's were a new topic for me, and so I was able to pair up with a data analyst who had a lot of experience using and building these types of reports.

What ensued was a week of daily pairing sessions, some incredibly productive and satisfying work, and surprisingly a lot of fun (and add on almost losing my voice).

I've done a good amount of pairing in the past&mdash;and while it's never been a _bad_ experience&mdash;it's never turned out this well. In the past it's usually involved a bug or issue that needed a second set of eyes to track down or verify.

The work we needed to do was similar to most report-type work: someone has a big ol' spreadsheet of calculations they're doing by hand, and we want to automate it.

The person I was pairing up with had much more SQL experience than me, but I had been on this project much longer than her, so I had more domain knowledge of how the system worked and how the various data relationships link together. Since I'm also a developer I also had the app running locally, and we used that to develop and test against. So, I managed the workflow and did the typing, and she helped with focus, catching calculation errors, and query structure.

## Pairing is high-energy, high-conversation work

Through this experience I realized how much energy it takes to successfully pair, and most of that energy is spent talking. Talking through what you're thinking, talking through where you are in the code, talking through next steps&mdash;it's basically all talking. And talking all day is _exhausting._ We basically paired through the morning, took a break for lunch, and then paired back up in the afternoon. By the end of each day, we were pretty spent.

One of the biggest benefits of pairing (and talking through your thought process outloud) is it forces you to stay in a logical flow. On my own, I might try something, halfway through backout, go down another path, switch to another path&mdash;hey where was that thing again? Half an hour later and I've half-tried a dozen different approaches, none of them completed.

If you do this while pairing, you'll look like a crazy person. Having to speak outloud what you are thinking forces you to stay in a logical flow and avoid half-broken states and logic patterns.

Talking outloud also forced our workflow into a simple procedure:

1. State what we are trying to accomplish
2. Do the work
3. Test and evaluate

It's never really that simple though. Especially in SQL-land, after doing the work you're trying to do (or while you're trying to do it) you run into problems. For this task, we were limited by what we wanted to do syntactically by the recursion (no aggregate functions), but we were also constantly finding issues with our query that turned out to be data problems, and each one of those problems had to be hunted down and verified individually. Is our query wrong, or is the data wrong? Investigating the data led to more side-queries and more investigation.

Eventually we'd find an answer and bubble all the way back up to our original problem&mdash;sometimes to find another side issue to track down! At times we'd spend a full day or more down rabbit trails just trying to get back to the original problem we wanted to fix in the first place.

During all of these excursions, stating very clearly what we were trying to solve (and keeping a good list of todos and notes!) helped maintain focus and keep a logical flow. Once we completed a task, we'd restate what were we trying to do next (or do previously), and start the process again.

## Use consistent verbiage to create mental anchors

Over time our SQL query got a bit unwieldy and grew to a few hundred lines. From this point on something else became very apparent: stating where you are or where you're going in the code becomes crucial.

Since I was sharing my screen and "driving" (doing the code navigation and typing) in a file of a few hundred lines, and we were also switching between the browser and the codebase itself, it would be very easy for my pair partner to get lost in our query or the codebase as I scrolled and jumped around. Add in any lag from our video call screenshare and it would be too easy to lose track of where we are in the code.

So one thing became clear to me: I needed to state where I was in the code or where I was going when I moved.

> "Ok let's go back up to the top here."
>
> "So now we're back in the _X_ part of the query."
>
> "Let's go verify that this number is the same in the app."
>
> "Ok we're on the _X_ page for this _Y_."

Sometimes talking like this is a part of speaking out your thought process, but when the other person is only viewing a handful of lines of a large query, giving them that context to anchor against allows them to keep contributing to the process instead of falling behind and playing catchup. A pair partner who has fallen behind isn't a pair partner anymore, but a spectator.

I found it's also important to continue to use the same terminology when referencing various parts of the code/query. Using the same name for the same piece of the query over and over allows that to be a mental anchor.

Saying things like:

> "Ok let's go back to those messed up users"
>
> "So back to our users"
>
> "Ok let's fix these guys"

are vague and can be interpreted to have different meanings, or at the very least cause more mental processing to arrive at the same conclusion as you.

_"Ok back to users without posts that are overdue,"_ over time starts to mean something concrete and specific, and by continuing to use that verbal reference in a piece of code will cause you to begin to associate it with that place.

## Remember to value your partner

One thing I became aware of since I was not only driving and thus had control of the typing, but also because I had the most context about the system, was that I could have easily ignored, dismissed, or run over my pair partner if I wasn't careful.

Even unintentionally (especially considering you're trying to do complex reasoning, type, talk, and listen at the same time), it would be easy to miss suggestions or comments.

When I did notice that I missed something she said, or something she said was right and I tried my line of thinking first, I tried to very directly acknowledge that she was right back there, and I didn't listen. I don't know this for sure, but I'm sure she appreciated the proper credit and comments like "Oh yeah yeah, you're totally right&mdash;that's the thing you said five minutes ago."

In a similar vein, when you pair it becomes a team outcome. Any success one person makes in a pairing session is a team win, and should be reported on as such. When talking about the pairing there should be more "we" than "I" or "you."

## Remember to take breaks

Naturally, after long periods of intense work, we got tired. Mistakes started to happen more frequently, and we would spend a long time on an issue only to find out we were looking at the wrong thing, or forgot some minor detail that should have been obvious.

At times like this, it's time for a break. After a couple of days we both began to get a feel for this growing mental dullness as it approached, and we got better about stopping for a break.

## The cost of pairing

From a business decision, it can feel difficult to allow two or more people to work on the same problem&mdash;it feels very inefficient. But given the right problem, you can get an output more than the sum of the people's individual time.

Minor mistakes and distractions aren't as detrimental, and complementary knowledge gaps (i.e., a technical skill vs domain knowledge) reduce the time and effort in performing the work.

On top of all of that, the skills and knowledge shared between coworkers is incredibly valuable. Through this process I was able to learn and sharpen both hard (SQL) and soft skills (communication/pairing), and at the same time impart domain knowledge about our system in a practical context&mdash;one in which she's likely to remember. All in all, a very productive week spent.

And I guess finally, it can be really fun! Working hard with a peer and producing a great outcome can really be a big boost for morale.

So what's the moral of the story? I don't really know, maybe try pairing if you haven't, or if you're in a leadership position allow or encourage your team members to use it, and try the ideas above.

Happy pairing.
