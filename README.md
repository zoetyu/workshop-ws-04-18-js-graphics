# CS52 Workshops:  TITLE OF YOUR WORKSHOP

![](http://i.giphy.com/eUh8NINbZf9Ys.gif)

Brief motivation here as well as in presentation

## Overview

Summary of what we're about to do.

## Setup

Any necessary setup steps

## Step by Step

* Explanations of the what **and** the why behind each step. Try to include:
  * higher level concepts
  * best practices

Remember to explain any notation you are using.

```javascript
/* and use code blocks for any code! */
```

![screen shots are helpful](img/screenshot.png)

:sunglasses: GitHub markdown files [support emoji notation](http://www.emoji-cheat-sheet.com/)

Here's a resource for [github markdown](https://guides.github.com/features/mastering-markdown/).


## Summary / What you Learned

* [ ] can be checkboxes

## Reflection

*2 questions for the workshop participants to answer (very short answer) when they submit the workshop. These should try to get at something core to the workshop, the what and the why.*

* [ ] 2 reflection questions
* [ ] 2 reflection questions


## Resources

* cite any resources



### Adding a Results Chart 
* As of right now, the results modal tells you which character you are most like. But it doesn't tell you how much of each character you really are! Wouldn't it be cool to know what % of each character you are? Well we are going to put in a fun little chart to show you exactly that. yay. 
* We are going to use a CanvasJS chart to create this breakdown of your results for you. 
1. The first step is to add the canvas dependency into your ```index.html```. Right above the jquery script, add in ```<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>```
1. We need to write a few functions for this chart creation. The first is the ``` loadGraph() ``` function. ``` loadGraph() ``` holds all the logic about your chart and is very customizable. At the bottom of your ```main.js``` file, add in 
```function loadGraph() {
        var chart = new CanvasJS.Chart("graph", {

        })
  }```. We'll fill the rest in soon. 