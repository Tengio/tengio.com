+++
id = "0007"
date = "2016-09-16T15:30:00+00:00"
title = "Crossing realities: A VR journey"
description = "TODO"
author = "Quentin"
tags = [ "Unity" "Cardboard" "VR" "tutorial" ]
+++

## Pack up the gears for your VR trip

The two main things you need to start developing VR apps is a Cardboard headset and Unity. You can get the first one for less than 10$ by ordering online and the second one for free.
### Choosing your weapon:
When choosing your Cardboard make sure that your model either have a magnetic trigger or a hole that let you tap on the screen. Some Cardboard models don't have any of those which limits a lot the possible interactions in game. Also check that it has a QR code. This QR code contains information to correct the distortion induced by the lenses.

### Unity setup

#### Install Unity
To get Unity just go on the official website (https://unity3d.com/) and download the “Personal” edition. When installing you will be asked which components you'd like to install, I use an Android phone for my builds so I tick the “Android Build Support” checkbox. If you want to build your apps for IOS tick “iOS Build Support”.

![article-img-centered](https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/0007/1_0_unity_install_components_selection.png "Unity install")

While Unity is installing you can create your compulsory Unity account (https://id.unity.com/account/new).
If you are new to Unity I highly recommend going through the “Roll-a-ball” tutorial. It's not VR but it's a really great tutorial and it will teach you the basis of both the interface and the logic of Unity. And at the end you will be proud to have your very first Unity game!

TODO- Going further: Add roll-a-ball for android CODE. BUT say about the android SDK before!

#### Setup Unity for Google Cardboard
The first think you need to do is download and install the required components to build on your target platform (here Android or IOS). This is not specific to VR, but since you will install your app on a device you need those components. The procedure is not the same for IOS and Android. I mostly build for Android, so I will focus on this platform. But, apart from the initial setup and final build steps, there should only be small differences.

The documentation for the Cardboard API is available on Google developers website (https://developers.google.com/vr/unity/). Follow the instructions on the “Get Started” section (https://developers.google.com/vr/unity/get-started-android) for the platform you are targeting. Once you've got through the boring prerequisite parts the fun begins and you can import and test the demo scene by following the instructions! Once you've hit the “Play” button you should see something like this:

![article-img-centered](https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/0007/1_1_unity_GoogleVR_demoScene_layout_default.png "Default layout")

If your screen size is big enough I recommend changing the layout of Unity to “2 by 3”, this way you can still see the scene view when the emulator is running. To do so click on the top right button (labelled “Default”) and select “2 by 3”. You should now see this:

![article-img-centered](https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/0007/1_2_unity_GoogleVR_demoScene_layout_2by3.png "2 by 3 layout")

Congratulation! Your first VR app is ready to run! Now follow the instructions to build it to your device. Once this is done the app should start automatically, place the device in your Cardboard and look around. This is VR!

So, if you are still here it means that you went through the boring but necessary part of setting up your dev environment, that's great! And you have your first VR app! Sure it doesn't do much right now, you can just look around and press the trigger. But that's a good start!

Now that we are all set we can actually start our journey in the heart of VR. And for this we will need to learn how to walk (and then run if we feel like it!). So the next section will be about the various ways you can move around in VR with a Cardboard.
