+++
id = "0011"
title = "Gradle : Reduce duplication accross projects"
description = "Gradle plugins and scripts to reduce duplication of code across projects"
date = "2016-12-29T17:40:27+00:00"
author = "luigi"
tags = [ "Gradle", "Android" ]
+++

## Introduction ??

Holidays are always a good moment ot stop and reflect a little bit about the last few projects. And this is even more true for xmas holidays. This because November and December are always busy months.

During the last couple of months in Tengio we have created a few open source library and demo app, as a reasult we have plenty of duplicated code in build scripts. I made a not to have a look at how and where it is possible to reduce duplication and especially to make it easier and faster for future project to implement the same functionality.

I decided to have a deeper look at the gradle build scripts and plugins that we use and extract the duplication where possible.

I set the following requirements when I set upon myself to address this problem:
* Cost in terms of my time should not be more than 2 days
* The abstraction should not influence how developers in the team use gradle and plugins
* The value of the work should affect positively more than 1 project.

## Gradle super quick intro

Gradle is a groovy based build system that was introduced to overcome a few problems related to maven. If you don't know maven, maven is a build system that was introduced to solve dependency limitations of ant. If you don't know ant... well you got my point I guess.

Gradle became very popular once Google decided to adopt it as the primary build tool for android.

One of the many advantages of gradle is the availability of many plugins. Many in relative terms... small amount compare to gulp a popular javascript build tool. 

## Identification of duplication in Tengio's projects.

By targeting gradle, it is quite easy to look at what is the duplication to be removed. just my looking at a few projects I have identified the following parts that make sense to extract and made them easier to use:
- checkstyle
- bintray

## Checkstyle

I hope people reading this blog are familiar with checkstyle. If you don't, unless you always work alone, please google it and try to use it. 

In the past was quite hard and cumbersome to use but nowdays there are no excuses. The best way to use it is to create a company wide code style rule set that is as close as possible to the current standard style guidelines. Once the rule set is defined you can enforce the rules in static code analysis phase of the build scripts and at the same time help developers use the rules with IDE integration. 

To summarise if you want to use checkstyle you have to:
* enforce it with the continuous integration
* adapt IDE to support the defined rules
If you don't respect this two point it will be very hard to successfuly use checkstyle. And trust me on this having a consistent style for the code makes the difference.

For our case I'm looking at java/android base projects. It is easy for this tyoe of projects to use checkstyle.
In fact you can implement checkstyl for your project just with the following steps: 
- define the rules of your code style in a file ```checkstyle.xml```.   
- add the checkstyle plugin to your gradle project.
- create a ```codestyle.xml``` file, and import the file in your IDE. (At least this should work for android studio and IntelliJ)

## Checkstyle implementation problem.

As mentioned before, the codestyle implementation for a project consiste of the following files:
- codestyle.xml
- checkstyle.xml
- Plugin repository definition and dependency
- For android project you also need the ridefinition of the checkstyle task so that it can take the proper source ccode to analyse.

All this is fine for a signle project. But as soon as you start to have a few of them it becomes messy. Expecially if you want to evolve codestyle and checkstyle.

## A Tengio Checkstyle Plugin

Ok so, we have one problem and we know the requirements for our solution. The best possible solution in this case it will be to use a gradle plugin. One of the main goal for me is also to a central point for the ```checkstyle.xml``` file. First thing to know is then: Is it actually possible to include and distribute the xml file into the jar and pass it to checkstyle?

A gradle plugin is essentialy a jar. So it is possible to include a file as a resource and read it. More complicated is passing it to checkstyle plugin. In fact I have limited time I can rewrite the all checkstyle plugin so I need to have it as a dependency and set the configuration it needs.

I'm lucky this time. Checkstyle introduced the ```config``` properties that can take a string to represent the checkstyle.
With this line it should be possible to do it then:

```
checkstyle.config = project.resources.text.fromString(getClass().getResourceAsStream("checkstyle.xml").text)
```

Ok now I have to learn how to create a gradle plugin, inject a checkstyle plugin and make sure to configure it correctly.

This are the things we need to do:
- 1. create a project with a gradle build for plugins.
- 2. define a plugin id
- 3. plugin class
- 4. use checkstyle plugin as dependency
- 5. apply Checkstyle plugin
- 6. try out the plugin 
- 7. android project support
- 8. publish the plugin
- 9. converting projects to use the plugin

### 1. Project scheleton

I will try to put just the necessary part in the blog, if you want to look at the full code the project is open source: 

```
apply plugin: 'groovy'

dependencies {
    compile gradleApi()
    compile localGroovy()
}
```
This are the basic things to create a groovy (you can also do it in java if you prefer) based gradle plugin.

### 2. Plugin id

Each gradle plugin need to define a plugin id. The plugin id will also have to associate the id to a Class that implements the Plugin itself.
To do that you have to create a file with name ```[package].[pluginId]```. The file need to be in src/main/resources/META-INF directory. 
The file need to contain the class association. Like in this case:

```
implementation-class=com.tengio.gradle.TengioCheckstylePlugin
```

### 3. Plugin class

The plugin class in itself is a very simple class that implement Plugin and you can use the apply method to do your own logic.

```
class TengioCheckstylePlugin implements Plugin<Project> {

    void apply(Project project) {
        ....
    }
}
```

### 4. Checkstyle plugin as dependency 

Dependency declaration with gradle plugins it is easy. See here:

```
buildscript {
   ...

   dependencies {
       classpath 'com.puppycrawl.tools:checkstyle:7.3'
   }
}
```

### 5. Apply Checkstyle plugin

Going back to the TengioCheckstylePlugin class, to configure and apply the checkstyle plugin in you just need the following code:

```
project.plugins.withType(CheckstylePlugin) {
    project.checkstyle {
        toolVersion = "7.3"
        config = project.resources.text.fromString(getClass().getResourceAsStream("checkstyle.xml").text)
    }
}
project.pluginManager.apply('checkstyle')
```

### 6. Try out the plugin 

To test the plugin with a demo project, I have created a simple java project with a couple of classes. There is one tricky part though. I need to publish the plugin somewhere so that my demo app can use it.

Maven to the rescue: 

```
apply plugin: 'maven'

group = 'com.tengio.gradle'
version = '1.0-SNAPSHOT'

uploadArchives {
    repositories {
        mavenDeployer {
            repository(url: mavenLocal().url)
        }
    }
}
```

By adding this to you build.gradle and with the task ```uploadArchives``` you can deploy a version of your plugin locally.
In the demo project you can easily pick up the plugin by adding usual plugin declaration:

```
buildscript {
    repositories {
        ...
        mavenLocal()
    }
    dependencies {
        classpath 'com.tengio.gradle:tengio-checkstyle-plugin:1.0-SNAPSHOT'
    }
}

apply plugin: 'com.tengio.gradle.tengio-checkstyle-plugin'
```

Ok now everything works on a normal java project. 

### 7. Android project support

Adding with apply the checkstyle plugin to a java project will automatically attach two task *checkstyleMain* and *checkstyleTest* as dependencies of the check task.

With android though this doesn't happen. This is probably related to the different way android plugin manage the project. If you have used checkstyle on android project you already know this. Anyway we basically have to do that manually:

```
if(!hasTask(project, 'checkstyleMain')) {
    Checkstyle c = project.tasks.create('checkstyleMain', Checkstyle)
    c.source = 'src'
    c.include '**/*.java'
    c.exclude '**/gen/**'
    c.classpath = project.files()
    c.config = project.resources.text.fromString(getClass().getResourceAsStream("checkstyle.xml").text)
    project.tasks.getByName('check').dependsOn 'checkstyleMain'
}
```

### 8. Publish the plugin

I'm used to publish Tengio's open source project to bintray. But I noticed there is a specific gradle repository for plugins. So I gave it a go.

Go to this link and follow the steps, this pubblication process it is actually very simple (one of the best I have used so far).

Once it is published you can use it like any other public plugin:

```
buildscript {
    repositories {
        ...
        maven {
            url "https://plugins.gradle.org/m2/"
        }
    }
    dependencies {
        ...
        classpath "com.tengio.gradle:tengio-checkstyle-plugin:1.0"
    }
}

apply plugin: 'com.tengio.gradle.tengio-checkstyle-plugin'
```

### 9. Converting projects to use the plugin

Finally the best part. Delete of files and lines of code from existing projects.


## Bintray and maven

At Tengio we have a few open source projects. On my opinion any open source project should be as easy as possible to use, for this reason all our project are published on Bintray. 

Bintray requires mavne plugin to prepare some meta-information of the artifact. Also for Android projects and bintray needs some custom configuration. See this example: 

```
apply plugin: 'com.jfrog.bintray'
apply plugin: 'com.github.dcendents.android-maven'

project.group = "com.tengio.android"
project.afterEvaluate {
    project.version = android.defaultConfig.versionName
}

bintray {
    user = ''
    key = ''
    if (project.hasProperty('BINTRAY_USER') && project.property('BINTRAY_KEY')) {
        user = project.property('BINTRAY_USER')
        key = project.property('BINTRAY_KEY')
    }
    configurations = ['archives']
    pkg {
        repo = 'maven'
        userOrg = 'tengioltd'
        licenses = ['Apache-2.0']
    }
}

android.libraryVariants.all { variant ->
    def name = variant.buildType.name
    def task = project.tasks.create "jar${name.capitalize()}", Jar
    task.dependsOn variant.javaCompile
    task.from variant.javaCompile.destinationDir
    artifacts.add('archives', task);
}

task sourcesJar(type: Jar) {
    from android.sourceSets.main.java.srcDirs
    classifier = 'sources'
}

task javadoc(type: Javadoc) {
    source = android.sourceSets.main.java.srcDirs
    failOnError false
}

task javadocJar(type: Jar, dependsOn: javadoc) {
    classifier = 'javadoc'
    from javadoc.destinationDir
}

artifacts {
    archives javadocJar
    archives sourcesJar
}
```

**NOTE:** Notice the trick to avoid duplication of the versionName:
```
project.afterEvaluate {
    project.version = android.defaultConfig.versionName
}
```

## Bintray and maven implementation problem 

You can see the problem already. For all the Android projects we have to write this snippet of code. 


## Tengio Bintray Script

I have not much time left, digging stuff on how to use checkstyle took me quite a bit. And having seen the difficulties of the re-usage of checkstyle plugin in our custom extension. I'm starting this task much more afraid of what is going to be using bintray and maven as dependecies to make a plugin.

I cloned quickly the repo for the maven plugin and bintray plugin to see the code. Result: not going to write a plugin this time.

The thing is that plugins are not written with the idea that other people will write plugin on top of them.

There is another clever solution for gradle to reuse code: ```apply from: url```. 

With this you can apply a script to an existing build. It is quite awesome. There is only one drawback the ```apply from:``` is executed after the evaluation phase. This means that it is not possible to add dependencies from witin the applyed script.

Still a pritty good result. We remove all the code making sure to leave the plugin dependencies:
```
buildscript {
  repositories {
    ...
    dependencies {
        ...
        classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.7.3'
        classpath 'com.github.dcendents:android-maven-gradle-plugin:1.5'
    }
}
```
And we apply the script directly from the github repository:
```
apply from: 'https://raw.githubusercontent.com/Tengio/tengio-bintray-script/master/bintray.gradle'
```

## Conclusions

To be honest the all thing was also an elaborate excuse to get to build some plugin with gradle. I always wanted to try at least with one. 

Overall I'm happy with checkstyle plugin also the bintray imlementation is much better than before. I know the ideal situation will be a plugin. But I leave this to another holiday.