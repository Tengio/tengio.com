+++
id = "0013"
date = "2017-01-16T19:20:10+00:00"
title = "Oculus Touch Controls"
description = "Last week we had received our oculus touch controllers for the office and after having played super hot, and other such titles, we were all deeply satisfied..."
author = "harry"
tags = [ "VR", "Games" ]
+++

I tend to find myself in quite a lucky position at Tengio. Because I'm an intern I get to do quite a bit of porting of our products to other devices which in turn lets me play around with new opportunities presented by other platforms. This week I got the opportunity to port [our daydream app](http://www.tengio.com/blog/oz-chicken-slayer-case-study/) too oculus rift which leads to some exciting changes to the app.

Last week we had received our oculus touch controllers for the office and after having played super hot, and other such titles, we were all deeply satisfied with the new form of immersion oculus presented with the use of hand wrapping controllers.

![article-img-centered](/img/blog/0013/akshay.png)
*Akshay having a play with the controllers*

After learning a lot over the past week about touch controllers and the oculus SDK  I thought I'd write up about my findings and **thus present.**

## The step-by-step to touch control mastery 

***Getting everything together***

Before we start you'll need to make sure you have the following:

 - [Oculus Utilities Package](https://developer3.oculus.com/downloads/game-engines/1.10.0/Oculus_Utilities_for_Unity_5/)
 - [Oculus Avatar SDK](https://developer3.oculus.com/downloads/pc/1.10.1/Oculus_Avatar_SDK/)

 
You should now have something that looks very similar to this:

![article-img-centered](/img/blog/0013/projecttab.png)
*Note that I have also saved my scene and called it 'Main'*

Now that everything is together you'll want to open up the OVR folder and navigate to *OVR > Prefabs > OVRCameraRig*. Drag this into your scene and position appropriately. I advise spawning a few cubes and placing them around to give the scene some depth like so:

![article-img](/img/blog/0013/scene1.png)
*My scene setup*

If you open the up the OVR camera rig and then open up the tracking space object you'll note a couple of game objects. Firstly the Left, Center and Right eye anchors. This is your headset's position in 3D space that is updated in run-time. We'll cover how to work with these in future blog posts but for now let's focus back on the **controllers**. 

Again in the tracking space object, you'll discover two game objects that are called *LeftHandAnchor* and *RightHandAnchor* respectively. These objects, like the eye anchors, are the 3D positions of the controllers. If no controllers are present they will be at a position 0 upon runtime and won't budge. 

![article-img-centered](/img/blog/0013/anchors.png)
*Controller anchors*

Now if you have no need for  shader based hands then you can proceed with creating block based hands! This is the best and quickest way to check that your controllers are working within Unity. Simply spawn a cube and child it to the right hand and then doing the same for the left. Upon doing this **right click** the **transform component** of the cube and hit **reset**. Make sure to scale the cubes down as well to correlate with the controller's size, I went with a 0.2 scale factor. This positions it at the center of its parent, which in this case is the controller. Now when you move your hands around in-game, and everything has been setup correctly, you should see two cubes replacing your hand positions. 

![article-img](/img/blog/0013/minecraft_hands.png)
*Minecraft-esque hands!*

Cool right!? But it's still not that pretty. And this is where the oculus avatar SDK comes in. With it, oculus has provided an **AWESOME** prefab for you to use in your games. Simply navigate to *OvrAvatar > Content > Prefabs > LocalAvatar*. In this example, I'll be using the locally based avatar but they also provide one to be used over a network for multiplayer applications. Drag your avatar into the scene. If you happen to play the scene you will notice some weird error about needing an app ID. 

You can acquire an app id from the [oculus website](https://developer3.oculus.com/documentation/platform/1.1/tasks/dg-get-credentials/). Once you've acquired one you'll need to navigate to the avatar config edit. 

![article-img-centered](/img/blog/0013/editconfig.png)
*Edit Configuration*

Once you've pasted your App ID everything should load without a complaint. Now all you need to do is **drag your local avatar** into the **OVRCameraRig** object  and click **reset** on the **transform** again. This makes sure that the avatar is going to be positioned relative to the camera rig. There are quite a lot of settings that you can play around with on the Avatar script but well focus on the relatable ones for now.

![article-img-centered](/img/blog/0013/ovr_avatar.png)
*OVR Avatar Component*

As you can see on the component we have a few options relating to how our avatar will be displayed.

**Start With Controller**

*Set this to true if you want to view your controllers within the hands of your avatar. Handy for control scheme explanation.*

**Show First Person**

*Set this to true if you want to be able to see your hands in front of you but not the rest of your body*

**Show Third Person**

*Use this to display your avatar including your head, headset, body, and hands. This looks exactly the same as the avatar you see in the oculus home portal (when your headset is on).*

For now, we'll click show first person. Bare in mind to now delete the cubes  from the last example so that you don't have some weird mutant hands. Congratulations you are now one step closer to being the **ultimate** VR developer. Now hit play and see your new hands! Obviously, this is super cool and with oculus's new  capacitive-sensitive control surface's you can get down to the fine details really easily! See below for how I took this tracking capability and developed it a bit further with our daydream port. 

{{< youtube tumD1eRldJ8 >}}

## Congrats you made it to the end!

In what seems to be a very lengthy blog post for my first I feel that you should now be able to confidently navigate the oculus SDK and set it up for basic use. 

If you want to continue with your development and implement similar object grabbing mechanics that are present in my video, I suggest reading  [Matt Newport's blogs post](http://blog.mattnewport.com/hand-tracked-controls-in-vr-throwing/) & watch [Ben Robert's video.](https://www.youtube.com/watch?v=mFFta9OszzA) 

Thanks for reading & keep creating!