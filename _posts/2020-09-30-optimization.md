---
layout: post
title:	"Thoughts on Game Optimization"
date:	2020-09-30 00:00:00
categories:
    - blog
tags:
    - optimization
    - development
    - FPS
    - performance
    - trade-offs
---

Game optimization is a complicated topic. There are so many factors that come down to why a game performs well or not. Games have a reputation for being high-performance software and optimization is really at the core of that.

# What exactly is "optimization"?
**Optimization is about getting the best game performance given a certain set of constraints.** 

**Performance** is measured in a lot of ways, but probably the most common is frames-per-second or FPS. FPS is a [hairy topic](https://www.kotaku.com.au/2015/09/the-story-behind-steams-framerate-police/), and in a lot of ways, game performance is as a whole. Other common measurements are load times, CPU usage, GPU usage, network usage, RAM usage, size on disk and so on. Often these can't all be optimized perfectly without impacting another, which leads to my next point:

# Constraints of optimization
The first constraint of optimization is **time**.

In an ideal world, we could optimize our games until they run the best on the worst machines, but in a competitive environment where games have a limited time to be developed (or run out of cash), games have to balance optimization with all other aspects of development.

Optimizations don't just compete against the clock, they usually compete against each other. A simple example is loading data from memory. If the data is compressed, the CPU has to decompress the data before it can use it. If the data is uncompressed, it takes up more space on disk, so there is a trade-off of CPU / disk space.

There is a lot of these sort of trade-offs that are made, and in the most extreme cases, like fitting games onto [exceedingly small memory size](https://www.youtube.com/watch?v=1UzTf0Qo37A), almost everything is traded for space.

# A different trade-off
Optimization can often have a single cost: the code becomes more difficult for a human to understand. This is a tricky trade to make, since you're making an intangible deal with the future maintainability of the code. A classic example of this is the [fast inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root).

I often hear of this quote from Donald Knuth: 
> "We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%"

I think the commonality of the quote reflects the sentiment programmers have towards optimization, in that it is pretty scary to do right. Donald's wisdom is the most important at the highest architectural level, where even small decisions lead to the biggest performance differences. 

# Were games better optimized in the past?
I don't have a conclusive answer to this one. I think there is a lot of factors at play here that support or don't support this question:

* We didn't notice poorly optimized games when we're younger
* The knowledge of game optimization and the increase of PC gamers has increased
* There is [Survivorship bias](https://en.wikipedia.org/wiki/Survivorship_bias) in what games actually make it to release
* It's easier to get into game development now, so lower level optimization is becoming a [lost art](https://www.youtube.com/watch?v=pW-SOdj4Kkk)
* "Optimization" is a difficult quality to measure


-------------------------------------------------------------------------------
I hear a lot about how perfect games were in the past and how terrible they are in the present - at least performance wise, and I wonder how much truth there is in that claim. Games are made to (hopefully) the best standard as possible in that moment. The notion of modern pc gaming didn't exist (and discussions of optimization on the internet) in the past, so maybe we would have complained about the frame-rate of Super Mario 64 if it was released today.

Optimization is something I'll keep in mind when developing my own games too. Stories from the past like the [development of crash bandicoot](https://youtu.be/izxXGuVL21o), or insane feats like [.kkrieger](https://en.wikipedia.org/wiki/.kkrieger) inspire me to do better. I know its impossible to make everyone happy, and it's impossible to optimize to every aspect of a game, but it's a constant learning process.

Some more links on this:

* [What 'optimization' really means in games](https://www.pcgamer.com/what-optimization-really-means-in-games/3/)
* [Code Optimizations for Game Development: Basic Structures and Mindsets](https://gamedevelopment.tutsplus.com/tutorials/code-optimizations-for-game-development-basic-structures-and-mindsets--cms-30760)
* [Basic Game Optimization Techniques](https://jarlowrey.com/blog/game-optimizations)
* [Optimization Patterns](http://gameprogrammingpatterns.com/optimization-patterns.html)


