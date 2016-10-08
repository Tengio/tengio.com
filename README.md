Tengio website
==============

Live version
------------
[tengio.com](http://www.tengio.com)

Our [blog post](http://www.tengio.com/blog/company-website-using-hugo/) is a good introduction to hugo and how this website code works.

Developing locally
------------------
Simply run the command:
```
hugo server --buildDrafts -w .
```
When the process is running open a browser on localhost:1313. As you do changes to the files the website is refreshed.
Changes to ```config.toml``` require hugo to restart.

In alternative you can also you ```./start``` command which uses python app engine server running on port 8080. In this case you can use ```hugo -s .``` to regenerate content as you make changes.

Home page
---------
Most of the data is controlled by the config.toml file. It is rendered through layouts files and partials.

These are the main sections:

* "hero.html"
* "services.html"
* "portfolio.html"
* "about.html"
* "values.html"
* "contact.html"

this order is defined in ```/layouts/index.html```.

Blog posts
----------
You can write a new blog post using md just by adding a file to ```content/blog/blog-post-title.md```.
Each blog post requires some metadata at the beginning of the file. This is an example:
```
+++
id = "0003"
date = "2016-08-12T11:00:58+05:30"
modified = "2016-08-16T17:25:58+05:30"
title = "Getting caffe for ai working on Linux"
author = "shreyas"
tags = [ "AI" ]
+++
```
Images used by the articles are stored into ```static/img/blog/0003/*.jpg```.

So far we have implemented 3 types of images in blogs:

**article-img** : image takes 100% of the width.
```
![article-img](/img/blog/0004/hugo.jpg)
```

**article-img-centered** : image is placed in the center, on mobile get to the 100% to not brake horizontal scrolling.
```
![article-img-centered](/img/blog/0004/hugo.jpg)
```

**modal-image** : opens a modal almost full screen to see the "modal" image. This is disable for small screen.
```
<img
  class="modal-image"
  src="/img/blog/0006/unity_GoogleVR_demoScene_layout_2by3.jpg"
  alt="article-img"
  title="2 by 3 layout">
```

Markdown Cheatsheet
-------------------
Have a look at the nice [github markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) if you want to know more about MD format.


Contribute with blog post
-------------------------
Fork the project and submit a pull request to github. Blog post should be compost of md file and images if necessary.

Release and gulp :metal:
------------------------------------
Make sure to use the correct version (in static/app.yaml).

Release uses [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and some other [doc](https://gulp.readme.io/docs/getting-started).

This are main task implemented for you with gulp:
- default task prepare local version using go, also listen to changes and automatically update content : ```gulp```
- run local version using app engine : ```gulp run```
- build and deploy on appengine : ```gulp deploy```

Tools
-----

We use the following open source tools:

- [hugo](https://gohugo.io)
- [jquery](https://jquery.org)
- [animate.css](https://github.com/daneden/animate.css)
- [font-awesome](http://fontawesome.io)
- [bootstrap](http://getbootstrap.com)

Please make sure to understand and respect the corresponding licenses if you reuse this code.

License
-------

(c) Copyright 2016 Tengio Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
