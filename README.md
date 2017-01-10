# Riot Hot Reload Plugin for Browsersync

Watch Riot tag files, when recompiled they reload without losing their state

## Install

* `git clone https://github.com/ptb/riot-hot-reload.git`
* `cd riot-hot-reload`
* `npm install`

## During Development

Add each tag to the `index.xhtml` file and then run:

* `riot -w *.tag & npm start`

## For Production (does not retain state)

Add each tag to the `entry.js` file, modify `index.xhtml`, and then run:

* `webpack -w & npm start`
