# JS Analytics
  Demonstration of CSV parsin, and use of JS to process the data and visualization using Google Charts.

## Quick Start

Install Node.js and then:

- git clone git@github.com:n-sikka/js-analytics.git
- cd js-analytics
- sudo npm -g install gulp bower
- npm install
- bower install
- gulp serve (it will start on localhost:3000)

App will be live on localhost:3000

## Tools used
- Gulp
- NPM
- Bower
- LiveReload
- PapaParse
- Google Charts


## Bugs
- At times, due to angular async then(..) call, charts do not load. To fix it, just refresh the browser (ctrl + 5 or OSX equivalent)
- Google Charts does not allow us to cache the library locally, so due to that, this project cannot be used without Internet and at times takes a while to draw the charts.
