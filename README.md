# CS52 Workshops:  Introduction to JS Graphics

![](http://i.giphy.com/eUh8NINbZf9Ys.gif)

Javascript graphical libraries are a powerful and fun way to add elaborate animations to your apps and websites! Today we're going to try some out for ourselves and see how these tools can be used to enhance our own projects.

## Overview

Today we're going to build on an existing Buzzfeed quiz with some animations! By the end of the workshop, you will have a quiz with fancy animations throughout, created using mo.js, and a graphical representation of results each time the quiz is taken.

## Setup

First we need to load in the mo.js library! In you index.html file, add the following to the *body* section.

```html
<script src="//cdn.jsdelivr.net/mojs/latest/mo.min.js"></script>
```

## Part 1: Add a "Burst" Click Effect

The click effect we want to achieve consists of several shapes. The first we want to create is a ```Burst``` object. The Burst is a special module in mojs that gives us the "bursting" quality of animation. Here is the code we want to use for our burst:

```javascript
const burst = new mojs.Burst({ 
  left: 0, top: 0,
  radius: { 0: 100 },
  count: 12,
  children: {
    shape: 'polygon',
    radius: 20,
    angle: { 360: 0 },
    fill: { '#f70909' : '#eddc80' },
    duration: 1300
  }
});
```

We control how the animation plays out by specifying specific properties such as ```left``` and ```top```, which determine the initial position of the burst, ```radius```, which determines the radius of the circle formed by all the burst particles, and ```count```, which determines the number of shapes or particles in a single burst. Since all the particles in the burst animation are considered to be children of the original ```Burst``` object, we can control the individual particles with the ```children``` property. In this case, the children are polygons.


The next shape we want to use in our animation is a circle. The circle will expand out with our burst to add to the nice bursting effect.

```javascript
const circle = new mojs.Shape({
  left: 0, top: 0,
  count: 10,
  stroke: { '#e2441d' : '#f99931' },
  strokeWidth: { 20 : 0 },
  fill: 'none',
  scale: { 0: 1.5, easing: 'elastic.out' },
  radius: { 0: 60 },
  duration: 1000,
  opacity:  { 1: 0.2 }
});
```
We use the simple shape tools available through mojs to create a circle. Calling ```new.mojs.Shape()``` creates a circle by default. We then define the basic properties of ```stroke```, ```strokeWidth```, ```fill```, ```radius```, ```opacity```, etc.  We also define a few parameters that animate our circle, such as ```duration``` and ```easing```, which we define as "elastic.out," which makes our circle expand out in a similar way to our burst.

The final component of our click effect that we need to add is the whirling effect that makes it spin in and out. Our first step is to use the mojs ```CustomShape``` functionality to create a custom shape called 'whirl'. 

```javascript
class Whirl extends mojs.CustomShape {
  getShape () {
    return '<path d="M50.9,17c0.5,0.1,1,0.2,1.5,0.3c0.1,0,0.2,0,0.3,0c0.7,0,1.3-0.5,1.5-1.2c0.2-0.8-0.3-1.6-1.1-1.8c-0.5-0.1-1-0.2-1.6-0.3    c-0.8-0.2-1.6,0.4-1.8,1.2C49.5,16,50,16.8,50.9,17z"></path><path d="M57.1,18.7c15.5,5.9,19.7,20.1,19.7,27.6c0,9.7-7.5,24.2-23.4,24.2c-7.1,0-13-3.7-15.8-9.9c-2.3-5.2-1.9-11,1.2-14.4    c0.5-0.6,0.5-1.6-0.1-2.1c-0.6-0.5-1.6-0.5-2.1,0.1c-3.9,4.4-4.5,11.3-1.7,17.6c3.3,7.3,10.2,11.6,18.5,11.6    c18,0,26.4-16.2,26.4-27.2c0-11.1-6.7-24.8-21.6-30.4c-0.8-0.3-1.6,0.1-1.9,0.9C55.9,17.5,56.3,18.4,57.1,18.7z"></path><path d="M84.8,49.7C84,49.5,83.2,50,83,50.9c-0.1,0.5-0.2,1-0.3,1.5c-0.2,0.8,0.3,1.6,1.1,1.8c0.1,0,0.2,0,0.3,0    c0.7,0,1.3-0.5,1.5-1.2c0.1-0.5,0.2-1,0.3-1.6C86.1,50.6,85.6,49.8,84.8,49.7z"></path><path d="M83.2,56.2c-0.8-0.3-1.6,0.1-1.9,0.9c-5.9,15.5-20.1,19.7-27.6,19.7c-9.7,0-24.2-7.5-24.2-23.4c0-7.1,3.7-13,9.9-15.8    c5.2-2.3,11-1.9,14.4,1.2c0.6,0.5,1.6,0.5,2.1-0.1c0.5-0.6,0.5-1.6-0.1-2.1c-4.4-3.9-11.3-4.5-17.6-1.7    C30.9,38.1,26.5,45,26.5,53.3c0,18,16.2,26.4,27.2,26.4c11.1,0,24.8-6.7,30.4-21.6C84.4,57.3,84,56.5,83.2,56.2z"></path><path d="M49.1,83c-0.5-0.1-1-0.2-1.5-0.3c-0.8-0.2-1.6,0.3-1.8,1.1c-0.2,0.8,0.3,1.6,1.1,1.8c0.5,0.1,1,0.2,1.6,0.3    c0.1,0,0.2,0,0.3,0c0.7,0,1.3-0.5,1.5-1.2C50.5,84,50,83.2,49.1,83z"></path><path d="M42.9,81.3c-15.5-5.9-19.7-20.1-19.7-27.6c0-9.7,7.5-24.2,23.4-24.2c7.1,0,13,3.7,15.8,9.9c2.3,5.2,1.9,11-1.2,14.4    c-0.5,0.6-0.5,1.6,0.1,2.1c0.6,0.5,1.6,0.5,2.1-0.1c3.9-4.4,4.5-11.3,1.7-17.6C61.9,30.9,55,26.5,46.7,26.5    c-18,0-26.4,16.2-26.4,27.2c0,11.1,6.7,24.8,21.6,30.4c0.2,0.1,0.4,0.1,0.5,0.1c0.6,0,1.2-0.4,1.4-1    C44.1,82.5,43.7,81.6,42.9,81.3z"></path><path d="M16.2,45.9c-0.8-0.2-1.6,0.3-1.8,1.1c-0.1,0.5-0.2,1-0.3,1.6c-0.2,0.8,0.4,1.6,1.2,1.8c0.1,0,0.2,0,0.3,0    c0.7,0,1.3-0.5,1.5-1.2c0.1-0.5,0.2-1,0.3-1.5C17.5,46.9,17,46.1,16.2,45.9z"></path><path d="M46.3,23.3c9.7,0,24.2,7.5,24.2,23.4c0,7.1-3.7,13-9.9,15.8c-5.2,2.3-11,1.9-14.4-1.2c-0.6-0.5-1.6-0.5-2.1,0.1    c-0.5,0.6-0.5,1.6,0.1,2.1c2.6,2.3,6,3.4,9.7,3.4c2.6,0,5.3-0.6,7.9-1.8c7.3-3.3,11.6-10.2,11.6-18.5c0-18-16.2-26.4-27.2-26.4    c-11.1,0-24.8,6.7-30.4,21.6c-0.3,0.8,0.1,1.6,0.9,1.9c0.8,0.3,1.6-0.1,1.9-0.9C24.6,27.4,38.8,23.3,46.3,23.3z"></path>';
  }
}
mojs.addShape( 'whirl', Whirl );
```

Now, we are going to use something special in mojs called path easing. This allows us to pass in an SVG path as an easing value to define the path of the animation. 

```javascript
const whirlE = mojs.easing.path('M0,3.3S104.4,146.8,104.4,366.8c0,0,10.6-586.5,68.8-76.5,0,0,40.6-359.4,88.8-50,0,0,35.3-194.7,74.7-15.9,0,0,35.9-81.8,63.2,2.4');
```

Now we can create a new shape of our custom shape structure and define the ```easing``` property to be easing path we just defined.

```javascript
const whirl = new mojs.Shape({
  left: 0, top: 0,
  shape: 'whirl',
  angle: { "-800" : 0 },
  fill: { '#e2441d' : 'yellow' },
  scale:  { 0 : 1 },
  easing: whirlE,
  duration: 1300,
  opacity:  { 0: 1 },
  radius: 60
});
```

Now we want to determine the overall animation path for our click effect. For this we want to create a ```timeline```, which is a mojs tool that defines a series of animations. Mojs allows you to either ```add``` or ```append``` objects that have been declared. Adding objects/shapes will fire them all off at once, whereas appending will stagger them in the order they are added. For our desired animation, we want all the animations to play at once, so we use ```add```. The following code creates the timeline:

```javascript
const timeline = new mojs.Timeline();

timeline
  .add( burst, circle, whirl );
```

Now we just need to make the animation fire on click! The following code achieves this:

```javascript
var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

document.addEventListener(clickHandler, function(e) {
  const coords = { x: e.pageX, y: e.pageY };
  
  burst.tune(coords);
  circle.tune(coords);
  whirl.tune(coords);
  
  timeline.replay();
}, false);
```

Play around with these to see how the different parts of the animation fit together! Modify your timeline to just add each of the individual elements you want to see and reload your page and see how the click effect changes. For example, if you just want to see the burst effect, change your timeline add line to: ```timeline.add(burst)```, or to see what just the burst and the circle would look like, use ```timeline.add(burst, circle)```!


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
