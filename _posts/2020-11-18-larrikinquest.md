---
layout: post
title:	"Larrikin Quest"
date:	2020-11-18 00:00:00
categories:
    - blog
tags:
    - development
    - larrikinquest
---

It's difficult to think about everything I put into this game.
I've been in COVID-19 lock-down the majority of the time whilst working on this game, so it's hard to think what the project was like at the beginning.

Larrikin Quest's purpose was about getting more practice at making games, trying new things out, and seeing how I could go with handling bigger scope.

## The design
You know, I'm really not sure where I got the idea for this from. I think I started with what I wanted to achieve from a development perspective:

* 2D
* Single player
* Something with a character
* A small story

Then I went from there. I thought a top-down RPG with real-time combat would be an interesting endeavour. I don't know where I got the idea of the theme from, but I did like the idea of doing something really Australian and really silly. The enemies are based on Australian wildlife, the invasive cane toad, the thorny devil and the kangaroo. Luckily real life cane toads don't explode and kangaroo's don't chuck beers at you (yet).

As far as game-play design went, I thought about how the 2D Legend of Zelda games worked, but really just played with the mechanics iteratively. I remember deciding against a slash attack since I figured a stab would be easier to animate, and rotating pixels is a bit awkward. 

I also thought about implementing a boss fight at the end, but I cut it since I figured it would be a lot of work to do, with not that much pay-off. Originally the bartender was going to tell you to do with a nasty client and then you would go off and have a boss fight. He was going to be like a minotaur, but with a crocodile head instead of a bulls, so a crocotaur I suppose?


## New stuff I tried out in development:
#### Making my own sound effects
I used [bfxr](https://www.bfxr.net/) to make the sound effects. I think I still have a lot to learn about how to make better sound effects, but learning the basics was interesting. Initially I thought about using free sounds but it was difficult trying to find exactly what I wanted, and I thought it would be more interesting if I tried making them all myself.
Some of the sound effects were really easy to come up with, like the toad's explosion sound, but sounds like the knife stab and the boomerang throw I tried combining sounds together to give them an initial impact feeling and a longer drawn out sound.

#### Saving & Loading
An entirely programming-focused new part of development I hadn't really delved into.
In principle it's pretty simple: 1. Record the state of the game, 2. Later, set the state of the game to that record. In reality, there is a lot of ways to screw things up, make things very complicated, and a lot of options. What file format do you save as? Do you encrypt the file? How error-proof should the saving/loading be? And so on. 

Saving and loading really demoralised me with the project for a while, as it was a real grind. It was also very much an academic pursuit, since I could have just saved the level you were on and called it day, but instead I really wanted to challenge myself by saving the positions of all the game objects and all other variables in the game. I even nested the last saved-checkpoint into the file save, so if you save and quit the game, then die, you will correctly re-spawn at the last saved checkpoint, so it's kinda like a save-in-a-save.
I'll definitely keep saving and loading in mind when I design games in the future.

#### Options screen
This is something I've been meaning to do for a long time, since PC games have one of the most intense option and configuration screens out of all platforms. I haven't gotten anywhere close to a good PC game options screen, but I tried out a few small things to get an idea of how a real options screen might work. This was actually pretty easy, especially since I'd already handled the headache of saving/loading before, so saving the options was easy.

## Lessons learned:

* Having a specific goal for what you'd like to achieve with a project is a good way of framing it, I set out to do sound effects and saving & loading and I achieved that
* Every project has an initial fun phase and then a longer grind, and then perhaps a final push. Getting through that grind in the middle is the hard part I think.
* I probably should set a date to release on paper in advance, just to push myself a bit harder, having no date at all probably led to a bit of faffing about for some time.
* Next game should have music.

--------------------------------------------------------------------------------------------
Overall I did enjoy making this game, I think it's come out pretty well and I'm excited for people to play it.

<a href="{{ site.url }}/games/larrikinquest/LarrikinQuest.zip">You can download Larrikin Quest here.</a> 