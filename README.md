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

2. We need to write a few functions for this chart creation. 
The first thing we want to do is be able to calculate the percentage of each answer a user is. So lets write a function called ```getPercentage```. This can really be placed anywhere, but lets put it right under the comment that says 'CHART STUFF HERE'. 
We're going to index into our array of frequencies for each answer in order to find the percentage, so we want to declare this function with a ```key``` parameter. This is the declaration: 
```javascript
  function getPercentage(key) {
  }
```
Now, we want to say that if the frequency of a certain key is > 0, return that frequency divided by the number of questions, multiplied by 100 to get a round percentage number. Otherwise, the percent is just 0. You can probs write the body of this yourself. Make sure to use ```parseInt``` on the value and ```parseInt(...).toFixed(2)``` will be helpful to achieve a nice round percent number. 

This is what you should have: 
```javascript  
  if (parseInt(frequencies[key]) > 0) {
    return parseInt((frequencies[key]) / num_questions * 100).toFixed(2)
  } else {
    return 0
  }
```

3. Okay, now we want to actually create a graph. We're going to put this all into a ``` loadGraph() ``` function. ``` loadGraph() ``` holds all the logic about your chart and is very customizable. Underneath your ```getPercentage``` method, add in 
```javascript 
  function loadGraph() {
        var chart = new CanvasJS.Chart("graph", {

        })
  }
```
The canvas chart module is pretty well-defined, so we're just going to use some of their presets to create our graph. They have properties like ```theme```, ```exportEnabled```(which just adds an option to print or share your graph), ```responsive```, and ```animationEnabled```. These are the settings we chose, but feel free to change them. 
```javascript 
  theme: "light2", // "light1", "light2", "dark1", "dark2"
  exportEnabled: false,
  animationEnabled: true,
  responsive: true,
  title: {
    text: "what % of each character are you?"
  },
```
There's also a whole data property. We're going to create a simple pie chart with some small animations (which we can turn off by setting ```animationEnabled``` to false). Here's the data module. Note that each y variable is the percentage of a different "key" - which are just our four different possible results. 
```javascript
    data: [{
      type: "pie",
      startAngle: 25,
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label}: {y}%",
      dataPoints: [
        { y: getPercentage("alexis"), label: "Alexis" },
        { y: getPercentage("david"), label: "David" },
        { y: getPercentage("moira"), label: "Moira" },
        { y: getPercentage("johnny"), label: "Johnny" },
      ]
    }]
  }); 
```
This is the end of our chart variable. Then call ```chart.render();``` and close out the ```loadGraph()``` function. That's it! You're welcome to play around with the different chart properties. 

4. The second-to-last step is making sure the chart refreshes each time you take the quiz -- without needing to refresh the page. This is important so the frequencies don't start adding up and making percentages > 100%. For this, we wrote a little function called ```resetFreqs()``` where we just loop through each key in frequencies and set it to 0. We call this in the ```onclick``` of span. Where do we want to call it in the ```window.onclick```? Most likely when you check whether the event you are clicking off of is the results modal. We have faith you all can write this function on your own. 

5. The final step is calling ```loadGraph()``` in the correct spot! We only want it to display when a user has full results, e.g. has answered all the questions. We want to set up a variable that checks whether a user has answered all the questions. So, in the second ```getJSON```, add in a ```var user_error = false```. Set this to true if the user hasn't answered all the questions. Finally, at the end of your ```getJSON```, you just want to put in a simple if statement to check user_error is false and load the graph if so. 

That's it!! Hope you enjoy finding out your results in chart form :) 