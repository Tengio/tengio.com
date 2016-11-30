+++
id = "0010"
date = "2016-11-29T17:40:27+00:00"
title = "State List Animators for Custom View"
description = "Creating State List Animators for Custom Views or Drawables"
author = "akshay"
tags = [ "Android" ]
draft = true
+++

![article-img](/img/blog/0010/animator.jpg)

## Introduction

Material Design has been around for a few years now, and one of the fundamental aspects of Material Design is motion. Excerpt taken from the Material Design documentation:


>Motion shows how an app is organized and what it can do. Motion provides:
>
>* Guided focus between views
>* Hints at what will happen if a user completes a gesture
>* Hierarchical and spatial relationships between elements
>* Distraction from what’s happening behind the scenes (like fetching content or loading the next view)
>* Character, polish, and delight

## What is a state list animator?

From the Android docs a State List Animator "Lets you define a number of Animators that will run on the attached View depending on the View's drawable state. It can be defined in an XML file with the <selector> element. Each State Animator is defined in a nested <item> element."

In practice its what makes a button appear to rise up when you touch it on a Material Design Android app. You can specify the StateListAnimator for a view like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:stateListAnimator="@drawable/lift_on_touch"/>
```

Our state list drawable looks like:

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_pressed="true">
        <set>
            <objectAnimator android:propertyName="translationZ"
                            android:duration="@android:integer/config_shortAnimTime"
                            android:valueTo="2dp"
                            android:valueType="floatType"/>
        </set>
    </item>
    <item android:state_pressed="false">
        <set>
            <objectAnimator android:propertyName="translationZ"
                            android:duration="100"
                            android:valueTo="0dp"
                            android:valueType="floatType"/>
        </set>
    </item>
</selector>
```
The drawable is placed in, surprise! surprise! the drawable folder. We've provided two states, when its pressed and when its not, the behavior of which is quite self explanatory.

Well, that covers the fundamentals of the state list animator, and this works for simple scenarios such as with a CardView.

## Custom View and Shapes

Sometimes, you may need a StateListAnimator for an irregular shape. What do you do then? The default behaviour of the StateListAnimator is to create its shadow in the form or a rectangle. Now is when it gets interesting, in API versions 21 and above, you have a method in the view: setOutlineProvider, this is your friend. View.setOutlineProvider enables you to define a custom outline which in turn defines the bounds for your StateListAnimator. So lets say I had a round button, I'd set a ViewOutlineProvider for my round button like this:

```java
Button button = findViewById(R.id.button);
ViewOutlineProvider viewOutlineProvider = new ViewOutlineProvider() {
           @Override
           public void getOutline(View view, Outline outline) {
             int roundButtonSize = (int) getResources().getDimension(R.dimen.round_button);
             outline.setOval(0, 0, roundButtonSize, roundButtonSize);
           }
       };
button.setOutlineProvider(viewOutlineProvider);
```

Right so this works if I know the size of my button and the shape is uniform, i.e. a circle in this case, but we had an interesting problem, which I'm sure many of you do as well. We were creating a re-usable library for simple Chips on Android, which we can share between projects. As per the Material design documentation the chip must have certain properties, i.e. the ripple as well as rise on touch. We first created a Ripple drawable for the chip background like:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ripple xmlns:android="http://schemas.android.com/apk/res/android"
        android:color="?android:attr/colorControlHighlight">
    <item android:id="@android:id/mask">
        <shape android:shape="rectangle">
            <solid android:color="#000000" />
            <corners android:radius="16dp" />
        </shape>
    </item>
    <item>
        <shape android:shape="rectangle">
            <corners android:radius="16dp"/>
            <solid android:color="@color/black_16"/>
        </shape>
    </item>
</ripple>
```

and now we have the problem of rise on touch, If we were to set the StateListAnimator on the view, we ended up having a rectangular shadow on the chip. Only option for us was to go with using the ViewOutlineProvider. Now I didn't want to hardcode values like we see in the example above, a bit of digging around the SDK and boom! You could actually generate an outline from a drawable, this would mean that if the drawable has a certain shape, you could essentially use that shape to generate the outline for the StateListAnimator. That is awesome! So here we go:

```java
ViewOutlineProvider viewOutlineProvider = new ViewOutlineProvider() {
           @Override
           public void getOutline(View view, Outline outline) {
               Drawable drawable = view.getBackground();
               drawable.getOutline(outline);
           }
       };
       this.setOutlineProvider(viewOutlineProvider);
```
and viola! we've got a wonderful rise on touch that corresponds to the shape of my chip.
