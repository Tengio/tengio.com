+++
id = "0004"
date = "2016-08-18T19:10:10+00:00"
title = "Company website using hugo"
description = "Having a website for your company is important. This is particularly true if you are a company that builds software. Software consultancies I’ve previously worked at always seemed to outsource the development of their website. Why is that? Mainly because of time. Can we make a website fast, without affecting quality?"
author = "luigi"
tags = [ "Web" ]
+++

![article-img](/img/blog/0004/hugo.jpg)

Having a website for your company is important. This is particularly true if you are a company that builds software. Software consultancies I’ve previously worked at always seemed to outsource the development of their website. Why is that? Mainly because of time.

Can we make a website fast, without affecting quality? To be honest, we should be able to. At Tengio we pride ourselves to be fast after all.

## What to use?

Everyone in the team should be able to: manage the website and contribute with blog posts without too much effort. We also don't want to have to rely on frameworks or third-party tools for editing and managing blog posts.

It looks like a static website generator is the obvious choice here.

There are many static website generators. I don't have any particular attachment to any of them but my passion for golang pushed me towards [hugo](https://gohugo.io). Hugo is advertised to be simple, fast and flexible. Hopefully this is a good match for our company website.

Let's see how hugo works.

## Install

The installation is simple, more so if you already have [brew](http://brew.sh/) installed. Just run the command :

```
brew update && brew install hugo
```

Ok, job done. Now you can run hugo command to verify the correct installation:

```
hugo help
hugo version
```

## First basic website

I will be brief in this section. You can find better material for this part on the [hugo starting guide](https://gohugo.io/overview/quickstart)... To start just run the command :

```
hugo new site firstwebsite
```

You should have a nice success message like:

```
Congratulations! Your new Hugo site is created in "/.../test/firstwebsite".

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder. Choose a theme from https://themes.gohugo.io or
   create your own with the "hugo new theme <THEMENAME>" command
2. Perhaps you want to add some content. You can add single files with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>"
3. Start the built-in live server via "hugo server"

For more information read the documentation at https://gohugo.io.
```

This command is generating the directory structure with some basic configuration files:

1. ```config.toml``` is the most important file. It holds all the configurations.

2. ```layouts``` folder is where you store the layouts of different types of content.

3. ```content``` folder is where you will actually place blog posts or other types of content.

If you want to see the rest of the structure details check the [hugo quickstart](https://gohugo.io/overview/quickstart).

Now run this command from the created directory root:

```
hugo server
```

This should start a local server serving your new website on localhost:1313. At this point the loaded page is just a white empty screen.

## Editing the Home Page

In the layout folder add an index.html file and edit it with something like:

```
<!DOCTYPE html>
<html lang="en-US">
    <body>
        <div>CONTENT</div>
    </body>
</html>
```

Hugo is updating on the fly any change affecting files in the target folders of your hugo process. To see the changes just go back to the browser.

So far nothing interesting. Let's add some reusable parts to our home page. In hugo fragments of reusable html can be implemented using partials. You need to create html files in the layout/partials folder. We are going to add head.html and footer.html as examples. Once you have done that you can reuse this in the index.html or any other page of your website.

```
<!DOCTYPE html>
<html lang="en-US">
    {{ partial "head.html" . }}
    <body>
        <div>CONTENT</div>
        {{ partial "footer.html" . }}
    </body>
</html>
```

Partials are a very useful tool when developing a website with hugo.  

## Theme

The approach I have used in this mini tutorial avoids the usage of themes. I have done that because starting with themes will postpone the understanding of the basic building blocks that are important for a more profound understanding of hugo. The type of understanding that will make your life a lot easier when you will have to develop your website.

There are quite a few themes available for hugo that you can use to jump start your website. Look at this [gallery](http://themes.gohugo.io/) to see some of them.

## Adding a Blog

To add a blog section where members of the team can add post as [md](https://guides.github.com/features/mastering-markdown/) files there are a few steps to go through:

1. add a link in your home page to the blog section like ```/blog/``` so that the blog can be reached.

2. create a file ```/layouts/section/blog.html```. This file will drive how the main blog page will look like. In our case it will be a simple list of blogs.
```
<!DOCTYPE html>
<html lang="en-US">
    {{ partial "head.html" . }}
    ...        
      <h1 id="title">Blog</h1>
      {{ range .Data.Pages.GroupByDate "2006" }}
        <div class="post-summary">
          {{ range .Pages }}
              {{ .Render "list"}}
          {{ end }}
        </div>
      {{ end }}
    ...
</html>
```

3. create a file ```/layouts/blog/list.html```. This is used to show a list of blogs as a summary.
```
<h2>{{ .Title }}</h2>
<div class="article-date">{{ .Date.Format "Mon, Jan 2, 2006" }}</div>
<p>{{ .Summary }}</p>
<a href="{{ .RelPermalink }}" class="post-summary-read-more">READ MORE</a>
```

4. create a file ```/layouts/blog/single.html```. This is used to show one single blog page.
```
<!DOCTYPE html>
<html lang="en-US">
    {{ partial "head.html" . }}
    ...        
      <article>
        <h1>{{ .Title }}</h1>
        <div class="article-date">{{ .Date.Format "Mon, Jan 2, 2006" }}</div>
        {{ .Content }}
      </article>
    ...
</html>
```

5. Finally write your blog post ```/content/blog/your-first-blog.md```:
```
+++
date = "2016-08-12T18:00:00+00:00"
title = "Blog title"
+++
Content of your blog...
```
You can also create a [template or archetype](https://gohugo.io/content/archetypes/) if you want to simplify the content creation.

## Extras

Hugo has a few nice things on top of these basics building blocks. It has in fact very easy ways to add Tags, Taxonomies... or plugins like Google Analytics, Disqus... See the full list on the [official documentation](https://gohugo.io/extras/analytics/)

## Publish the website

The are many ways to publish the website. We used a golang instance of google app engine. But you can also use [github static pages](https://gohugo.io/tutorials/github-pages-blog/) or other cloud services.

## Conclusion

Making a real website with hugo is not much more than the easy steps described so far. Add bootstrap and some other js libraries with a bit of html and your job is done. Of course you need a bit of content but that can start lean and evolve alongside your company. Also the team can help by changing the content or creating blog posts easily by using github.

The result in our case is a clean, simple and extensible website. A tool for our team to expose what we do. If you want to have a look at our website code, we made it open source on [github](https://github.com/Tengio/tengio.com)

It looks like hugo is a good choice as a static website generator. It definitely holds up to the promises of being fast, easy and flexible.
