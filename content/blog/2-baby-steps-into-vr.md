+++
id = "0008"
date = "2016-09-16T15:30:00+00:00"
title = "Crossing realities: A VR journey"
description = "TODO"
author = "Quentin"
tags = [ "Unity" "Cardboard" "VR" "tutorial" ]
+++

## Baby steps into VR
In this section we will see how you can move around in VR.

First create a new project `(File > New Project`) with any name you fancy and with 3D checked. Then load the *GoogleVRForUnity* package (`Assets > Import Package > Custom Package`) and select everything but the *DemoScene* folder.

![article-img-centered](https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/0008/2_0_unity_import_GoogleVRForUnity_package.png "Import package")

Now go to `GoogleVR > Prefabs` folder and drag and drop the *GvrViewerMain* prefab to your scene. This element will handle a lot of thinks for you (until cardboard becomes native in Unity and we don't need it anymore  :smiley:).

Let's create our player. On the Hierarchy tab click `Create > 3D Object > Capsule`. Rename your capsule *Player* and drag and drop the *Main Camera* object that was automatically create for you by Unity into your *Player*. Now got to `GoogleVR > Prefabs > UI` and drag and drop the *GvrReticle* prefab inside the *Main Camera*. Then add a [*Physics Raycaster*](https://docs.unity3d.com/Manual/Raycasters.html "Raycasters") to your *Main Camera* by selecting it, clicking `Add Component` in the Inspector tab and typing “Raycaster” in the search field. Your hierarchy should look like this by now:

![article-img-centered](https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/0008/2_1_hierarchy.png "Hierarchy")

Now we can see that the *Main Camera* object is not centered properly inside the *Player* (by looking at the *Transform Position*). It's common that objects get placed at unwanted position when created. To reset the position to the origin click on the small cog on the top right corner of the Transform component and click `Reset Position`. Or you can do it manually by setting *X*, *Y* and *Z* to zero.
Now if we click *Play* we can simulate head movement by holding the “alt” key and moving the mouse. There is also a reticle in the center of our view. But we cannot move yet, and there is nothing to move to anyway.

Let's add a floor to move on and an object to move to. Create a plane at the root of your Hierarchy (`Create > 3D Object > Plane`) and increase it's scale to (5, 5, 5). Now create a cube in the same way and move it somewhere near your Player, like (0, 2, 5). Move your player out of the floor by increasing it's *Y* position to 1. You should have something like this now:

![article-img-centered](https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/0008/2_2_scene.png "Scene")

Create a folder named *Scenes* in your *Asset* folder and save your scene in it (`File > Save Scene`).

And now that we have our environment set up we can start moving! One think you need to keep in mind when working with a Cardboard is that you only have one button, so all your in game interactions must be done with this single button (until Google release the [Daydream](https://vr.google.com/daydream/ "Google Daydream") controller :wink:).

We have several options to move around, each one having advantages and disadvantages, so it really depends on what kind of movement you want to achieve.
### Rigidbody with gravity
This type of movement is physics based, so you are submitted to gravity and can fall, which make it realistic. You will be able to move in the direction you are facing by holding the left mouse button or holding the trigger of the Cardboard.

First add a [*Rigidbody*](https://docs.unity3d.com/Manual/class-Rigidbody.html "Rigidbody") to the *Player* (`Add Component` button in the Inspector tab and type *Rigidbody*). Then create a folder called *Scripts* in your *Assets* folder and create a new script in it (right click on the folder and `Create > C# Script`) that you will call *PlayerMotorRigidbody*. Open the script (double click on it) and copy-paste the following code (replace all the auto-generated code):

```cs
using UnityEngine;

public class PlayerMotorRigidbody : MonoBehaviour 
{
  
    /* 
     * When trigger is down moves in the direction facing the main camera.
     */

    [SerializeField]
    private float speed = 6f;

    private Rigidbody rb;

    void Awake()
    {
        rb = GetComponent<Rigidbody>();
        rb.freezeRotation = true;
    }

    void FixedUpdate()
    {
        if (Input.GetButton("Fire1"))
        {
            Move();
        }
    }

    void Move()
    {
        Vector3 direction = Camera.main.transform.forward;
        direction.y = 0f; // Prevent unwanted jumping when looking up.

        Vector3 movement = direction * speed * Time.deltaTime;

        // Move the player to it's current position plus the movement.
        rb.MovePosition(transform.position + movement);
    }
}
```

Here is a quick explanation for the key parts of this code:

* [`rb.freezeRotation = true;`](https://docs.unity3d.com/ScriptReference/Rigidbody-freezeRotation.html " Rigidbody.freezeRotation")  => Prevent all rotation of the *Player*, so it doesn't topple.
* [`FixedUpdate`](https://docs.unity3d.com/ScriptReference/MonoBehaviour.FixedUpdate.html "MonoBehaviour.FixedUpdate()") instead of [`Update`](https://docs.unity3d.com/ScriptReference/MonoBehaviour.Update.html "MonoBehaviour.Update()") => Because we are dealing with a *Rigidbody* (see Unity Doc).
* [`Input.GetButton("Fire1")`](https://docs.unity3d.com/ScriptReference/Input.GetButton.html "Input.GetButton") => Detect when the Cardboard trigger is down (or mouse left click).

Drag and drop the script on the *Player*. Now you can click to move in the direction you are facing! (when the game is running in the editor, you can look around by holding “alt”). You can test it on your cardboard, just do the same build steps that you did for the [demo scene](https://developers.google.com/vr/unity/get-started-android#build_and_deploy_to_an_android_device "Get started Android").

When moving around you may notice that it's sometimes hard to see if you are actually moving or not, specially if you can't see the cube. To fix that I often draw a chessboard pattern on the plane using a [*Material* with a custom *Shader*](https://docs.unity3d.com/Manual/Shaders.html "Materials, Shaders & Textures").
First create a folder called *Materials* in your *Assets* folder, then right click on the folder and select `Create > Material`, call it *Chessboard* (or whatever you like). Now create a new *Shader* (`Create > Shader > Unlit Shader`) and open it with a double click. Replace the existing code with this one:
```c
Shader "Custom/ChessboardShader" {
    Properties
    {
        _Density ("Density", Range(2,50)) = 30
    }
    SubShader
    {
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };

            float _Density;

            v2f vert (float4 pos : POSITION, float2 uv : TEXCOORD0)
            {
                v2f o;
                o.vertex = mul(UNITY_MATRIX_MVP, pos);
                o.uv = uv * _Density;
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                float2 c = i.uv;
                c = floor(c) / 2;
                float checker = frac(c.x + c.y) * 2;
                return checker;
            }
            ENDCG
        }
    }
}
```
I will not explain how this code works as shaders are rather difficult to understand, and out of the  scope of this tutorial. But if you are interested (and I found it very interesting) you can read more about what shaders do and how they work [here](https://docs.unity3d.com/Manual/SL-VertexFragmentShaderExamples.html "Vertex and fragment shader examples") (that's where I got this piece of code).

Now drag and drop your shader on your material, then drag your material on the plane.

![article-img-centered](https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/0008/2_3_scene_chessboard.png "Scene with chessboard")

TODO finish it :grin:
