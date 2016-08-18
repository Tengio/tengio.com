Tengio website
==============

Live version
------------
[tengio.com](www.tengio.com)

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
You can then refer to the images directly in the md file like:
```
![article-img](/img/blog/0004/hugo.jpg)
```
**NOTE**: The alternative text of the image is used to apply some css rule (article-img : for example fit the image to the content width).

Release
-------
Make sure to use the correct version (in static/app.yaml).

Run hugo commad to generate sources.

```
hugo -s .
```

You can verify final version before deploy if you have appengine go sdk with:

```
./start.sh
```

One all is done, deploy with:

```
./deploy.sh
```

Tools
-----

We use the following open source tools:

- [hugo](https://gohugo.io)
- [jquery](https://jquery.org)
- [wow](https://github.com/matthieua/WOW)
- [font-awesome](http://fontawesome.io)
- [bootstrap](http://getbootstrap.com)
- [classie](https://github.com/ded/bonzo)
- [start bootstrap](http://startbootstrap.com)

Please make sure to understand and respect the corresponding license if you reuse this code.

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
