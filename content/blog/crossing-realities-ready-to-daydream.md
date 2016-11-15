+++
id = "0009"
date = "2016-11-14T22:00:00+00:00"
title = "Crossing realities: Ready to Daydream!"
description = "Crossing realities is a series of blog posts where I share my knowledge and experiences as I explore the possibilities of VR. Here we will see how to configure Unity to create apps for Google Daydream."
author = "quentin"
tags = [ "Unity", "Cardboard", "VR", "Daydream" ]
+++

### Crossing realities tutorial
1. [The beginning of a VR journey](/blog/crossing-realities-the-beginning-of-a-VR-journey/)
2. [Baby steps into VR](/blog/crossing-realities-baby-steps-into-VR/)
3. Ready to Daydream!

## Daywhat?
So, Google finally released the [Daydream headset and controller](https://vr.google.com/intl/en_uk/daydream/headset/ "Daydream"), but what is Daydream anyway? Well, Daydream is not only about hardware, its also a set of specifications. To be able to use the Daydream controller a phone must have Google's "Daydream seal of approval", which means that it has been deemed powerful enough to run VR apps. This might looks like an annoying limitation, but it's actually a good thing for two reasons. First it gives us developers a base hardware to work on, so we can be sure that any VR app built for a Daydream phone will run smoothly on other Daydream devices. And last but not least, it gives users an idea of which devices they should use to run VR apps, so they don't shout "VR is sh**!" and turn completely away from it because they had a bad experience on a device not powerful enough for VR.


## I want to take control!
From a technical perspective the headset is like a standard Cardboard, with the addition of a headband so you don't have to hold it. It's also a lot more comfortable than any other Cardboard I tried.

The controller is a lot more interesting, first because it increases **a lot** the possible interactions. Without it you only have one single button to do all your interactions, which means that most of the time you have to trick your way out of this issue.

The controller is about 10cm long and 3.5cm wide. It features a circular touchpad that also has a pressure button, a *Home* button and an second button that you can configure (plus 2 volume buttons). I would personally have loved the controller to also have a trigger, but it would have required a longer and larger one.

 It can track its own orientation as well as the rotation speed and acceleration. **BUT** it **cannot** track its position. Concretely, it knows where it's pointing at, so you can point it in a direction to select an object, but it doesn't know if you are moving your arm forward and backward (or left and right), so you can't move the controller on a virtual object to grab it. This is the main difference with the [HTC Vive](https://www.vive.com/uk/product/ "HTC Vive") controller.


## How do I start?

If you want to have fun with the controller and create your own Daydream apps in [Unity](https://unity3d.com/ "Unity") here what worked for me:

### 1. Daydream technical preview
You need a special version of Unity called *Unity Daydream technical preview*. You can get it [*here*](https://unity3d.com/partners/google/daydream "Daydream technical preview"). Once you've downloaded it install it like a normal Unity version, it should be rather straightforward but if you have difficulties look at my previous blog post on how to [*configure Unity for Cardboard*](/blog/crossing-realities-the-beginning-of-a-VR-journey/ "The beginning of a VR journey"). By default it should install next to your normal Unity version (if you have any) and not overwrite it. You can check the name of the installation folder to check this. it also means that you must be careful and not open the wrong version of Unity...

While it's installing you can download Android SDK 24.

### 2. Download Android Nougat SDK
In order to compile your Daydream apps you need the *SDK Platform* and *Android SDK Build-tools* for *Android 7.0 (API 24)*. To get that, launch the *Android SDK Manager*, either from Android Studio as described [*here*](https://developer.android.com/studio/intro/update.html#sdk-manager "Android SDK Manager") or from command line: Mac `~/Library/Android/sdk/tools/android` and Windows !!!TODO!!!. Those paths may vary depending on how you installed it.

If you don't have *Android SDK Manager* then you can either download all *Android Studio* or *Get just the command line tools* [here](https://developer.android.com/studio/index.html#downloads "Android Studio"). If you choose the second option extract the file to the desired location and launch `./tool/android` from the command line.

EXPLAIN WHAT TO CHEK IN SDK MANAGER + IMAGE

### 3.
EXPLAIN CHANGE SDK LOCATION IN UNITY IF NEEDED

### 4.
EXPLAIN CONFIGURE
Go to the Android Player Settings -> Other Settings and enable “Virtual Reality Supported” (as shown in the screenshot). Add Daydream to the list of Virtual Reality SDK’s.

### 5.

### 6.
EXPLAIN DAYDREAM ICONS FOR release

### 7.
SAY START app

###
LINK TO STORE APP

 ###
LINK TO OPENSOURCE PROJECT
