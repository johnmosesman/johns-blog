+++
date = "2019-07-21T10:01:04-05:00"
title = "After CRUD: Intro to Git and basic workflows"
tags = ["career"]
+++

Hopefully at this point you've [built a number of CRUD apps]({{< ref "types-of-projects.md" >}}), you've enhanced those apps with little side quests like user authentication (sign up / login) and email sending, you've [built and consumed an API]({{< ref "after-crud-apis.md" >}}), and you're ready for the next challenge.

This next topic is a little smaller in nature compared to apps or APIs, but it is still very important nonetheless. This topic is Git, and it is a crucial component of working successfully in a professional development environment. Having some practical experience with Git will make your transition into a full-time position much easier&mdash;and as previously mentioned several times&mdash;will show potential employers that you can handle working in a mature development environment.

So with that said, let's begin!

## Working with other developers

One of the most important and difficult aspects of software engineering is not the engineering work itself but working with other humans _around that effort._

It's easy to write code in isolation. You wrote it, so it makes sense to you. You have the mental model and the surrounding knowledge all stored in your head&mdash;so your code makes sense to you in an obvious way.

If you've ever looked at another person's code (or looked at a popular library or package for the language of your choosing), you will become quickly aware of one of the most important tenants of software development: **software is easier to write than it is to read.**

The majority of your software writing experience will be spent reading and trying to understand existing code&mdash;not writing new code. New code is written once, but it will be read over and over again for the lifetime of the codebase.

Reading other peoples' code is difficult. For one, it's called _code_ for a reason. It's not "easily understandable _my-native-speaking-language_"&mdash;it's _code_. It's intentionally not explicit. It's written to be explicit to a _computer_.

Take this simple Ruby method (or function) for example:

```
def prepare_username(username)
  username.downcase
end
```

This simple function takes in a parameter, `username`, and returns a lower-case version of it using Ruby's `downcase` method.

This is an easy method to read, but those few lines don't tell the entire story. Why does this code exist in the codebase? Is it because each username must be unique across all users&mdash;so `BaTmAn` and `batman` are the same username? Or is it used for aesthetic reasons? Maybe the design called for all lowercase letters in a particular part of the UI.

There are other questions too, like when was this code added? What was the context behind adding this code? Did they find a bug in the login logic that checks for usernames in lowercase, so `BaTmAn` and `batman` became the same user?

These are important questions, and the code just doesn't tell us enough information. In other cases, what if two developers want to change this method at the same time? Who's change goes first? And what happens to the second developer's change? Does it overwrite the first, or is it in addition?

To solve these problems, programmers use something called **source control.** Source control is, like it sounds, a way to control the "source" of the code&mdash;the master copy of the code if you will&mdash;and all of the changes that happen to it. It's the power of Dropbox saving incremental changes and backups, annotated comments, and the ability to fast-forward and rewind through time in the codebase all rolled into one.

There are several different source control systems, but arguably the largest and most popular one is [Git](https://git-scm.com/).

## Git

Git is a very powerful tool, and it can do a lot of amazing things. In the beginning, Git may just seem like a set of magic commands you've memorized to get your work done&mdash;and that's totally ok. Understanding comes after doing. Git can do a lot of crazy things, but in the beginning it's important to not get overwhelmed or bogged down in those details. You'll learn more over time as you work in development, and right now you just want _basic workflow proficiency_ so you can collaborate and work with others.

So in this post, we'll cover just the basics, and I'll give you a few exercises to complete to further your knowledge.

Git can be used as a command line tool, but there are also [graphical user interfaces](https://git-scm.com/downloads/guis/) ("GUIs") as well. If you're just starting out, it's probably a good idea to use one of these applications for some of your git-foo. I personally use a git GUI for some tasks (like reviewing changes), and the command line for others (saving and pushing/pulling those changes).

If you're on a Mac, I personally like [GitX](http://gitx.frim.nl/). It's free and pretty easy to use.

## Basic workflow tasks

There's a few basic tasks you'll want to be able to do in Git, and we'll go through them one by one.

First, make sure [Git is installed](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git). If you're on Mac, it can be as easy as `brew install git` if you're using Homebrew.

Once Git is installed, let's make a new directory (folder) and initialize Git as well as create a file for us to play with:

(I'm using Bash on a Mac. If you're not your commands may vary slightly.)

```
$ mkdir git-test
$ cd git-test
~/git-test$ touch test.txt
```

You should now be in a new directory called `git-test` that contains an empty `test.txt` file. If you type `$ ls` ("list directory contents") in your console it will show that the directory only contains that one file:

```
$ ls
test.txt
```

Next let's initialize Git in this directory:

```
~/git-test$ git init
Initialized empty Git repository in ~/git-test/.git/
```

And with that, we're ready to begin!

### Status

To see the status of our code in Git's eyes, we use `git status`:

```
~/git-test$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        test.txt

nothing added to commit but untracked files present (use "git add" to track)
```

This tells us a couple things:

- We're on a branch called `master`
- There have been no commits
- There's an "untracked" file called `test.txt`

We'll come back to branches in a minute, but as for the other two items, "there have been no commits" (which makes sense, we haven't committed anything yet&mdash;even if we don't know what "committing" really means yet), and we have an untracked file: `test.txt`.

Starting with the bottom one, we have an untracked file. This is Git telling us that it is not watching changes to this file&mdash;it doesn't care about it. To tell Git to watch it, we use `git add`:

```
~/git-test$ git add .
```

(Using a `.` here means "add" or "stage" all files. We could have also added just that file with `$ git add test.txt`.)

If we run `git status` again, we'll see that the file is now being tracked and it considers it a new file since this is the first time Git has seen changes to it:

```
~/git-test$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   test.txt

```

### Committing

Once a set of changes have been added or staged, we can "commit" them. A commit saves a group of changes with a _commit message_ describing the change and a timestamp.

Before we commit this file, let's add some content to it first. You can open the file in an editor (make sure to save it) or run the commands below to put a simple sentence inside it.

```
~/git-test$ echo "Once there was a cat named Bill." > test.txt
```

We can see the contents of the file by using `cat` (short for "concatenate"&mdash;I didn't intentionally pick a sentence that matched this command name):

```
~/git-test$ cat test.txt
Once there was a cat named Bill.
```

Now run `git status` again:

```
~/git-test$ gs
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   test.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   test.txt

```

Previously when we ran `git add .`, we told Git to stage all of the changes in our working directory, and it did. Now we've added a new change, the sentence we added to the file, and so Git is keeping that work separate from our past change. That work is currently _not staged._ That means if we commit right now, we will only commit the new, blank file and not the sentence we added as well.

To stage this new change, we'll do the same thing as before:

```
~/git-test$ git add .
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   test.txt

```

Git handles the previously staged changes with new ones, and it shows us that the _result of both of those stagings_ is a new file called `test.txt`.

We can see what that result is by looking at the diff (or "difference"). To look at the diff you can use the command line as shown below, or a GitX application you downloaded previously. I'll use the command line here as it's easier to display in a blog post.

```
~/git-test$ git diff --cached test.txt
diff --git a/test.txt b/test.txt
new file mode 100644
index 0000000..873be3d
--- /dev/null
+++ b/test.txt
@@ -0,0 +1 @@
+Once there was a cat named Bill.
```

There's a lot of mumbo-jumbo in there that isn't important right now. The important part is that last line:

```
+Once there was a cat named Bill.
```

Notice the `+` in front of the line. That means we're adding this line.

### Committing

Now we're ready to commit. We'll use the logically-named command `git commit`, and we'll write a descriptive message by passing the `-m` flag:

```
~/git-test$ git commit -m "Adds a new file test.txt. Contains a sentence about a cat named Bill."
[master (root-commit) bb0eb17] Adds a new file test.txt. Contains a sentence about a cat named Bill.
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt
```

And with that we have committed! If we run `git status` again we'll see that there are no changes in our working directory:

```
~/git-test (master)$ git status
On branch master
nothing to commit, working tree clean
```

That's a lot of hub-bub for such a trivial example, but when you start changing multiple areas of multiple files in a codebase, having this level of granularity is essential.

### Saving vs committing

This committing process may seem odd to you. If you've ever written essays or documents for school, as you write you probably continually hit the save button (I am right now as I'm writing this). We don't like to lose work, so we just _save, save, save._

When it comes to coding, we do the same thing. Frequently, I will save the file I'm working on in my editor. However, just because we want to _save our work_ after every little change doesn't mean that each of those saves represents a _solid, completed work or idea._ I may "save" the file four or five times, but the work may not be "ready" until that fourth or fifth save.

And that's where Git is different from just saving a file. Git allows us to stage and commit a _finished block of work_.

Let's say I misspelled that sentence we added a few times and I saved after each one:

> "Ocne there was a cat."

> _Once is misspelled, edit and save._

> "Once there was a cat."

> _Forgot the cat's name, edit and save._

> "Once there was a cat named Jill."

> _Wrong name of the cat, edit and save._

> "Once there was a cat named Bill."

I don't want to commit each of those changes&mdash;the work isn't useful until it's spelled correctly and the name is correct. So although I might save my file a few times, I only want to commit changes that are completed.

As a general rule, you want to **group logical chunks of work into the same commit.** In our case above, committing an empty file doesn't really do us any good&mdash;the file really belongs with the new contents that we added.

That is not to say that you don't want to commit partially-working code. It can sometimes be very useful to commit something that you know isn't quite right, but it's part-way there or in the direction you want to go. This is similar to spamming save after every sentence you write. The advantage of having something committed is you can return to the state of the code at any point in time that has a commit, but that's a slightly more advanced topic than these basics.

### Branches

The final thing to talk about are Git branches. A branch is sort of like its own parallel-universe timeline of the code. We can make changes on one branch that won't be visible to another branch, and vice versa.

At some point, we may want the code changes from _Branch A_ to be on _Branch B_, and we can do that. We can "merge" or "pull" in changes from one branch onto another. This is how developers collaborate on the same codebase&mdash;and even on the same files and same lines of code without running into issues with overwriting or messing up other people's changes.

We've already seen one branch so far, and it's called `master`. Master is, well, the "master" branch. It is where all of the code changes will eventually come to reside.

### Working with branches

Unless you're working on a solo project, you usually do not work _directly_ on the master branch. Usually, you want to make your own branch and then _merge in_ your changes to `master`.

We've already committed onto `master` with our first commit, but let's try working on a branch and then merging that branch into master.

The change we're going to make is a little sentence about a dog:

> There once was a dog named Spike.

Since we're already on master, we need to make a new branch. To do that, we'll use `git branch <name-of-branch>`:

```
~/git-test (master)$ git branch add_the_dog
```

That command created a new branch called `add_the_dog` (I tried to pick a descriptive name), and we can see that by using `git branch` to list all of the available branches:

```
~/git-test (master)$ git branch
  add_the_dog
* master
```

Here we can see both `master` and our new branch, `add_the_dog`. The `*` before `master` indicates that we're currently on the `master` branch.

To change our branch, we "checkout" the branch:

```
~/git-test (master)$ git checkout add_the_dog
Switched to branch 'add_the_dog'
```

We're now on the `add_the_dog` branch.

Since we created this new `add_the_dog` branch while we were on master, we've "branched" off of master. This branch has the same code that `master` has at the point in time when we created the new branch using `git branch`. Even though it has the same code, changes to this branch won't affect `master`.

### Committing on our new branch

Now let's make a change to our file on our new branch:

```
echo "There once was a dog named Spike." > test.txt
```

If we look at the diff for the file `test.txt` now, we'll see that the sentence has been changed.

```
~/git-test (add_the_dog)$ git diff test.txt
diff --git a/test.txt b/test.txt
index 873be3d..4e6bbd4 100644
--- a/test.txt
+++ b/test.txt
@@ -1 +1 @@
-Once there was a cat named Bill.
+There once was a dog named Spike.
```

If we commit that change,

```
~/git-test (add_the_dog)$ git add .
~/git-test (add_the_dog)$ git commit -m "Changed to be about a dog"
[add_the_dog 095761d] Changed to be about a dog
 1 file changed, 1 insertion(+), 1 deletion(-)
```

We now have a commit on our `add_the_dog` branch that does not exist on master. To prove this we can look at the commit history by using `git log`:

```
~/git-test (add_the_dog)$ git log
commit 095761dd6e4f358761147df3b6a584ec6016317b (HEAD -> add_the_dog)
Author: John Mosesman <johnmosesman@gmail.com>
Date:   Sun Jul 21 21:36:47 2019 -0500

    Changed to be about a dog

commit bb0eb1784b1d3dfd5e3a22f1e32e2343c5c0520d (master)
Author: John Mosesman <johnmosesman@gmail.com>
Date:   Sat Jul 20 09:14:16 2019 -0500

    Adds a new file test.txt. Contains a sentence about a cat named Bill.

```

As we can see, we have two commits. Our original commit that came from master, and the second commit we just added on the `add_the_dog` branch.

If we checkout `master` and view its log, we'll see that there's only one commit:

```
~/git-test (add_the_dog)$ git checkout master
Switched to branch 'master'
john:~/Desktop/git-test (master)$ git log
commit bb0eb1784b1d3dfd5e3a22f1e32e2343c5c0520d (HEAD -> master)
Author: John Mosesman <johnmosesman@gmail.com>
Date:   Sat Jul 20 09:14:16 2019 -0500

    Adds a new file test.txt. Contains a sentence about a cat named Bill.
```

### Merging

Now that our work is done on our `add_the_dog` branch, we need to get that change merged into master. Merging is one of the Git techniques we can use to combine our work with others. One of the other more popular workflows is by using `git rebase`, but we'll leave that for now (if you're curious about that, I wrote about that previously [here]({{< ref "easy-use-for-git-rebase.md" >}})).

To merge our `add_the_dog` branch _into_ `master`, we use `git merge`:

```
~/git-test (master)$ git merge add_the_dog
Updating bb0eb17..095761d
Fast-forward
 test.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

If we check the log again with `git log` we'll see that master now has both commits. We can clean up our finished branch by using `git branch -d add_the_dog`.

## What to do next

That's a brief intro to the basic git commands. Git is a tool you will use every day on the job as a programmer, and it can do so much more than the basics outlined here.

Here's some homework for you&mdash;some tasks to complete to grow your skill using Git and Git workflows:

### Push to Github

[Sign up](https://github.com/join) for a Github account and create a new repository. After logging into Git at the command line ([and possibly setting up an SSH key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)), push this simple example up to new your Github repo.

If you follow the steps after making a new repo you will end up adding a new Git `remote`&mdash;a location to push and pull code from&mdash;called `origin`, and you can push to origin using `git push origin <your-branch-name`.

### Make a PR, merge it, and pull it back down.

Create a new branch locally, commit a change to it, and push it to the repo from the step above. Then go into Github, create a new Pull Request, merge it, and then finally pull those changes back into your local master branch. The steps will look something like this:

- Create new branch and make a commit on it
- Push the branch to Github (`origin`)
- Create a PR of your branch into `master`, and merge it.
- Checkout `master` locally, and use `git pull` to retrieve the merged changes.
- Verify your `master` branch locally has the new changes.

## Conclusion

Like I mentioned before, there is a lot more to using Git and working with other developers in various workflows, but those things are somewhat difficult to learn outside of actually working with other developers. But, knowing these basics will help you, and they're necessary for many of the app deployment services and strategies, which we'll get into at another time.

That's all for this one. Feel free to reach out to me on twitter ([@johnmosesman](https://twitter.com/johnmosesman)) if you have any questions on this or any other development topic.

John
