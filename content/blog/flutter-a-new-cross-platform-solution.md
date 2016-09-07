+++
id = "0005"
date = "2016-09-07T11:00:10+00:00"
title = "Flutter a new cross platform solution"
description = "We often face clients that want to explore the possibility of cross platform solutions in order to reduce costs but I personally don't feel confident in any of the solutions available today. Sure there are many good options, especially React Native, but at the moment it feels like these solutions are not seamless enough in their execution."
author = "luigi"
tags = [ "Flutter" ]
+++

We often face clients that want to explore the possibility of cross platform solutions in order to reduce costs but I personally don't feel confident in any of the solutions available today. Sure there are many good options, especially React Native, but at the moment it feels like these solutions are not seamless enough in their execution.

Recently, while looking at some news on Google's new os [Fuchsia](https://fuchsia.googlesource.com/), I discover [Flutter](https://flutter.io).


## What is Flutter?

> Flutter is a new project to help developers build high-performance, high-fidelity, mobile apps for iOS and Android from a single codebase. [source](https://flutter.io/)

To better understand why Flutter is interesting we have to take a step back and look at [React Native](https://facebook.github.io/react-native/). React Native is a JavaScript framework to write real, natively rendering mobile applications for iOS and Android. React Native is based on [React](https://facebook.github.io/react/) which is a javascript library to build user interfaces. React is:

* Declarative
* Component-Base
* Learn Once, Write Anywhere

Flutter is also inspired by React but follows the "Write once, run anywhere" approach instead of "Learn Once, Write Anywhere".

This quote from a Facebook's React Native post clarifies the concept:

>It's worth noting that we're not chasing “write once, run anywhere.” Different platforms have different looks, feels, and capabilities, and as such, we should still be developing discrete apps for each platform, but the same set of engineers should be able to build applications for whatever platform they choose, without needing to learn a fundamentally different set of technologies for each. We call this approach “learn once, write anywhere.” [source](https://code.facebook.com/posts/1014532261909640/react-native-bringing-modern-web-techniques-to-mobile/)

Google with Flutter is chasing what Facebook didn't want to chase with React Native: "Write once, run anywhere".

To achieve his goal Flutter team had to implement its own rendering engine to draw widgets.

![article-img](/img/blog/0005/architecture.jpg)
*This picture is taken from the [Architecture Diagram document](https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.p)*

Flutter previously called Sky (Check out this [youtube talk about Sky](https://www.youtube.com/watch?v=PnIWl33YMwA)) is build by the experience accumulated with Blink and WebKit. This guys are no jokers.

 **NOTE:** if you want to learn more about the rendering engine I suggest to watch this [Rendering Pipeline talk](https://www.youtube.com/v/UUfXWzp0-DU).


## Flutter installation

To setup the environment, all you need to do is clone the Flutter git repository:
```
git clone https://github.com/flutter/flutter.git -b alpha
export PATH=`pwd`/flutter/bin:$PATH
flutter doctor
```

The default installation targets the alpha branch. You may want to switch to the master branch because things are progressing very quickly.

There are a couple of steps required to link Android SDK and Xcode. [Flutter setup page](https://flutter.io/setup/) gives you all the necessary details that I don't want to duplicate here.


## Editor

The best editor for Flutter is the combination of [Atom](https://atom.io/) and the [Flutter atom plugin](https://atom.io/packages/flutter). It is very easy to install: Atom -> Preference -> Install -> then search for "flutter".

![article-img](/img/blog/0005/atom-flutter.jpg)

The development environment has already a lot of functionalities. I personally like its simplicity.


## Running the examples

The best way to see what can be done with Flutter is to play with the existing examples:

1. [Flutter gallery](https://github.com/flutter/flutter/tree/master/examples/flutter_gallery) : A demo for the material design widgets.

2. [Hello services](https://github.com/flutter/flutter/tree/master/examples/hello_services) : Example of embedding Flutter in an application using FlutterView.

3. [Hello world](https://github.com/flutter/flutter/tree/master/examples/hello_world) : No comment, you should know.

4. [Layers](https://github.com/flutter/flutter/tree/master/examples/layers) : Collection of self-contained examples, which are really handy if you want to get up to speed quickly.

5. [Stocks](https://github.com/flutter/flutter/tree/master/examples/stocks) : List of stocks with market value.

The command to run a flutter app is: ```flutter run```. Before running a sample make sure to look at the README file for each project as you may have to configure local variables.

Flutter gallery is definitely the best sample app to understand how much has been done so far especially in terms of widgets support. It is also a great way to showcase Flutter to your colleagues.

**NOTE:** By default ```flutter run``` uses the debug build configuration, which runs slowly (you can also see a warning banner in the app). If you want to actually see the real speed you need to change to either 'profile' or 'release' configuration. You can do that with the option ```--profile``` (from atom you can select the build configuration).


## The first Flutter application

You can't really understand a framework unless you write a few applications, but let's start with one.

**NOTE:** The full code is available on [github](https://github.com/Tengio/flutter-demo).

First we need to create it. Android and iOS require a lot of files and folders. It will be impractical to do it manually. For this reason Flutter offers the ability to create a skeleton just by running:
```
flutter create books-demo
```
The result is this:
```
Creating project books_demo:
  books-demo/.atom/launches/main.yaml
  books-demo/.gitignore
  books-demo/android/AndroidManifest.xml
  books-demo/android/res/mipmap-hdpi/ic_launcher.png
  books-demo/android/res/mipmap-mdpi/ic_launcher.png
  books-demo/android/res/mipmap-xhdpi/ic_launcher.png
  books-demo/android/res/mipmap-xxhdpi/ic_launcher.png
  books-demo/android/res/mipmap-xxxhdpi/ic_launcher.png
  books-demo/flutter.yaml
  books-demo/ios/.gitignore
  books-demo/ios/Flutter/Debug.xcconfig
  books-demo/ios/Flutter/Release.xcconfig
  books-demo/ios/Podfile
  books-demo/ios/Podfile.lock
  books-demo/ios/Pods/Manifest.lock
  books-demo/ios/Pods/Pods.xcodeproj/project.pbxproj
  books-demo/ios/Pods/Pods.xcodeproj/xcshareddata/xcschemes/Pods-Runner.xcscheme
  books-demo/ios/Pods/Target Support Files/Pods-Runner/Pods-Runner-acknowledgements.markdown
  books-demo/ios/Pods/Target Support Files/Pods-Runner/Pods-Runner-acknowledgements.plist
  books-demo/ios/Pods/Target Support Files/Pods-Runner/Pods-Runner-dummy.m
  books-demo/ios/Pods/Target Support Files/Pods-Runner/Pods-Runner-frameworks.sh
  books-demo/ios/Pods/Target Support Files/Pods-Runner/Pods-Runner-resources.sh
  books-demo/ios/Pods/Target Support Files/Pods-Runner/Pods-Runner.debug.xcconfig
  books-demo/ios/Pods/Target Support Files/Pods-Runner/Pods-Runner.release.xcconfig
  books-demo/ios/Runner/AppDelegate.h
  books-demo/ios/Runner/AppDelegate.m
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@1x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@2x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@3x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@1x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@2x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@3x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@1x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@2x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@3x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@1x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@2x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@3x.png
  books-demo/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-83.5x83.5@2x.png
  books-demo/ios/Runner/Base.lproj/LaunchScreen.storyboard
  books-demo/ios/Runner/Base.lproj/Main.storyboard
  books-demo/ios/Runner/Info.plist
  books-demo/ios/Runner/main.m
  books-demo/ios/Runner.xcodeproj/project.pbxproj
  books-demo/ios/Runner.xcodeproj/project.xcworkspace/contents.xcworkspacedata
  books-demo/ios/Runner.xcodeproj/xcshareddata/xcschemes/Runner.xcscheme
  books-demo/ios/Runner.xcworkspace/contents.xcworkspacedata
  books-demo/lib/main.dart
  books-demo/pubspec.yaml
  books-demo/README.md

Running 'pub get' in books-demo...                   8.3s

[✓] Flutter is fully installed. (on Mac OS, channel master)
[✓] Android toolchain - develop for Android devices is fully installed. (Android SDK 24.0.1)
[✓] iOS toolchain - develop for iOS devices is fully installed. (Xcode 7.3.1)
[✓] Atom - a lightweight development environment for Flutter is fully installed.
[✓] Connected devices is fully installed.
```


If you read through the logs, the skeleton contains an android and an iOS project. For the simple app we are implementing in this post we can focus the attention entirely on ```books-demo/lib/main.dart``` file.

But before making any change try to deploy the app on android and ios:
```
flutter run -v
```

![article-img-centered](/img/blog/0005/screenshot-1.jpg)

The first time you deploy on iOS it is necessary to open the project with Xcode and run it. This is because Flutter is unable to access your signing profile.

**NOTE:** An handy way to open the iOS simulator from the command line is with the command:
```
open -a Simulator
```


## Adding a list of books

Now that we have the skeleton of the app we can add a simple list of books. Our final goal is to implement this app that you can see in the following animated gifs:

![article-img-centered](/img/blog/0005/android.gif)![article-img-centered](/img/blog/0005/ios.gif)

**NOTE:** On iOS, at the moment there are a few issues on the network implementation this is the cause of the missing or truncated images.

All the following snippets of code are in the ```main.dart``` file.

First I'm going to prepare a list of books (I used the list of dart books from [Dartlang website](https://www.dartlang.org/resources/books)):
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

Next we have to prepare a widget to display the list item (BookListItem), a widget for the entire list (FlutterBookList) and a callback (BookChangedCallback) for the tap event:
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

Finally we create the FlutterBookList as ```home``` of the MaterialApp:
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

It is going to take too much time for me to explain the details of the widgets that I have used. But I think this code is intuitive, even if you don't know Dart and Flutter. If you want more details read through the [framework tour](https://flutter.io/widgets-intro/).


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


## A few more details

One of the most common tasks in mobile applications is to implement a list of items with images loading asynchronously from the network. It will be nice if we can do this with our Flutter demo.

It is still to early to have a proper documentation on how to do this. But the examples are a great source of information that we can use.

In the gallery example there is a grid, which has images. It looks like this:
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

If you look at the Image class there is a nice factory method ```Image.network(url, fit: ImageFit)```. We definitely need this.

Still in the gallery example look for the ```list_demo.dart``` file. You can see that it is using the [ListItem class](https://docs.flutter.io/flutter/material/ListItem-class.html) which can have a ```leading``` for the book cover, a ```title``` and a ```subtitle``` for the author.

So we have a plan of action.

1. Changing Book class to support image and author:
```
class Book {
  const Book({this.name, this.cover, this.author});
  final String name;
  final String cover;
  final String author;
}
```
You will have to add urls and authors to your list of books.

2. Changing ListItem to show image and author:
```
@override
  Widget build(BuildContext context) {
    return new ListItem(
      onTap: () {
        onBookChanged(book, !read);
      },
      title: new Text(book.name, style: _getTextStyle(context)),
      leading: new Image.network(book.cover, fit: ImageFit.cover),
      subtitle: new Text('Written by ' + book.author, style: _getTextStyle(context)),
    );
  }
```

It was much easier than I thought.


## Conclusions

I still have a lot to explore : tests, widgets, FlutterView... just to mention a few. I'm positively impressed by what I have seen so far. From a developer's prospective, I personally think that Flutter is potentially a step forward.

My only concern is that "Write once, run anywhere" also means that the app will look the same on every platforms. Mobile developers have spent the last few years trying to convince designers, product owners and managers that applications should adapt to the native platforms. Now that we succeeded, we have fight our way back?

Having said that, I'm sold on Flutter. Its now time for me to dust off my Dart book.
