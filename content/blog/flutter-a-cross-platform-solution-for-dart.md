+++
id = "0005"
date = "2016-09-02T11:38:10+00:00"
title = "Flutter a cross platform solution for Dart"
author = "luigi"
tags = [ "Flutter" ]
+++

I often face clients that want to reduce costs of developing applications with cross platforms solutions. But there are no real solutions which I feel confident with. Sure there are many good options like react native, xamarin, ionic... but they all have pros and cons. It feels like they are temporary solutions waiting to be blown away.

Recently, while looking at some news about Google's new os [Fuchsia](https://fuchsia.googlesource.com/), I discover one the latest cross platform project: [Flutter](https://flutter.io).

Why the link between flutter and fuchsia, I don't know. But for sure the developers are making sure the support for Fuchsia is there since the beginning.

## What is flutter?

> Flutter is a new project to help developers build high-performance, high-fidelity, mobile apps for iOS and Android from a single codebase. [source](https://flutter.io/)

Flutter is unique because doesn't use WebViews or standard Widgets but uses its own rendering engine. I'm not going to spend time writing about the engine as I found this nice talk on youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/UUfXWzp0-DU" frameborder="0" allowfullscreen></iframe>


## Setup

[Flutter setup](https://flutter.io/setup/) looks easy it is just about cloning the flutter repo.
```
git clone https://github.com/flutter/flutter.git -b alpha
export PATH=`pwd`/flutter/bin:$PATH
flutter doctor
```

There is a little bit more to do with iOS Simulator and devices but that's it.

**NOTE:** The default installation target the alpha branch, you may want to switch to the master branch.

**NOTE:** If you run into problems make sure to run flutter doctor before reporting the problem to the user group. Also I will suggest to keep an eye on the [Flutter gitter chat](https://gitter.im/flutter/flutter).


## Running samples

The best way to checkout what Flutter can do is to use the examples. So go to flutter ```root/examples```. Currently there are 5 examples :

1. [Flutter gallery](https://github.com/flutter/flutter/tree/master/examples/flutter_gallery) : A demo for the material design widgets.

2. [Hello services](https://github.com/flutter/flutter/tree/master/examples/hello_services) : Example of embedding Flutter in an application using FlutterView.

3. [Hello world](https://github.com/flutter/flutter/tree/master/examples/hello_world) : No comment, you should know.

4. [Layers](https://github.com/flutter/flutter/tree/master/examples/layers) : Collection of self-contained example which are really handy if you want to get up to speed quickly.

5. [Stocks](https://github.com/flutter/flutter/tree/master/examples/stocks) : Example of embedding Flutter using FlutterView.

To run samples you can just use ```flutter run``` command. Make sure to look at the README file on for each project as you may have to configure local variables.

Flutter gallery is definitely the best sample app to understand how much has been done so far in terms of widgets support. It is also great to showcase flutter to your colleagues.


## First application

Ok so lets see what are the step to create a flutter application and have it running on some device. First we need to create it ```flutter create myapp```.
This simple command creates all the file structure necessary for an empty projects that runs on iOS and Android.

Installing the newly created app is a smooth process. You can just execute (add a -v if you want some log on what is happening): ```flutter run```

//TODO
See the screenshots.

At the moment of writing I'm facing some issue deploying on iOS simulator see [github issue](https://github.com/flutter/flutter/issues/5640) for more information. Always check github issues before loosing too much time! (At least I have learned how to open the iOS simulator from command line ```open -a Simulator```).

**NOTE:** Make sure to follow all the iOS setup in the [Flutter setup page](https://flutter.io/setup/).


## Editor

Atom look like the best companion if you want to work with flutter. It is also very easy to install the flutter plugin: Atom -> Preference -> Install -> then search for "flutter". [Flutter package page](https://atom.io/packages/flutter).

With the plugin you get control over connected devices and more: code completion, run apps, create app, compilation error and warning ...

## Project structure

As you can see from the screenshot you get there is an android and an iOS folder. A part the resources for the android and iOS project that you can see in the relative folders the other relevant file at this point is the ```main.dart```.

Just out of curiosity this is the manifest in the android application:

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.yourcompany.myapp"
    android:versionCode="1"
    android:versionName="0.0.1">

    <uses-sdk android:minSdkVersion="16" android:targetSdkVersion="21" />
    <uses-permission android:name="android.permission.INTERNET"/>

    <application android:name="org.domokit.sky.shell.SkyApplication" android:label="myapp" android:icon="@mipmap/ic_launcher">
        <activity android:name="org.domokit.sky.shell.SkyActivity"
                  android:launchMode="singleTop"
                  android:theme="@android:style/Theme.Black.NoTitleBar"
                  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection"
                  android:hardwareAccelerated="true"
                  android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>
```
**NOTE:** the SkyApplication and SkyActivity are some old names (Sky was the name of an earlier version of Flutter) which are going to be changed soon.

## Coding

Just to have an idea of what is the coding part I'm going to add a simple list of items. To make the changes we have to edit ```main.dart```.
We are going to change the main.dart file so we implement an app like the one you see in the screenshot.

animated gif? screenshot of the app

First I'm going to add a list of books:
```
class Book {
  const Book({this.name});
  final String name;
}

final List<Book> _books = <Book>[
  new Book(name: 'The Dart Programming Language'),
  new Book(name: 'Learning Dart - Second Edition'),
  new Book(name: 'Dart By Example'),
  new Book(name: 'Dart Essentials'),
  new Book(name: 'Web Programming with Dart'),
  new Book(name: 'Mastering Dart'),
  new Book(name: 'Dart Cookbook'),
  new Book(name: 'Aprende Dart'),
  new Book(name: 'Dart for Absolute Beginners'),
  new Book(name: 'Dart for Hipsters'),
  new Book(name: 'Dart in Action'),
  new Book(name: 'Dart: Up and Running'),
];
```

Now we need a class to manage the single list item and a callback for the tap event:
```
typedef void BookChangedCallback(Book book, bool read);

class BookListItem extends StatelessWidget {
  BookListItem({Book book, this.read, this.onBookChanged})
      : book = book,
        super(key: new ObjectKey(book));

  final Book book;
  final bool read;
  final BookChangedCallback onBookChanged;

  TextStyle _getTextStyle(BuildContext context) {
    if (!read) return null;

    return new TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return new ListItem(
      onTap: () {
        onBookChanged(book, !read);
      },
      title: new Text(book.name, style: _getTextStyle(context)),
    );
  }
}
```

Next we need a StatefulWidget for the book list:
```
class FlutterBookList extends StatefulWidget {
  FlutterBookList({Key key, this.books}) : super(key: key);

  final List<Book> books;

  @override
  _FlutterBookListState createState() => new _FlutterBookListState();
}

class _FlutterBookListState extends State<FlutterBookList> {
  Set<Book> _books = new Set<Book>();

  void _handleBookChanged(Book book, bool read) {
    setState(() {
      if (read)
        _books.add(book);
      else
        _books.remove(book);
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Book List'),
      ),
      body: new MaterialList(
        type: MaterialListType.oneLineWithAvatar,
        children: config.books.map((Book book) {
          return new BookListItem(
            book: book,
            read: _books.contains(book),
            onBookChanged: _handleBookChanged,
          );
        }),
      ),
    );
  }
}
```

Finally we need to slightly modify the main:
```
void main() {
  runApp(
    new MaterialApp(
      title: 'Flutter Book List',
      theme: new ThemeData(
        primarySwatch: Colors.blue
      ),
      home: new FlutterBookList(books: _books)
    )
  );
}
```

Not that much code to be honest. Takes more if you write an android ListView with the Adapter and a CustomView for the list item especially if you have to manage the state as we do in this example.

**NOTE:** If you run the app from the terminal, you can see the changes you are doing to the main file by pressing 'r' (Refresh).

**NOTE:** I strongly advise to read the [framework tour](https://flutter.io/widgets-intro/) if you want to take this sample app forward.


## Exceptions

An important feature for developers is the ability to quickly read and understand exceptions. This is just an example:
```
I/flutter : ══╡ EXCEPTION CAUGHT BY WIDGETS LIBRARY ╞═══════════════════════════════════════════════════════════
I/flutter : The following NoSuchMethodError was thrown building FlutterDemo(dirty; state:
I/flutter : _FlutterDemoState(1021944404)):
I/flutter : The null object does not have a method 'map'.
I/flutter : NoSuchMethodError: method not found: 'map'
I/flutter : Receiver: null
I/flutter : Arguments: [Closure: (Book) => dynamic]
I/flutter : When the exception was thrown, this was the stack:
I/flutter : #0      Object._noSuchMethod (dart:core-patch/object_patch.dart:44)
I/flutter : #1      Object.noSuchMethod (dart:core-patch/object_patch.dart:47)
I/flutter : #2      _FlutterDemoState.build (/Users/luigi/dev/prj/flutter/myapp/lib/main.dart:94)
...
```
It looks friendly and readable. What do you think?


## A few addition

One of the thing which was difficult to implement in the past especially in android was the async loading of images. Now is a simple task you just have to pick a library but back then you had to do things yourself. For this reason I think that adding the cover and the description of the books to the list item can be a good task to see Flutter.

In the Flutter gallery example there is a grid implementation which is using asset images. It looks like this:
```
...
@override
Widget build(BuildContext context) {
  final Widget image = new GestureDetector(
    onTap: () { showPhoto(context); },
    child: new Hero(
      key: new Key(photo.assetName),
      tag: photo.tag,
      child: new Image.asset(photo.assetName, fit: ImageFit.cover)
    )
  );
....
```

Looking into Image class (if you have the atom flutter plugin you can navigate easily cmd+click) there is a nice factory method ```Image.network(url, fit: ImageFit)```. Also the [ListItem](https://docs.flutter.io/flutter/material/ListItem-class.html) can have a ```leading``` that is used to display a widget before the title. So we have a plan of action.

1. Changing Book class to support image and description:
```
class Book {
  const Book({this.name, this.cover, this.description});
  final String name;
  final String cover;
  final String description;
}
```
You will have to add urls and descriptions to your list of books.

2. Changing ListItem to show image and description:
```
@override
  Widget build(BuildContext context) {
    return new ListItem(
      onTap: () {
        onBookChanged(book, !read);
      },
      title: new Text(book.name, style: _getTextStyle(context)),
      leading: new Image.network(book.cover, fit: ImageFit.cover),
      subtitle: new Text(book.description, style: _getTextStyle(context)),
    );
  }
```

Wow this has been much easier than I thought was going to be. It feels a bit slow with images from the network but I don't know enough to say if is my implementation or if is a performance problem.


## Conclusions

Even though there is a FAQ on [why dart?](https://flutter.io/faq/#why-did-flutter-choose-to-use-dart) I'm not entirely sold on the language choice. I like Dart don't get me wrong, but is not like the most widespread language and there are very good alternatives.

I still have a lot to explore on flutter : how to write tests, custom widgets, integration in existing applications with FlutterView... just to mention a few things. But I'm positively impressed by what I have see so far.

Flutter is not ready for real project but seeing the amount of work and enthusiasm developers are putting in it, it will not be long before it will become a serious option to cross platform solutions.
