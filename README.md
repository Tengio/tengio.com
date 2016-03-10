Tengio webkit
=============

Release
-------
Make sure to use the correct version (in static/app.yaml).

Run hugo commad to generate sources.

```
hugo
```

You can verify final version before deploy if you have appengine go sdk with:

```
./start.sh
```

One all is done, deploy with:

```
./deploy.sh
```

Developing locally
------------------
Install hugo. Then you can just simply run the command:
```
hugo server --buildDrafts -w .
```
open a browser on localhost:1313.

You can do changes and the website is refreshed.

Notes
-----
Most of the data is controlled by the config.toml file.

These are the main sections:

* "hero.html"
* "services.html"
* "portfolio.html"
* "about.html"
* "values.html"
* "contact.html"

this order is defined in theme/hugo-creative-theme/layouts/index.html.

Sections are built base on the content of config.toml

Only change files in themes/hugo/creative-theme.
