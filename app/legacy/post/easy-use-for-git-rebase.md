+++
draft = false
date = "2015-11-29T11:27:21-05:00"
title = "Easy Uses for Git Rebase"
tags = ["git"]

+++

[Git](https://git-scm.com/) is a powerful and useful tool, but let's face it, at some point you're going to mess up. Or, if you don't, at some point someone _else_ will, and you'll have to fix it. Below is what I've learned about using rebase to fix these problems.

These problems usually take the form of:

* Committing code on the wrong branch
* Pushing incorrect commits to a remote repo
* Merging a branch that wasn't quite ready

I'll assume you have a basic understanding of git—just committing and pushing code.

## Enter Rebase
Rebasing is kind of a mind-numbing topic. Explanations of it are always filled with elaborate diagrams that really never make much sense to me. There's a pretty good explanation [here](https://www.atlassian.com/git/tutorials/rewriting-history), but in a nutshell, rebasing edits the commit history and makes new commits out of the old ones. But moving on!

## An Example
Open a blank file and save some sentence inside of it like, `Vanilla is the best flavor of icecream` and commit it. I called mine `README.md` with a commit message of `Create README.md`.

Next, push it up to a remote repository.

Now, let's say someone changes "vanilla" to "chocolate" (which is _obviously_ wrong), and pushes it up.

A mistake has been pushed to `master`! (oh noes)

![Mistake in master](https://raw.githubusercontent.com/johnmosesman/blog/master/learning_to_rebase/mistake_in_master.png)

Now this is a simple example, so you could easily change it back to "vanilla" and push to master, but in a real-world scenario, this could mean dozens of commits and files changed. Taking care of them in a one-by-one basis wouldn't be feasible.

So, rebase to the rescue!

Before we move on, make sure you're up-to-date: `git pull origin master`.

## Git History
The first thing you want to find is the SHA of the commit that is _one before the last good commit you want to keep_. It may take a couple times to figure out which commit is the right one to use, but this will make sense once you see it in action.

To see a history of your commits, type `git log`. Here's my output:

```
john:~/Dropbox/blog/learning_to_rebase (master)$ git log
commit d583095fb7e1bd4bf0b2511455b40d7cc3563c0a
Author: John Mosesman <johnmosesman@gmail.com>
Date:   Sun Nov 29 11:52:43 2015 -0600

    *Chocolate* is the best flavor of icecream

commit 30b4442f9ae5c0fc3cd590892f81625bbee25dd4
Author: John Mosesman <johnmosesman@gmail.com>
Date:   Sun Nov 29 11:52:43 2015 -0600

    Vanilla is the best flavor of icecream

commit 4ef8d1cb697f9301085d7b31e5328132ed3333c8
Author: John Mosesman <johnmosesman@users.noreply.github.com>
Date:   Sat Nov 28 23:51:16 2015 -0600

    Create README.md
...
john:~/Dropbox/blog/learning_to_rebase (master)$
```

The _last good commit_ before the problem is the one titled "Vanilla is the best flavor of icecream." We want to go to the one _before_ that, which is "Create README.md", and it's SHA begins with `4ef8d1cb...`.

## Doing the Rebase
To start rebasing at that point in time, we pass the full SHA of the commit and the `-i` flag for interactive mode.

`$ git rebase -i 4ef8d1cb697f9301085d7b31e5328132ed3333c8 # Your SHA here`

Below is the output. Notice that we have all of the commits _after_ the one we've chosen (the good commit and the bad one). The reason we start with one _before_ the good commit is because of this line in the instructions below: "However, if you remove everything, the rebase will be aborted." Basically, we have to keep at least one commit—we can't just delete the bad ones.

```
pick d583095 *Chocolate* is the best flavor of icecream
pick 30b4442 Vanilla is the best flavor of icecream

# Rebase 4ef8d1c..2728a63 onto 4ef8d1c (       2 TODO item(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Notice the various key words and what they do. The only one we're going to use here is `pick`. `pick` tells git which commits to keep and use when re-applying the commits.

To remove our mistake here, all we have to do is delete the line that says `*Chocolate* is the best flavor of icecream`.

By default my editor is `vim`—which is a large topic in and of itself—but to speed through this, you can use `j` and `k` to move between lines, and type `dd` to delete the line you want. Afterwards, `:wq` will _write_ and _quit_ the file (if you want to do a quick tutorial of Vim, just type `vimtutor` in any shell).

Before you `:wq` the file should look like this:

```
pick 30b4442 Vanilla is the best flavor of icecream

# Rebase 4ef8d1c..2728a63 onto 4ef8d1c (       2 TODO item(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
...
```

After the `:wq`, you should see the following message in your shell: `Successfully rebased and updated refs/heads/master.` If we type `git log` again we'll see that the commit is gone! To correct `master` on the remote repository we just need to do a force push:  `git push -f origin master` (side note: it's always scary to do a `-f`).

And that's it!

If you have comments or questions, <a href="mailto:johnmosesman@gmail.com?subject=Learning%20To%20Rebase" target="_top">feel free to email me</a> or hit me up on twitter: [@johnmosesman.](https://twitter.com/johnmosesman)

## Bonus Feature: Squash/Fixup
As a side note, let's say you're editing a README and you find a grammar or spelling change, commit it, and push it up. After that, you find another one, and do the same. You could do this several times, and end up with five different commits—all editing the same file with the same purpose. While this isn't _bad_, persay, it does bloat the repository when really all of those commits were one idea.

While rebasing, you can use `squash` or `fixup` to combine all of these commits into one. Just a way to keep the repository history a little cleaner!
