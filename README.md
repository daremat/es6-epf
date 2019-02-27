# Initiation to ESNext ![Module: 0 credits]

[![milestone-status]](https://master3-assistant.takima.io?milestoneId=40&redirectUri=https%3A%2F%2Fmaster3.takima.io%2Fmaster3%2Fes6-01)

> read estimate : **TODO 30 minutes**.

![SKILL javascript]

#### You are here because

 - you know how to code in javascript
 - you want to start on Angular, React or other recent framework
 - You have basic knowledge in **ES6 or newer**

## Abstract

In this milestone, we will focus on using Javascript modern development tools without using any frameworks.
 The tools, patterns, and features used in this module will be a common ground for any Javascript project.

>Although we asked our selves if we should have you implement your custom React library we finally
decided to go for an easy local game application exercise implementation.

#### Some useful references you should consider :

- [TODO add external resources]
- the [cheatsheet.md](./CHEATSHEET.md)

#### Involved technologies
![es6]
![babel]
![webpack]

![sass]
![lodash]

#### Prerequisites
> ![tip] __Pro tip__: NVM is a very usefull tool if you want to manage different versions of node at the same time,
you might want to check: [github.com/creationix/nvm](github.com/creationix/nvm)
 - have **nodejs** and **npm** installed (NodeJS 6+)
 ```sh
$ node -v
v10.15.1
$ npm -v
6.4.1
```

## Setup

No specific setup is required. As stated before having nodejs and also a modern browser might be useful.

## Get started

### Specification
As it has been said, the goal of this module is to discover modern Javascript tools while developing a 
 simple memory game. We will guide you through the implementation but the features of the application will be 
 described here.

The application will be composed of 3 views:
* the welcome view, containing a simple form allowing the user to enter is name, the game size and 
a start button to launch the game
* the game view allowing the user to play the memory game, flipping cards 2 by 2 until all the cards are turned upwards
* the end view, congratulating the user, allowing to start a new game and showing him is performance time

![mock]

Concerning the theming and what's behind the cards feel free to give it your own touch 
(let's obviously keep everything safe for work).

Easy right? Well, the application will have to contain quite some ES6 features and use appropriate tools that's
why we will guide you trough the configuration and some parts of the implementation. Let's do this.

### Technical spec
* The 3 distinct views will be independently served, this will be done using the appropriate webpack configuration
* The styling will be done using preprocessed css: sass
* The game implementation will use the following: classes, Promise, acync/await, lodash, ...

## Step 1 - NPM & webpack setup
topics: NPM, webpack

##### \>>>>>  ![error] TODO introduce chapter goal
This step is about setting up a standard npm module containing a webpack application, this will be the project skeleton.

**Why ?** Have a standardized NPM module and an easily runnable webpack application.

**At the end, we should have a standard NPM/webpack project starting base.**

### Step 1.1 - init your npm project
```sh
mkdir meme-mory
cd meme-mory/
npm init -y
npm install
```
Files produced:
```sh
package.json
```

> ![info] You just created a NPM module, that is not different from any module in the central registry at
[www.npmjs.com](https://www.npmjs.com/)

* set your package as private
```javascript
//package.json
{
  ...
  "private": true,
  ...
}
```
> ![info] Making it private so we do not accidentally push to the central (you will need to be connected to do so)

![commit] **commit step**
### Step 1.2 - webpack: install and naive setup

Webpack is a javascript tool used to bundle a web application, basically a coffee maker used in 99% of web projects.
Webpack can be quite a complex bundler and does a lot of its work behind the scene, we will go trough a simple manual 
setup to check what is going on. You can check the documentation to get a deeper insight of this tool:
[webpack.js.org/guides/getting-started/](https://webpack.js.org/guides/getting-started/)
(you might also want to check webpack-cli, a tool to help you create your webpack config: [github.com/webpack/webpack-cli](https://github.com/webpack/webpack-cli))

Let's head to our setup, this will start by installing everything we need:
```sh
npm install --save-dev webpack webpack-dev-server webpack-cli \
babel-loader @babel/core @babel/preset-env \
clean-webpack-plugin html-webpack-plugin
```

Let's also install the polyfills as we are going to use javascript advanced features:
```sh
npm install --save @babel/polyfill
```

> ![info] __Tip__: We use polyfills to patch our browser with some code it might miss

> ![question] We just installed a bunch of libraries but with different options, check your package.json. Do you know 
what's the difference between the options --save-dev, --save and none?

Create your webpack client application containing: .babelrc, src/index.html and src/app/index.js:
```
meme-ory
│   .babelrc
│   package.json
└───src
    │   index.html
    └───app
        |   index.js
```
```javascript
// .babelrc
{
    "presets": [
      ["@babel/preset-env", { "useBuiltIns": "usage" }]
    ],
    "plugins": []
}
```

> ![tip] __Pro tip__: You can check how babel actually process javascript easily there: [babeljs.io/repl](https://babeljs.io/repl])

```html
<!--src/index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```
```javascript
// src/app/index.js
console.log('Hello World');

function component() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = ['Hello', 'webpack', 'App'].join('\n\n');

  return element;
}

document.body.appendChild(component());
```
We will now tell webpack how to bundle the application properly and use babel
```javascript
//webpack.config.js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: false,
  entry: './src/app/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }
    ]
  }
};
```
> ![tip] __Tip__: Have a look at [webpack.jakoblind.no](https://webpack.jakoblind.no/) to easily scaffold your webpack config.

### Step 1.3 - run webpack
Now let's configure how we run our application using webpack by defining 2 npm scripts:
```javascript
// package.json
{
  ...
  "scripts": {
      "build": "webpack --config webpack.config.js",
      "dev": "webpack-dev-server"
  },
  ...
}
```
* *npm run build* will be used to generate a production bundle in dist/
* *npm run dev* will be used to start a local development server at [localhost:8080](http://localhost:8080/)

![commit] **commit step**

> ![tip] __Pro tip__: You can run npm scripts like so and add additional options:
```sh
npm run build
npm run build -- -d
npm run dev -- -p
```
> ![question] Have a look at the console output when building with production (-p) or development (-d) options, noticing any difference?
Check the dist/ folder on build and inspect how the file is built, can you find your javascript code?

### Checklist
 - [ ] I know how to setup a npm module
 - [ ] I know npm package basis
 - [ ] I know webpack basic setup and commands

[troubleshoot](#troubleshoot-1)

## Step 2 - Style the application
topics: semantic-ui, webpack loader, sass

* add webpack static loaders to the project
```sh
npm install --save-dev style-loader css-loader url-loader file-loader
```

* add semantic-ui-css to the project
```sh
npm install --save semantic-ui-css
```
* load semantic-ui css in the application before your styling
```javascript
//index.js
// ...
import 'semantic-ui-css/semantic.min.css';
// ...
```
* add webpack static loaders to handle css files and semantic-ui fonts / icons
```javascript
//webpack.config.js
// ...
module: {
  rules: [
    // ...
    {
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|svg|woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'url-loader',
        options: { limit: 100000 } // in bytes
      }]
    }
  ]
}
// ...
```
* add sass support and write your first sass styles, see
[sass-lang.com/guide](https://sass-lang.com/guide) and 
[github.com/webpack-contrib/sass-loader](https://github.com/webpack-contrib/sass-loader)

### Checklist
 - [ ] I know how to load css in webpack
 - [ ] I know what sass is

## Step 3 - Implement memory game
topics: ES6 features, lodash, Promise, async/await, debugger

The game should have three parts : **welcome** , **game**, **end**.

### Step 3.1 - 3 views structure

* you can use the following structure
(each view should contain a simple template like "Hello view name", a simple script logging "Hello view name" and its 
own background color)
```
es6-01
├── resources/
└── meme-ory/
    ├── .babelrc
    ├── package.json
    └── src/
        └── views/
            ├── welcome/
            │   ├── welcome.js
            │   ├── welcome.html
            │   └── welcome.scss
            ├── game/
            │   ├── game.js
            │   ├── game.html
            │   └── game.scss
            └── end/
                ├── end.js
                ├── end.html
                └── end.scss
```
* webpack configuration should be adjusted to output 3 views as well, using chunks
```javascript
//webpack.config.js
module.exports = {
    // ...
      entry: {
        app: './src/views/welcome/welcome.js',
        game: './src/views/game/game.js',
        end: './src/views/end/end.js'
      },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          files: {
            chunks: {
              app: {
                entry: './src/views/welcome/welcome.js'
              },
              game: {
                entry: './src/views/game/game.js'
              },
              end: {
                entry: './src/views/end/end.js'
              }
            }
          }
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/views/welcome/welcome.html',
          chunks: ['app']
        }),
        new HtmlWebpackPlugin({
          filename: 'game.html',
          template: './src/views/game/game.html',
          chunks: ['game']
        }),
        new HtmlWebpackPlugin({
          filename: 'end.html',
          template: './src/views/end/end.html',
          chunks: ['end']
        })
      ],
      output: {
        filename: 'bundle-[name].js',
        path: path.resolve(__dirname, 'dist')
      },
    // ...
}
```
* check that each view is properly served by both the dev server and generated by the build command

### Step 3.2 - Welcome view
* create the welcome view form, containing player name and game size
* add minimal validation, player name: alphanumerical and length between 3 and 20, size: number between 2 and 10
* link the form to the **game view** passing parameters as get params

To help you here are a couple code snippets:
```javascript
//welcome.js
import 'semantic-ui-css/semantic.min.css';
//...

import { get } from 'lodash';

class Welcome {
  constructor() {
    this._form = document.querySelector('#start-form');
    this._nameField = document.getElementsByClassName('field')[0];
    this._nameMessage = document.getElementsByClassName('message')[0];
  }

  startGame(e) {
      e.preventDefault();

      this._form.classList.add('loading');
      const name = get(e, 'srcElement[0].value');

      let nameError = false;
      if (!/[A-Za-z0-9]$/.test(name)) {
        this._nameField.classList.add('error');
        this._nameMessage.classList.add('error');
        nameError = true;
      } else {
        this._nameField.classList.remove('error');
        this._nameMessage.classList.remove('error');
        nameError = false;
      }
      //...
      this._form.classList.remove('loading');
      if (!nameError) {
        console.log(`starting game: ${name}`);
      } else {
        this._form.classList.add('error');
      }
  }
}

let welcome = new Welcome();
welcome._form.addEventListener('submit', e => welcome.startGame(e));
```
```html
<!--welcome.html-->
<form id="start-form" class="ui large form">
    <div class="ui stacked segment">
        <div class="field">
            <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="Name" pattern="[A-Za-z0-9]{3,20}">
            </div>
        </div>
        <div class="ui info message">
            <p>Player name must be alphanumerical and between 3 and 20 characters.</p>
        </div>
        <input class="ui fluid large teal submit button" type="submit" value="Play"/>
    </div>
</form>
```

### Step 3.3 - Game implementation
> Classes, Promise, lodash, transform, component template

We are going to implement the logic of the game, composed of a board who contains cards. 
we recommend to you to follow this structure :
```
es6-01
...
├── assets/
│   └─ here your static card images
└── views/
    ├── welcome/
    ├── game/
    │   ├── card.js
    │   ├── board.js
    │   ├── game.js
    │   ├── game.html
    │   └── game.scss
    └── end/
```

#### 3.3.1 - Preparation

To begin, you need some static images for your cards

##### Get the static images
* put the following in your project (find them inside the resources/ folder)

![unknown-card-img] ![takima-card-img] ![jawg-card-img] ![gatling-card-img]

##### How to build a flippable card

* import your image dynamically from your code _(url-loader)_
```html
<img alt="test" id="my-card-img"/>
```
```javascript
import Back from '../../static/back-card.png';
document.getElementById('my-card-img').src = Back;
```

* code a simple flippable card
> A flippable card is very easy to write, here is an example: [jsfiddle.net/68agoj1q](https://jsfiddle.net/68agoj1q/)

> ![tip] __Pro tip__: Use your browser debugger as often as you can, this can be tricky and sometimes confusing to go
into javascript realtime machinery, but this is a very good habit.

> ![tip] __Pro tip__: Using Javascript online runners can be very useful to isolate a bug and get help from the community 
we used jsfiddle here but other like: [plnkr.co](https://plnkr.co/) or [jsbin.com](https://jsbin.com) will do. And the best interpreter will 
be directly your browser console.

##### How to handle with the dom
* create multiple flippable cards
```html
<template id="card-template">
    <div class="ui card">
        <div class="image">
            <img class="front-face" alt="card">
            <img class="back-face" alt="card">
        </div>
    </div>
</template>
<main class="ui container">
    <div class="ui special cards" id="cards"></div>
</main>
```
```javascript
const htmlCards = document.getElementById('cards');
const clonedHtmlCard = document.getElementById('card-template').content.cloneNode(true).firstElementChild
htmlCards.appendChild(clonedHtmlCard);
```

#### 3.3.2 - Implementation

* initialize the game with n cards, using 2 classes: *Board* and *Card*
```javascript
//board.js
//note: the board contains an array of Cards
import {Card} from "./card";

export class Board {

  constructor(size) {
    this._size = size;
    this._cards = [];
    //...
  }

  init() {
      //...
      for (let i = 0; i < this._size; i++) {
        this._cards.push(new Card());
      }
  }
  
  //...

}
```
```javascript
//card.js
//the card is bound to an element and holds 2 flags: flipped and matched
export class Card {
  //...

  constructor(img) {
    this._flipped = false;
    this.matched = false;
    this._img = img;
    this._elt = {};
    //...
    this._imageElt = this._elt.querySelector('.image');
    this._imageElt.addEventListener('click', () => this.flip());
  }

  flip() {
    //...
  }

  equals(card) {
    //...
  }
}
```
* implement the game logic: flip cards 2 by 2, keep matches flipped, end the game when all cards are flipped

### Step 3.4 - End view
> Date, ...
* retrieve the results from get parameters and print them on your end.html

### Checklist
 - [ ] I know how to modularize a webpack app
 - [ ] I know how to handle a basic form
 - [ ] I know how to use Javascript classes
 - [ ] I know lodash basis
 - [ ] I know how to handle Javascript asynchronous behavior using Promise and async/await 
 - [ ] I know the concept of Javascript scope/closure
 - [ ] I know the basis of debugging in a browser

## Step 4 - Unit testing and browser support
topics: Unit test, jasmine, phantomJS

### Step 4.1 - Jasmine

[Jasmine](https://jasmine.github.io/) is a framework allowing to write and run unit tests for Javascript projects.

At the end, we should have a _./spec_ folder next to our _./src_ folder containing all our tests.

#### 4.1.1 - Installation

* Install and init Jasmine
```sh
npm install --save-dev jasmine
node node_modules/jasmine/bin/jasmine init
```
* Generate sample tests
```sh
node node_modules/jasmine/bin/jasmine examples
```

#### 4.2.2 - Run

* Add a script _test_ to run Jasmine
```javascript
//package.json
// ...
"scripts": { "test": "jasmine" },
// ...
```

* Start Jasmine and see the result
```sh
npm run test
```

### Step 4.2 - Karma

Jasmine does not run in a browser and our user probably will. That's why we will now use 
[Karma](https://karma-runner.github.io) to run our tests in a headless browser [PhantomJS](http://phantomjs.org/) 
, but also to be able to generate reports.

#### 4.2.1 - Preparation

You can drop the _./spec/support/jasmine.json_ file, it's unused with Karma.

#### 4.2.2 - Installation

We will use these plugins to our project :

[karma-webpack](https://www.npmjs.com/package/karma-webpack) to generates a webpack bundle for each test _(and allow to jasmine to understand the ESNext syntax)_

[karma-jasmine](https://www.npmjs.com/package/karma-jasmine) an adapter to Jasmine

[karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter) use the [Mocha](https://mochajs.org/) style logging for the cli report

[karma-jasmine-html-reporter](https://www.npmjs.com/package/karma-jasmine-html-reporter) to dynamically shows our tests results on the debug.html page

[karma-phantomjs-launcher](https://www.npmjs.com/package/karma-phantomjs-launcher) to run our tests on a headless browser

* Install Karma
```sh
npm install karma karma-jasmine jasmine-core ^
            karma-webpack ^
            karma-mocha-reporter ^
            karma-jasmine-html-reporter ^
            karma-phantomjs-launcher --save-dev
```

* Init Karma _(Windows users : powershell)_
```sh
karma init
| Which testing framework do you want to use : jasmine
| Do you want to use Require.js : no
| Do you want to capture any browsers automatically : PhantomJS
| What is the location of your source and test files : spec/**/*.spec.js
```

* Add the plugins _(optional)_
> ![info] Karma adds the plugins automatically for you if the plugins array does not exist
```javascript
//karma.conf.js
// ...
plugins: [
    require('karma-webpack'),
    require('karma-jasmine'),
    require('karma-mocha-reporter'),
    require('karma-jasmine-html-reporter'),
    require('karma-phantomjs-launcher')
]
// ...
```

### 4.2.3 - Configure the reporters

Karma can do reports of your tests, but you need to configure it. In our project we use 
[karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter) and 
[karma-jasmine-html-reporter](https://www.npmjs.com/package/karma-jasmine-html-reporter) but you can use others like 
[karma-coverage-istanbul-reporter](https://www.npmjs.com/package/karma-coverage-istanbul-reporter) to do a coverage 
report for example.

* Add the reporters
```javascript
//karma.conf.js
// ...
reporters: ['mocha', 'kjhtml']
// ...
```

### 4.2.4 - Configure the browsers

We have configured Karma to use [PhantomJS](http://phantomjs.org/) as browser. Karma need you to specify what browsers where you want to launch your tests.

#### PhantomJS

We prefer use [PhantomJS](http://phantomjs.org/) because it's an headless browser but you can use browsers like Chrome, 
Firefox or others, the Karma launcher of the desired browser need to be on your project. 

* Make sure you have the following
```javascript
//karma.conf.js
// ...
browsers: ['PhantomJS']
// ...
```

#### Let's try others browsers _(extra)_
* Add the launchers to your projects
```sh
npm install karma-chrome-launcher karma-firefox-launcher --save-dev
```

* And change your browsers conf
```javascript
//karma.conf.js
// ...
browsers: ['Chrome', 'Firefox']
// ...
```

### 4.2.5 - Configure the preprocessors

You can define preprocessor to transpile your code if you use a non-standard syntax like CoffeeScript or TypeScript.
In our project, the code need is bundled with webpack, so we use the webpack preprocessor

* Add the preprocessor
```javascript
//karma.conf.js
// ...
preprocessors: {
  'spec/**/*.spec.js': ['webpack']
}
// ...
```

You will see these problems if you run like it
> ![troubleshoot] We use webpack without specifying the 'mode' option (production or development)
>```sh
>WARNING in configuration
>The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
>```

> ![troubleshoot] PhantomJS don't understand the ES6 syntax
>```sh
>PhantomJS 2.1.1 (Windows 8.0.0) ERROR
>  {
>    "message": "An error was thrown in afterAll\nSyntaxError: Use of reserved word 'let' in strict mode",
>    "str": "An error was thrown in afterAll\nSyntaxError: Use of reserved word 'let' in strict mode"
>  }
>```

You need to add some webpack configurations to your Karma config file

* Create a webpack-test.config.js next to the webpack.config.js 

> ![tip] __Pro tip__: It's a good practice to create a webpack config file instead of putting the configuration directly on Karma

```javascript
//webpack-test.config.js
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

As you see, we define the mode for webpack, and the [babel rule to transpile our code to ES5](https://babeljs.io/docs/en/babel-preset-env) for PhantomJS. Add other configurations here if necessary

* Put the webpack config into the Karma config
```javascript
var webpackConfig = require('./webpack-test.config.js');
module.exports = function(config) {
  config.set({
    // ...
    webpack: webpackConfig
    // ...
  }
}
```

#### 4.2.6 - Run

* Replace your script _test_ from "jasmine" to "karma start"
```javascript
//package.json
// ...
"scripts": { "test": "karma start" },
// ...
```

* Start Karma and see the result at [localhost:9876/debug.html](http://localhost:9876/debug.html)
```sh
npm run test
```

### Checklist
 - [ ] I tested my app without karma, I saw the result on the terminal
 - [ ] I tested my app with karma, I saw the result on the terminal and on the [debug.html](http://localhost:9876/debug.html) page
 - [ ] I understand what do "describe" and "it" functions
 - [ ] I understand the Jasmine syntax to write tests
 - [ ] I know what is an headless browser
 - [ ] I am able to choose other reporters and browsers for Karma

## Step 5 - Memory management
topics: storage usage, cookies

## Step 6 - Bonus: Offline/dynamic and production deploy
topics: websockects, webworkers, nginx docker

## Check up

### Checklist
 - [ ] My **[TODO working feature]** works
 - [ ] I understand **..........**
 - [ ] I know **..........**
 - [ ] I will never **..........** again
 - [ ] I am able to choose whenever **..........**
 - [ ] I am confident with **..........**
 - [ ] I know how to use **..........**
 - [ ] ...

Congrats, you now have a working [TODO topic]

Check your achievements with the [following test](https://TODO_link_to_google_form_test)

##### \>>>>>  ![error] TODO remove form link
https://docs.google.com/forms/d/1LV_mTVtP4LwDzwN1LawQDYi-Jk9rBvRWjEc19QqwfI8/edit
##### \<<<<<

Ready to follow up? Get started for [![Next Milestone angular]](https://master3.takima.io/master3/angular-01)  

## Troubleshoot

##### \>>>>>  ![error] TODO complete troubleshoot
The troubleshot section is very important.
It is opened for merge requests, and allow trainees to save time on common errors,
mistakes, or bugs that trainees usually do and that just consume time

Please write some initial troubleshoots here.
##### \<<<<<

## Troubleshoot 1

- > ![troubleshoot] I encounter [TODO problem troubleshot 1] !
  > - double check that **.....**

- > ![troubleshoot] XXX does not work [TODO troubleshot 1]
  > - please make sure that **........ is properly setup**

- > ![troubleshoot] I got this error : [TODO error troubleshot 1]
  > - May be caused because **.........**

## Troubleshoot 2

- > ![troubleshoot] [TODO troubleshot 1]

# Contributors
 - Logan LEPAGE <[llepage@takima.fr](mailto://llepage@takima.fr)>
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>

### Mentors
 - Logan LEPAGE <[llepage@takima.fr](mailto://llepage@takima.fr)>
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>


| <sub>contact us: <[formation@takima.io](mailto://formation@takima.io)></sub> | <sub>© Takima 2019</sub> |
| --- | ---:|

##### \>>>>>  ![error] TODO remove checklist
# Checklist `README.md`
As a reminder, here are the points you should check to ensure your `README.md` is compliant:

- [ ] uses a milestone or module badge
    - [ ] have proper milestone icon
    - [ ] have non null credits training
- [ ] have a *Bill of Modules* section
- [ ] starts with a valid URL to the course on Google
- [ ] list required skills
    - [ ] with badges
- [ ] list involved tools / technologies
    - [ ] with icons
- [ ] have an abstract section, that
    - [ ] reminds the context
    - [ ] explain goals, what is about to be done
- [ ] introduce tools & libraries
- [ ] show an architecture diagram / schema if required
- [ ] uses no schema copy pasted on the internet
- [ ] is structured as a tutorial, with steps
- [ ] uses one step by concern, that
    - [ ] starts with some keywords
    - [ ] plainly explain the step's purpose, what is it going to achieve
    - [ ] uses **pro-tips**, **danger** **question** or **info** notices
    - [ ] links toward the troubleshoot
    - [ ] shows a commit reminder
    - [ ] ends with a list of produced files
    - [ ] ends with the step's checklist
- [ ] starts with have a `setup` step
- [ ] ends with the milestone's checklist
- [ ] links to the google form test
- [ ] links to the next milestone
- [ ] list contributors & mentor
- [ ] links to any file located within `resources/`
- [ ] uses the copyright notice
- [ ] have a CHEATSHEET.md
- [ ] have a trainers/questions.md
- [ ] have a trainers/CR.md

##### \<<<<<

[TODO Milestone : 0 credits]: https://img.shields.io/badge/TODO_milestone_name-0_credits-red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=cd1c68&colorB=db9ab5&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA0AB8AKD7i/b6AAAACXBIWXMAACE4AAAhOAFFljFgAAAAB3RJTUUH4gsbFCYzALEYOAAAAzNJREFUSMedlltoz2EYx7+/zchspuXY/iShnAljYiaUQ4gLSty4kFwosXKhkEtalMMds5mSRORGcmou0HJMccHmEDk1bMM2Pm6enx5vv//+/3nq7Xd4Dt/3eZ/D+0gZqCG16e87UACMB/YB94EWW4+AKmAykK//oQBoGLALuEtmugpMC21kCzQcOA900j36DZR1CRozgGJgLXCjC4MfgHt2rO+7kJuRCawMeJph95uAEqCfrRSwHHieINsAFCV6CcxOUPBH2QosSBcKoAdwzo7T06Ik4TKgIxB8CTS67yonnwcsAEoTbG0N7NT/E0sgH7geCLUCGwMPc02+v8Wt09YTYLAPD1AZeDrS72hKwlFWAkuc0jMn/zhNbGcFntY43lnP2B8o3rD/yxxgvZPvANqAE1ZzMTUCA10C5gJ3jPcFGBozHgSApfZ/iDvSJgdYC8xz39VOd3eQ9XOAdtv45vjnV6fQBAx0xk46XrGr01wnM89trCOIZQ5wy3jXgFyZuzHdBQrN0Epgh+NVp6nduUFyVQSxXO14w2QdwwOWA58SkuInsDow1hc4HcjtTCiVduMdlHX+mJptpaM24DKwBziaJmPPJPTkY8Z7JWBCFwC/gO/AjwztrtnJ3HZAQ+25JBbMkfRCUkNCt2qXVClpoqTpkqokdRrvjaS3kp5LqpM0X1Iv4/VwNqYCPb39nCiKWiRdSgA8HEVRlaQJklZEUbRNUo3xHkoaJ2lyFEXrJPmif+3ex0jqa5tvlvQhxxjHJBEAvrHnO0l7gUmSLkr6LWmmpKIoir6ZzHand9O9l0rqLemXpFZJF3x6nwri8tGKOq6jFLDG4kp8qwOrgr5Z7GL4GRhho0kTMDasqSOW/p1mJE6aVcav870TKAzGjrMObKm1wVEmdwDISyrklO16C7A+7jx28cbetVt21wY3zDgHeNN52BMYntUwBfQBLjkwrDGEN7y/L8fYSTUCJZkAUqZQDhwMgNJRfdBDD9n/K0BBJsCKbk5oV4E+Tn+0DWAbgEFZjYjA4izBHsfN3gEWJY2c2YAuBG6nAXoP7A11/DMrsITjLbRL9LgNVS8tewd0ywtHfwA7LOPX/9An6gAAAABJRU5ErkJggg== "TODO Milestone name"
[milestone-status]: https://master3.takima.io/.assistant/badges/milestone-status?milestoneId=40
[Module: 0 credits]: https://img.shields.io/badge/ES6-0_credits-red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA0AB8AKD7i/b6AAAACXBIWXMAACE4AAAhOAFFljFgAAAAB3RJTUUH4gsbFCYzALEYOAAAAzNJREFUSMedlltoz2EYx7+/zchspuXY/iShnAljYiaUQ4gLSty4kFwosXKhkEtalMMds5mSRORGcmou0HJMccHmEDk1bMM2Pm6enx5vv//+/3nq7Xd4Dt/3eZ/D+0gZqCG16e87UACMB/YB94EWW4+AKmAykK//oQBoGLALuEtmugpMC21kCzQcOA900j36DZR1CRozgGJgLXCjC4MfgHt2rO+7kJuRCawMeJph95uAEqCfrRSwHHieINsAFCV6CcxOUPBH2QosSBcKoAdwzo7T06Ik4TKgIxB8CTS67yonnwcsAEoTbG0N7NT/E0sgH7geCLUCGwMPc02+v8Wt09YTYLAPD1AZeDrS72hKwlFWAkuc0jMn/zhNbGcFntY43lnP2B8o3rD/yxxgvZPvANqAE1ZzMTUCA10C5gJ3jPcFGBozHgSApfZ/iDvSJgdYC8xz39VOd3eQ9XOAdtv45vjnV6fQBAx0xk46XrGr01wnM89trCOIZQ5wy3jXgFyZuzHdBQrN0Epgh+NVp6nduUFyVQSxXO14w2QdwwOWA58SkuInsDow1hc4HcjtTCiVduMdlHX+mJptpaM24DKwBziaJmPPJPTkY8Z7JWBCFwC/gO/AjwztrtnJ3HZAQ+25JBbMkfRCUkNCt2qXVClpoqTpkqokdRrvjaS3kp5LqpM0X1Iv4/VwNqYCPb39nCiKWiRdSgA8HEVRlaQJklZEUbRNUo3xHkoaJ2lyFEXrJPmif+3ex0jqa5tvlvQhxxjHJBEAvrHnO0l7gUmSLkr6LWmmpKIoir6ZzHand9O9l0rqLemXpFZJF3x6nwri8tGKOq6jFLDG4kp8qwOrgr5Z7GL4GRhho0kTMDasqSOW/p1mJE6aVcav870TKAzGjrMObKm1wVEmdwDISyrklO16C7A+7jx28cbetVt21wY3zDgHeNN52BMYntUwBfQBLjkwrDGEN7y/L8fYSTUCJZkAUqZQDhwMgNJRfdBDD9n/K0BBJsCKbk5oV4E+Tn+0DWAbgEFZjYjA4izBHsfN3gEWJY2c2YAuBG6nAXoP7A11/DMrsITjLbRL9LgNVS8tewd0ywtHfwA7LOPX/9An6gAAAABJRU5ErkJggg== "ES6"

[SKILL javascript]: https://img.shields.io/badge/JS-%E2%98%85%E2%98%85%20%20-yellow.svg?longCache=true&style=for-the-badge&logoColor=ffffff&logo=javascript
[Milestone mmm]: https://img.shields.io/badge/maven_multi_module--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec
[TODO Extra Module X]: https://img.shields.io/badge/TODO_Extra_Module_x--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=java
[TODO Extra Milestone Y]: https://img.shields.io/badge/TODO_Extra_Milestone_y--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=cd1c68&colorB=db9ab5&logo=java
[Next Milestone angular]: https://img.shields.io/badge/next_Module_angular--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=angular

[es6]: .README/icons/es6.png
[babel]: .README/icons/babel.png
[webpack]: .README/icons/webpack.png
[sass]: .README/icons/sass.png
[lodash]: .README/icons/lodash.png

[mock]: .README/meme-ory-mock.png

[info]: .README/info.png
[warning]: .README/warning.png
[tip]: .README/success.png
[danger]: .README/danger.png
[error]: .README/error.png
[question]: .README/question.png
[troubleshoot]: .README/error.png
[commit]: .README/commit.png

[unknown-card-img]: .README/cards-miniatures/back-card.png
[takima-card-img]: .README/cards-miniatures/takima-card.png
[jawg-card-img]: .README/cards-miniatures/jawg-card.png
[gatling-card-img]: .README/cards-miniatures/gatling-card.png

[heart]: .README/smileys/heart_14x14.png "heart"
