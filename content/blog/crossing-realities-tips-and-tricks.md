+++
id = "0014"
date = "2017-01-19T22:00:00+00:00"
title = "Crossing realities: Tips & Tricks"
description = "Crossing realities is a series of blog posts where I share my knowledge and experiences as I explore the possibilities of VR. Here is a list of interesting stuffs and code samples I built as I wander around in VR."
author = "quentin"
tags = [ "Unity", "Cardboard", "VR", "Daydream", "GearVR", "Oculus" ]
+++

![article-img-centered](/img/blog/0014/insert_code_here.PNG "Tips & Tricks")

### Crossing realities tutorial
1. [The beginning of a VR journey](/blog/crossing-realities-the-beginning-of-a-VR-journey/)
2. [Baby steps into VR](/blog/crossing-realities-baby-steps-into-VR/)
3. [Ready to Daydream!](/blog/crossing-realities-ready-to-daydream/)
4. Tips & Tricks

## So, what's up here?
This section is not a tutorial so to speak, it contains useful information and tools I built as I explored VR.

### Content
1. [Ghosthands: an Input Module for Oculus Touch in Unity](#ghosthands-an-input-module-for-oculus-touch-in-unity)


## Ghosthands: an Input Module for Oculus Touch in Unity

![article-img-centered](/img/blog/0014/ghosthands.jpg "Ghosthands")

### The story
When we started to port one of our games from Google Daydream to the Oculus Rift the first thing I thought was that I would really miss the *Input Module* I hacked together for the Daydream controller. I used it for all the UI, and it reduces the complexity of the code a lot, as it allows me to delegate a lot of the behaviour directly to the menu itself (instead of detecting manually whether or not a menu is looked at and then tell the menu to do what it has to).

But my experience of hacking the Daydream *Input Module* was telling me that building that kind of thing would be really challenging. Hell, it might not even be possible at all for what I knew! But yet, if it does work then it will save use a lot of time and troubles, so let's try!

And there I went, diving so deep in Unity that I reached parts where there is no documentation anymore (and for Unity it means you have gone wayyyyy out of the beaten tracks). After a few hours of digging and testing I started to get a clearer picture of the monster hiding behind Unity's abstraction layers. It was still unclear at that time if I could tame the beast, but I had gone to far to step back, so I went on. Going through Unity source code to better analyze my opponent I put together a strategy. Inheriting where I could and copy-pasting where I had to, refining at every new iteration, I slowly crafted my tools, preparing for the final assault. And there I went, surrounding the mighty creature with my interfaces, luring it with my classes. I got bitten a few times but slowly it resistance lowered, until we started to understand each other. Crafting our own words we managed to communicate, understand each other needs, and fulfil them. We made it, the magic happened.

But enough with the tales of my adventures, here is what you can do with this *Input Module*.

### The uses
If you are familiar with Unity [*Event Triggers*](https://docs.unity3d.com/Manual/script-EventTrigger.html) you know that you can use them to interact with *GameObjects* using your mouse. Google have created an *Input Module* to detect gazed based event for the Cardboard, which is pretty handy to create cool interactions :). And if you don't know *Event Triggers* then you definitely have to [watch this tutorial](https://unity3d.com/learn/tutorials/topics/user-interface-ui/ui-events-and-event-triggers) by Unity!

![article-img-centered](/img/blog/0014/event_trigger_mouse.PNG "Mouse Event Trigger")
<center>Mouse Event Trigger</center>

What Ghosthands does is giving you the same flexibility by offering you a range of events to listen to for the Oculus Touch controllers.

![article-img-centered](/img/blog/0014/event_trigger_oculus_touch.PNG "Oculus Touch Event Trigger")
<center>Ghosthands Event Trigger</center>

What it **doesn't do** (yet) is send events to UI elements that don't have a collider (but if you add a collider it will work fine).

### The setup
You don't have much to do to use this plugin, it the same setup as using Unity *Event System*:

1. Get the [*Unity Package*](https://docs.unity3d.com/Manual/AssetPackages.html) and import it in your project.
2. Create an [*EventSystem*](https://docs.unity3d.com/Manual/EventSystem.html) GameObject in your Scene (`Create > UI > Event System`), remove the *Standalone Input Module* component from it, add an *Oculus Touch Input Module* (`Add Component > Event >  Oculus Touch Input Module`).
3. Drag and drop the *LeftHandAnchor* and *RightHandAnchor* GameObjects from your *OVRCameraRig > TrackingSpace* GameObject into the corresponding slots of the *Oculus Touch Input Module*.
4. Go to any GameObject for which you want to register an event. Make sure that it has a collider (it works fine if the collider is trigger). Add a *Oculus Touch Event Trigger* component (`Add Component > Event >  Oculus Touch Event Trigger`). And use it as you would for a classic *Event Trigger*!

![article-img-centered](/img/blog/0014/oculus_touch_input_module.PNG "Event System")

### The bonus
I added a handy Debug Lines option (check the box in the *Oculus Touch Input Module*) which trace a line from each controller in its forward direction, so you can see clearly where you are pointing at.

![article-img-centered](/img/blog/0014/debug_lines.PNG "Debug Lines")

### The parameters
In *Oculus Touch Input Module*:

 - **Max Raycast Distance**: Objects farther than this from the controller will not be detected (in Unity units).
 - **Raycast Radius**: Behind the scene the raycast is actually a [Physics.SphereCast](https://docs.unity3d.com/ScriptReference/Physics.SphereCast.html), which allows you to grab objects from far without having to be exactly on them. *Raycast Radius* allow you to choose the width of the shperecast. Use 0 to raycast instead of shperecast. Note that this inherits the weaknesses of Unity spherecast: *"SphereCast will not detect colliders for which the sphere overlaps the collider"*. So don't set it too big for small objects.
 - **Raycast Mask**: Which [Layers](https://docs.unity3d.com/Manual/Layers.html) are used for detection.
 - **Left Hand Anchor**: [CF previously](#the-setup)
 - **Right Hand Anchor**: [CF previously](#the-setup)
 - **Debug Lines**: [CF previously](#the-bonus)

Here is a list of the events currently supported by the module:

- PointerEnter
- PointerExit
- LeftPointerEnter
- LeftPointerExit
- RightPointerEnter
- RightPointerExit
- LeftIndexTrigger
- LeftIndexTriggerDown
- LeftIndexTriggerUp
- RightIndexTrigger
- RightIndexTriggerDown
- RightIndexTriggerUp
- LeftHandTrigger
- LeftHandTriggerDown
- LeftHandTriggerUp
- RightHandTrigger
- RightHandTriggerDown
- RightHandTriggerUp
- AButton
- AButtonDown
- AButtonUp
- BButton
- BButtonDown
- BButtonUp
- XButton
- XButtonDown
- XButtonUp
- YButton
- YButtonDown
- YButtonUp
