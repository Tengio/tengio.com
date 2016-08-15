+++
id = "0003"
date = "2016-08-12T18:00:00+00:00"
title = "Build a company website using hugo"
author = "luigi"
tags = [ "Web" ]
+++

Company website is important. This is particularly true if you are a company that build software for a living. I have been working for other consultancies, funny thing though is that website where always outsource. Why is that? Mainly because of time. Can we make a website fast without affecting quality?

I guess we should be able to. We pride ourself to be fast after all.

## What to use?

Everyone in the team should be able to: manage the website and contribute with blogposts without too much effort. We also don't want to have to rely on framework or third-party tools, blog posts should be easily be written with any text editor.

Looks like a static website generators is the obvious choice here.

There are many static website generators. I don't have any particular attachment to any of them but my passion of golang push me towards [hugo](https://gohugo.io). Hugo is sold with 3 simple features : simple, fast and flexible.

## Install

The installation is simple, more so if you already have brew installed. Just run the command :

```
brew update && brew install hugo
```

Ok job done. Now you can run hugo command to verify the correct installation:

```
hugo help
hugo version
```

## First basic website with hugo

I will be brief in this section. You can find better material for this part on the [hugo starting guide](https://gohugo.io/overview/quickstart)... anyway just run the command :

```
hugo new site firstwebsite
```

You should have got a nice success message like:

```
Congratulations! Your new Hugo site is created in "/Users/luigi/dev/prj/tengio.com/test/firstwebsite".

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder. Choose a theme from https://themes.gohugo.io or
   create your own with the "hugo new theme <THEMENAME>" command
2. Perhaps you want to add some content. You can add single files with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>"
3. Start the built-in live server via "hugo server"

For more information read the documentation at https://gohugo.io.
```

This command is generating the directory structure with some basic configuration file:

1. config.toml is the most important file. It holds all the configuration of the website.

2. layouts is where you store the layouts of different types of content.

3. content folder instead is where you will actually place real content like blog posts.

If you want to see the rest of the structure details check [hugo starting guide](https://gohugo.io/overview/quickstart).

Now run this command from the created directory root:

```
hugo server
```

This should start a small local server serving your new website on localhost:1313. At this point the loaded page is just a white empty screen.

## Editing the Home Page

Let's see how to edit the home page. In the layout folder add an index.html file with something like:

```
<!DOCTYPE html>
<html lang="en-US">
    <body>
        <div>CONTENT</div>
    </body>
</html>
```

Hugo is updating on the fly any change affecting files in the target folders of your hugo process. So to see the changes just go back to the browser.

So far nothing interesting. Let's add some reusable part to our home page. In hugo fragment of reusable html can be implemented using partials. You need to create html files in the layout/partials folder. We are going to add head.html and footer.html as examples. Once you have done that you can reuse this in the index.html or any other page or your website.

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

The approach I have use in this mini tutorial avoids the usage of themes. I have done that because starting with themes where most of the things are already prepare for you will postpone the understanding of some important part that are nice to know to have a more profound understanding of hugo.   

Hugo has a nice set of theme you can use to jump start your website. Have a look at this [gallery](http://themes.gohugo.io/) and play with a few of theme.

## Adding a Blog

To add blog section where members of the team can add post has [md](https://guides.github.com/features/mastering-markdown/) files. Go through the following steps:

* create a file /layouts/section/blog.html. This file will drive how the main blog page will look like. In our case will be a simple list of blogs.

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

* create a file /layouts/blog/list.html. This is used to show a list of blogs as a summary.

```
<h2>{{ .Title }}</h2>
<div class="article-date">{{ .Date.Format "Mon, Jan 2, 2006" }}</div>
<p>{{ .Summary }}</p>
<a href="{{ .RelPermalink }}" class="post-summary-read-more">READ MORE</a>
```

* create a file /layouts/blog/single.html. This is used to show one single blog page.

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

* Finally create a file /content/blog/your-first-blog.md:

```
+++
date = "2016-08-12T18:00:00+00:00"
title = "Blog title"
+++

Content of your blog...
```

## Extras

Hugo has a few nice things on top of this basics building blocks. It has in fact very easy ways to add Tags, Taxonomies... or plugins like Google Analytics, Disqus... See the full list on the [official documentation](https://gohugo.io/extras/analytics/)

## Publish the website

The are many ways to publish the website. We used a go instance of google app engine. But you can also use github or other cloud service. Hugo [documentation](https://gohugo.io/tutorials/github-pages-blog/) also explain different ways in details.

## Conclusion

It looks like hugo is a good choice as a static website generator. It definitely hold up to the promises of being fast, easy and flexible.

Making a real website with hugo is not much more than the easy steps described so far. Add bootstrap and some other js library with a bit of html and the job is done. Of course you need a bit of content but that can start with little and gradually evolve alongside your company. Also all the people of the team can help by changing the content or creating blog posts easily by just using github.

The result in our case it is a clean, simple and extensible website. A tool for our team to expose what we do.

If you want to have a look at our website code, we made it open source on [github](https://github...)
