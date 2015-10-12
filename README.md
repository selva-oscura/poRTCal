# poRTCal

A videoconferencing alternative inspired by the game Portal

This is an entry into the meteor hackathon competition.

The idea is simple.  We wanted to make it one-click simple to open or close a portal.

* Configure your portal by choosing someone (an endpoint) to connect to from a list of avatars (or email addresses) .
* Select one, it opens a portal, ala the game, with all the same coolness (sounds/sights), to that device.
* The only other features we will have are (maybe) invitation and signup.
* Click to open the portal, click to close, pull up the menu to configure as a portal to a new endpoint

We are playing with PeerJS and some other meteor RTC stuff to get things done.  Right now we are using peerjs.

Packages we are using:

blaze-html-templates    # Compile .html files into Meteor Blaze views
session                 # Client-side reactive dictionary for your app
jquery                  # Helpful client-side library
tracker                 # Meteor's client-side reactive programming library

standard-minifiers      # JS/CSS minifiers run for production mode
es5-shim                # ECMAScript 5 compatibility for older browsers.
ecmascript              # Enable ECMAScript2015+ syntax in app code

autopublish             # Publish all data to the clients (for prototyping)
insecure                # Allow all DB writes from clients (for prototyping)
materialize:materialize@=0.97.0
accounts-ui
accounts-password
underscore
tmeasday:presence
check
