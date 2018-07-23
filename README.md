# Puppet Master

Local visual testing using [`jest-screenshot`](https://www.npmjs.com/package/jest-screenshot) and [`puppeteer`](https://www.npmjs.com/package/puppeteer).

## Getting started
```bash
$ git clone https://github.com/aversini/puppetmaster.git
$ cd puppetmaster
$ npm install
```

## Configuration
A default configuration file is available under `config/example.config.js`. Feel free to alter it for your own tests, or create a new one and set the environment variable `PUPPETMASTER_CONFIG` accordingly before running the tests.

### Example
```bash
$ export PUPPETMASTER_CONFIG=/some/path/to/your/config.js
```


## Usage
Make sure a local URL that should be tested is

- currently running
- has been setup in your configuration file (see `PUPPETMASTER_CONFIG` above)

### Step 1: create a base snapshot of a local URL
```bash
$ npm run base
```

### Step 2: compare a base snapshot against a local URL
```bash
$ npm run test
```

If the visual comparison fails, a detailed explanation will be generated under `jest-screenshot-report/index.html`.