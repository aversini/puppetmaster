# Puppet Master

Local visual testing using [`jest-screenshot`](https://www.npmjs.com/package/jest-screenshot) and [`puppeteer`](https://www.npmjs.com/package/puppeteer).

## Installation

Please see [Custom installation](#custom-installation) below to customize what will be installed or not (Chromium, etc.)
```bash
$ git clone https://github.com/aversini/puppetmaster.git
$ cd puppetmaster
$ npm install
```

## Custom installation
By default, Puppeteer will download Chromium for your OS at each `npm install`. This can be quite tedious.
A copy of Chromium for Mac is provided here, but to use it, you need to unzip it and setup some environment variables:
```bash
$ git clone https://github.com/aversini/puppetmaster.git
$ export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
$ export PUPPETEER_EXECUTABLE_PATH=`pwd`"/third-party/mac-puppeteer/Chromium.app/Contents/MacOS/Chromium"
$ npm install

$ cd puppetmaster/third-party/mac-puppeteer
$ unzip Chromium.zip
$ cd ../..
```


## Configuration
A default configuration file is available under `config/example.config.js`. Feel free to alter it for your own tests, or create a new one and set the environment variable `PUPPETMASTER_CONFIG` accordingly before running the tests.

### Example
```bash
$ export PUPPETMASTER_CONFIG=/some/path/to/your/config.js
```


## Usage
Make sure a URL that should be tested is

- currently running
- has been setup in your configuration file (see `PUPPETMASTER_CONFIG` above)

Step 1: create a base snapshot of a URL
```bash
$ npm run base
```

Step 2: do some changes to your code, redeploy to the same URL.

Step 3: compare the base snapshot against the newly deployed code.
```bash
$ npm run test
```

If the visual comparison fails, a detailed explanation will be generated under `jest-screenshot-report/index.html`.
