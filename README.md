> ![info] In javascript we can use quotes (') and double quotes ("") independently, though using simple quote is far more widespread 

# Initiation to modern web & ESNext ![Web 01: 10 credits]

[![milestone-status]](https://master3-assistant.takima.io?milestoneId=40&redirectUri=https%3A%2F%2Fmaster3.takima.io%2Fmaster3%2Fes6-01)

> Estimated reading time: **30 minutes**.

![javascript advanced]

##### Show me the slides
 - [Web 00 - The origins](https://docs.google.com/presentation/d/1P3ZGCCFOjCrn3035aQfsTejd65QA2m8VBGtKWnl5oGg/edit?usp=sharing)
 - [Web 01 - bundlers & modules](https://docs.google.com/presentation/d/19xq68gSw8oVmMhH03kzQo9-gQSSVbsxjgXKwwBseSf8/edit?usp=sharing)
 - [Web 02 - ESNext](https://docs.google.com/presentation/d/1uNeFVkYbIlvv0FV6tVs5SIgBs9vl5bM67QuqjTsS8c8/edit?usp=sharing)
 - [Tools & Frameworks](https://docs.google.com/presentation/d/1ADPASia_Cj3B5UoUnvGEHuMV5e8l9Mr1lxpM0gHK2NE/edit?usp=sharing)
 - [Fill in the talk survey (thank you ![heart])](https://docs.google.com/forms/d/1Lzkzv_7Mzt047OgtbkeWdDAvmESQ4UqbUnqYGc0LSD4/edit)

#### You are here because

 - you roughly know how to code with javascript
 - you want to start on Angular, React or other recent framework

## Abstract

In this module, we will learn how to do modern web development, 
using only javascript and a modern webpack stack, with no other JS framework.
The tools, patterns, and features used in this module will be a common ground for any Javascript project, 
and gives you all the basics you need to master more complex frameworks.

In this module, we will cover the following topics:
* **Ecmascript**: standardized and versioned version of what is commonly called "Javascript".
* **Browsers compatibility**: I know it's sad but there are more browsers than just Chrome, and you will have to deal with compatibility issues
* **ES next**: ES7 + ES8 + ES9 and more

#### Some useful references you should consider :

- the [cheatsheet.md](./CHEATSHEET.md)

#### Involved technologies
![es6]
![lodash]

![npm]
![yarn]

![webpack]
![babel]

![bootstrap]
![sass]

#### Prerequisites

 - have both **nodejs** and **npm** installed (NodeJS 6+)
    ```sh
   $ node -v
   v9.11.0 ### at least
   
   $ npm -v
   6.3.0 ### at least
   ```
   > ![tip] __Pro tip__: NVM is a very useful tool if you want to manage different versions of node at the same time.
Check it out at [github.com/creationix/nvm](https://github.com/creationix/nvm)
 - have a web browser that offers good tools for web developers
 
   > ![tip] __Pro tip__: Both Google Chrome and [Chromium](https://download-chromium.appspot.com/) surpasses Firefox & other web browsers in term of debugging capabilities (HTML, js, css, ...).
   I recommend to install one of those right now, and prefer using it whenever you have to develop web applications.  
 - have [`npx`](https://www.npmjs.com/package/npx) installed globally
 ```sh
 npm install -g npx
 ```
 > ![info] the `-g` parameter is to install a dependency **globally**. This way, the dependency will be available system-wide.
 
 > ![danger] By default on linux system, installing a dependency globally **requires root privileges**. 
 > However, I recommend to **NEVER EVER use `sudo npm install ...`**.  
 > What you can do instead, is to [configure NPM prefix](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to an accessible path, so that you never need to have root access.

## Setup

- Copy up all files from [`resources/setup`](resources/setup) to your working directory.
This folder contains sources for both the server and the front-end that composes our application.

Our web application will work together with a server. Set it up right now:
 - install the dependencies 
   ```bash
   cd server;
   npm install
   npm start
   ```
   > ![info] Have a look on [`resources/setup/server/server.js`](resources/setup/back-end), to see how far NodeJS shares similarities with JavScript.
 - Ensure the server is up and running: Connect to [http://localhost:8081/api-docs/](http://localhost:8081/api-docs/) and check the documentation is alive.

## Get started

Nowadays, nobody now uses bare javascript. Every modern application on the web make use of framework, 
built on top of javascript, that make the code cleaner, more performant and much more easy to maintain.

However, there are countless number of popular javascript frameworks, 
and picking up the "good one" is for the most part a matter of hype and fashion.
The competition is rude, and the "killer JS framework" is never the same from one year to another
![frameworks_battle]

> ![info] Takima master3 training has modules to discover both Angular and React: [![react module 01]](https://master3.takima.io/master3/react-01) & [![angular module 01]](https://master3.takima.io/master3/angular-01)

Anyway, all those frameworks are built on top some common basics. For now on, 
just let them fight forever and let's discover what is on the roots of what makes a modern web application. 

> ![tip] __pro tip__: At any point of your web developer carrier, 
just ditch all articles and StackOverflow posts you may find on the internet that are more than 2 years old... They are all outdated.  

### Functional spec

This tutorial will guide you through the implementation of a simple memory game, that is mainly made of 3 views:
* **the welcome view** (WelcomeComponent), containing a simple form allowing the user to enter his name, the game size and 
a start button to launch the game.
* **the game view allowing** (GameComponent) the user to play the memory game, flipping cards 2 by 2 until all the cards are turned upwards
* **the score view** (ScoreComponent), congratulating the user, allowing to start a new game and showing him is performance time

![game mockup]

Easy right? Well, the application will have to contain quite some ES6 features and use appropriate tools,
that's why we will guide you trough the configuration and some parts of the implementation. Ready? Set... GO!!!.

## Step 0 - Hello JS

topics: **HTTP server**.

Now that your game server is ready, time to crank up the front-end "as is", to check that everything works as intended.
On your local disk, open up the `client` folder you just copied, and double click on `meme-ory/src/index.html`. 
This should get you to the welcome view (`WelcomeComponent`).

![welcome screenshot]

##### Your first mission: 
Ensure everything works as intended: 
 - Start a new game, with **size=2** (`WelcomeComponent`), 
 - play (`GameComponent`), win.
 - get redirected to see you score (`ScoreComponent`).

> ![info] As you can see, we do not need anything other than a web browser to run a simple JS application... No tool, no compiler, etc.

Ok, let's get a little more serious. In real life, web pages are not accessed locally, 
they are instead served by an HTTP server (eg: [`nginx`](https://www.nginx.com/) or [`apache2`](`https://httpd.apache.org/`) over the network.

For this exercise, keep it simple and just crank-up the standalone nodeJS [`http-server`](https://www.npmjs.com/package/http-server):
```bash
>$ cd meme-ory/front-end
>$ npx http-server src -c-1
``` 
Now, navigate to [localhost:8080](http://localhost:8080): this should serve your application like for real!

> ![tip] **Did you know**? Your web browser can tell you a lot on what happens behind the scene (javascript execution, stack-traces, networking, errors, ...). Press F12 (firefox / chrome / chromium) to access the developper tools. You will need it all this tutorial long.

> ![question] While going through the 3 views of the application, how many files did your browser download in total? What was the total loading time? 

#### Files produced:
```
meme-ory/src/app/scripts/...
meme-ory/src/app/styles/...
meme-ory/src/app/views/...
```

### Checklist
- [ ] I can play meme-ory; The application looks 'OK' and works.
- [ ] My application is served at `localhost` with `http-server`

**![commit] commit step**

## Step 1 - The component architecture

topics: **components**, **closures**
Great, everything works. It is now time to dive into the code.
 
At the moment, your project structure look like the following: 

![mvc-architecture]

This file structure is a very common practise.... if you are stuck in the 2000's.
If you want your application to be maintainable, you want it to be **component oriented**, 
and promote **separation of concern** rather than **separation of technologies**.

> ![question] Component-oriented programming for the web is considered **more maintainable**. Why?

![component-architecture]

In this step, your job is to refactor your current architecture to match the **component-oriented** architecture above.

At the end, our application have a total of 4 components: 
 - `welcome.component`
 - `game.component`
 - `card.component`
 - `score.component`

For the beginning, let's start together with `WelcomeComponent`:
 - create a folder named `components/welcome`
 - move **[`scripts/welcome.js`](resources/setup/font-end/src/app/scripts/welcome.js) => `components/welcome.component.js`**
 - move **[`views/welcome.html`](resources/setup/font-end/src/app/views/welcome.html) => `components/welcome.component.html`**
 - from **[`styles/style.css`](resources/setup/font-end/src/app/styles/style.css)**, move all the styles for `WelcomeComponent` to **`components/welcome.component.css`**
 - open `components/welcome.component.html`, and update links toward CSS & JS:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>MÈME ory</title>
       <link rel="stylesheet" href="./welcome.component.css"> <!-- <=== HERE -->
       <link rel="stylesheet" href="../../styles/style.css"> <!-- <=== HERE -->
       <link rel="stylesheet" href="../../styles/bootstrap.css"> <!-- <=== HERE -->
   </head>
   
   <body class="...">
   <nav class="...">
       <a class="..." href="#">
           <img class="..." src="../../../assets/logo_take_my_money.png" alt="logo"> <!-- <=== HERE -->
           <span class="...">MÈME ory</span>
       </a>
       <span class="..."></span>
   </nav>
       <!-- ... -->
   
   <!-- link to welcome controller -->
   <script src="./welcome.component.js"></script> <!-- <=== HERE -->
   <script>
       // execute the controller
       var wc = new WelcomeComponent().render();
   </script>
   </html>
   ```

 - open `components/welcome.component.js`, and replace link toward `GameComponent`:
   ```javascript
   window.location = './game.html?name=' + name + '&size=' + size;
   ```
   by its new future location:
   ```javascript
   window.location = '../game/game.component.html?name=' + name + '&size=' + size;
   ```
 - navigate to [http://localhost:8080/app/components/welcome/welcome.component.html](http://localhost:8080/app/components/welcome/welcome.component.html): The welcome page should look and behave as usual.

> ![info] Component oriented architecture is not only about file structure. 
The most important part is: a component should be **contained** (all required code at the same place), **standalone** (little to no external dependency) and **reusable**. 

Easy enough, isn't it? Now, go ahead and do the same by yourself for the other `GameComponent`, `CardComponent`, and `ScoreComponent`. 
You can search for text `TODO Step 1` to find out all the lines of code you need to change.  

> ![info] Do not search for `card.html`. At the moment, its content is a `<template></template` inside [`views/game.html.js`](resources/setup/font-end/src/app/views/game.html#L35). 
In other words, `CardComponent` does not have a `card.component.html`. 

> ![warning] Do not forget to also move assets to the best appropriate components

#### Files produced:

```
src/app/components/game/card/assets/*.png
src/app/components/game/card/card.component.js
src/app/components/game/card/card.component.css
src/app/components/game/game.component.html
src/app/components/game/game.component.js
src/app/components/score/happy_homer.jpg
src/app/components/score/score.component.css
src/app/components/score/score.component.html
src/app/components/score/score.component.js
src/app/components/welcome/welcome.component.css
src/app/components/welcome/welcome.component.html
src/app/components/welcome/welcome.component.js
```

> ![question] If you look at the source code, all JS file wraps its code into a **closure**: 
> ```javascript
> // card.component.js
> (function() {   // TODO remove closure
>     // source code here
>     // ...
> })();
> ```
> Try to remove the 2 closures from both `card.component.js` & `game.component.js`. What happens? Why?  
> Once figured out, you can just remove that useless malicious code.

> ![tip] Do not forget to use your web browser's development tools!

### Checklist
 - [ ] the 3 views of my application behaves as usual
 - [ ] `scripts/` folder is empty and can be deleted
 - [ ] `views/` folder is empty and can be deleted
 - [ ] `styles/` folder contains a single `styles.css` file
 - [ ] `styles.css` defines no more that global styles (eg: style applied to `<body>`)
 - [ ] I understand why **component-oriented architecture** might be of some help
 - [ ] I understand why closure are needed 
 - [ ] There is no `TODO Step 1` in my code anymore 

**![commit] commit step**

Great, this is a little step toward proper component-oriented architecture, 
but there is still a lot of work to make the code more modern.

## Step 2 - ESNext

Right now, our javascript code follows [ES5 specifications](https://www.w3schools.com/js/js_es5.asp). 
As you can see, ES5 was released in 2009, and appears a bit outdated now. 
Time has come to refactor all that mess with new [ESNext bells and whistles](https://github.com/tc39/proposals/blob/master/finished-proposals.md), starting with [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 

> ![tip] Step 2.xxx are only about javascript. There is nothing to change is HTML or CSS files.

### Step 2.1 - ES6 classes

topics: **classes**

At the moment, your legacy code already use classes. 
If you look carefully at the `render()` method of [`game.component.js`](resources/setup/font-end/src/app/scripts/game.js#L45), you can see the following: 
```javascript
for (var i in this._config.ids) {
    this._cards[i] = new CardComponent(this._config.ids[i]);
} //               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

That's true, `GameComponent`, `WelcomeComponent`, `CardComponent` & `ScoreComponent`, they are all classes already, using **`prototye`**.

> ![tip] Think of **`XXX.protoype`** as a place to put anything (typically, any function), that will be a member of the `XXX` class. 
A `new XXX()` then inherits from everything placed in the prototype.  

In this step, we get ride of all those vintage ES5-style `prototype`, and replace them by the `class` keyword.
 
Let's take `CardComponent` first as an example, and follow those steps carefully:
 - open `card.component.js`
 - Rewrite function `CardComponent() {...}` to a class `CardComponent`: Replace `function` by `class`, and put function body inside a `constructor() {...}`.
    ```javascript
    // card.component.js // before
    function CardComponent(id) {
        this._flipped = false;
         // [1]
         // ...
    }
    // [2]
    // ...
    ```
    
    ```javascript
    // card.component.js // after
    (function() {
        class CardComponent {   
            constructor(id) {
                 this._flipped = false;
                // [1]
                // ...
            }
        }
        // [2]
        // ...
    })();
    ```
    > ![info] Unlike classes in other languages, javascript offers no encapsulation (`private` / `protected` members). 
    If you want encapsulation, you should consider using [**Typescript**](https://www.typescriptlang.org/) instead of *Javascript* 
    
    > ![tip] Notice that some attributes are prefixed with a underscore. (`this._****`). 
    This is a widespread convention to tell that this property should be considered private. 

 - create the methods: Whenever you see `CardComponent.prototype.XXX = ...`, move the function body inside the class, in a method called `XXX() {}`:
   ```javascript
   class CardComponent {
       constructor(id) {
            // [1]
            // ...
       }

       getElement() {
           return this._elt;
       }

       flip() {
           this._imageElt.classList.toggle('flip');
           this._flipped = !this._flipped;
       }

       equals(card) {
           return card._id === this._id;
       }
   }
   ``` 
 - create the `get` and `set` properties: 
   Whenever you see `Object.defineProperties(CardComponent.prototype, { XXX: { get: ..., set: ... } })`, move the function body inside the class, in a get / set property
   ```java
   get flipped() {
       return this._flipped;
   }
   ```
 
    > ![info] set/set properties are like casual getters / setters that are called through a property access.  
    In other words, do not write: 
    > 
    > ```javascript
    > class Shape {
    >     // getters / setters
    >     getArea() { return this._area; }
    >     setArea(area) { this._area = area; }
    >     
    >     // get/set properties
    >     get area() { return this._area; }
    >     set area(area) { this._area = area; }
    > }
    > const s = new Shape();
    > 
    > // the two are equivalent.
    > s.setArea(s.getArea() * 2);  
    > s.area = s.area * 2;
    > ```

- Leave as is all the stuff that does not belong to `CardComponent.prototype`.

Test your application. Does the game still run? Great. Now, refactor all other components so they all use ES6 classes as well.

> ![warning] As a java developer, it might look like Java classes and Javascript classes behaves the same. 
This is not true. Do not forget: ES6 `class` is just syntactic sugar over `prototype`, and might produce some edge-cases.

> ![question] Can you think of at least 2 things that are possible with java classes, but cannot be done with ES6 classes? 

### Checklist
 - [ ] I know how to define ES6 classes
 - [ ] I know they are still `prototypes` under the hood 
 - [ ] I know what get/set properties are
 - [ ] I left no unresolved `// TODO Step 2.1` on my code

**![commit] commit step**

The code seems much more clean and concise with classes, isn't it? Let's continue our refactor in the next step.  

### Step 2.2 - ES6 refactor

topics: **`Function.bind()`**, **arrow functions**, **template literals**
Open `game.component.js`, and look at the `gotoScore()` method:
```javascript
function gotoScore() {
    var now = Date.now();
    var timeElapsedInSeconds = Math.floor((now - this._startTime ) / 1000);

    setTimeout(function() {
            window.location = '../score/score.component.html?name=' + this._name + '&size=' + this._size + '&time=' + timeElapsedInSeconds;
        }.bind(this), 750);
    }
```
This methods waits 750ms before redirecting to the `ScoreComponent`.
Here is a bit of work to do: 
 - Since ES6 introduced `let` and `const`, usage of `var` is deprecated. Here, you need to replace both `var` by `const`.
   > ![question] What are the differences between `var` and `let`;

 - Concatenate strings is not something we should enjoy in any language. Fortunately, ES6 offers an alternative for that, namely **template litterals**.  
   **Instead of this:** 
   ```javascript
    window.location = '../score/score.component.html?name=' + this._name + '&size=' + this._size + '&time=' + timeElapsedInSeconds;
   ```
   you'd better write this:
   ```javascript
    window.location = `../score/score.component.html?name=${this._name }&size=${this._size}&time=${timeElapsedInSeconds}`;
   ```
 - Did you see that callback passed to `setTimeout()`?  
   With ES6's new **Arrow functions**, it become much more easy to write anonymous functions or callback functions. 
   Rewrite this with the `() => { ... }` syntax.
   > ![question] What is the `.bind(this)` stuff? What does happen if you remove it? Use your web browser's debugger to guess what happens.
 
   > ![question] The shorten syntax aside, what is the difference between?
   > ```javascript
   > setTimeout(function() { console.log(this._name); }, 750);
   > ```
   > and 
   > ```javascript
   > setTimeout(() => console.log(this._name));
   > ```

Now, go ahead over all the code, and modernize every `var`, every `function() {}` and every string concatenation you can found.

> ![info] You can search for `// TODO Step 2.2` to find out all the places you need to rewrite code.

### Step 2.3 - Functionnal programming

topics: **map**, **


Last but not least, let's refactor our code with one of the most useful and awaited feature that came with ES6: was the **Arrow functions**


## Step - babel

All all things all good, our code start to look as something clean and modern... 
However, there is still a major drawback: While virtually [all browsers can run ES5 code](http://kangax.github.io/compat-table/es5/),
 [not all web browser are compatible with ES6](http://kangax.github.io/compat-table/es6/) / ESNext (looking at you, Internet explorer...)  
(looking at you, IE 11)  

### Step - PhantomJS
test parseUrl with arrow functions => crash!

## Step - import




## Step 1 - NPM & webpack setup
> NPM, webpack

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
[www.npmjs.com](https://www.npmjs.com/). Your NPM module relies on this json file, you can find the documentation
for this file here: [docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json).

> ![info] There are alternatives to npm, yarn for example is quite notorious and has very good performance:
[yarnpkg.com](https://yarnpkg.com/en/).

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
      ["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]
    ],
    "plugins": []
}
```

> ![troubleshoot] ES6 object.defineProperty caused by some wrong dependencies
>```sh
>Module not found: Error: Can't resolve 'core-js/modules/es6.object.define-property' 
>```
>Check your version against the ones provided, clean your node_modules/ and reinstall.
>The preset-env may also need the corejs version to be defined: corejs: 3

> ![tip] __Pro tip__: You can check how babel actually process javascript easily there: [babeljs.io/repl](https://babeljs.io/repl)

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
    new CleanWebpackPlugin(),
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

> ![tip] __Tip__: If you want to simplify your _../../../relative/import/paths_, have a look at 
[webpack.js.org/configuration/resolve/](https://webpack.js.org/configuration/resolve/) and 
[www.jetbrains.com/help/idea/using-webpack.html](https://www.jetbrains.com/help/idea/using-webpack.html).

### Step 1.3 - run webpack

###### > ![warning] Do not forget to put the `node_modules` directory within `.gitignore`.

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

### Step 1.4 - How Source Map ?

First of all we'll see how this simple piece of code comes with when map-sources are disabled.

```javascript
//webpack.config.js
  ...
  module.exports = {
      ...
      devtool:false,
      ...
  },
  ...
```

* what is the difference in the javascript console?
* In which .js file and which line is the console.log ('Hello World'); ? 

When we want to debug, it will quickly be a problem. 


**The solution: Map sources**

However in production we will not debug and of course we want to keep the big advantage of bundle.js of webpack (saving time because less opening file ...).
For this we need to know in the webpack configuration file, when we are in development or production.

**Environment variable webpack**

see : https://webpack.js.org/guides/environment-variables/


* In the node scripts, from the package.json file, add a Webpack environment variable that will give us information:

```javascript
// package.json
{
  ...
  "scripts": {
      "build": "webpack --config webpack.config.js --env.NODE_ENV=prod",
      "dev": "webpack-dev-server --env.NODE_ENV=dev"
  },
  ...
}
```



* By retrieving the NodeJs process we can retrieve our environment variable to limit the source map to the dev environment.


see https://webpack.js.org/configuration/devtool/


* In the table of **devtools** at the previous link we chose: cheap-module-eval-source-map. Quick to rebuild and shows us the original code.


```javascript
//webpack.config.js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env => {

  return {
    watch: true,
    devtool: env.NODE_ENV === "dev" ? "cheap-module-eval-source-map" : "source-map",
    entry: './src/app/index.js',
    plugins: [
      new CleanWebpackPlugin(),
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
  }
};

```



### Checklist
 - [ ] I know how to setup a npm module
 - [ ] I know npm package basis
 - [ ] I know webpack basic setup and commands

[troubleshoot](#troubleshoot)

## Step 2 - Style the application
> semantic-ui, webpack loader, sass

This step is about adding some styling to the application: semantic-ui and sass support.

**Why ?** Have some initial styling and support compiled css.

**At the end, we should have a semantic-ui app embedding sass custom styling.**

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
> ES Next features, lodash, Promise, async/await, debugger

In this step you will implement the memory game logic using ES Next features and more.

**Why ?** Get to write modern Javascript code and use modern front-end development tools.

At the end, the user should be able to play the memory game.

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
        └── app/
            └── modules/
                ├── welcome/
                │   ├── welcome.component.js
                │   ├── welcome.html
                │   └── welcome.scss
                ├── game/
                │   ├── game.component.js
                │   ├── game.html
                │   └── game.scss
                └── end/
                    ├── score.component.js
                    ├── end.html
                    └── end.scss
```
* webpack configuration should be adjusted to output 3 views as well, using chunks
```javascript
//webpack.config.js
module.exports = {
    // ...
      entry: {
        app: './src/app/modules/welcome/welcome.component.js',
        game: './src/app/modules/game/game.component.js',
        end: './src/app/modules/end/score.component.js'
      },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          files: {
            chunks: {
              app: {
                entry: './src/app/modules/welcome/welcome.component.js'
              },
              game: {
                entry: './src/app/modules/game/game.component.js'
              },
              end: {
                entry: './src/app/modules/end/score.component.js'
              }
            }
          }
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/app/modules/welcome/welcome.html',
          chunks: ['app']
        }),
        new HtmlWebpackPlugin({
          filename: 'game.html',
          template: './src/app/modules/game/game.html',
          chunks: ['game']
        }),
        new HtmlWebpackPlugin({
          filename: 'end.html',
          template: './src/app/modules/end/end.html',
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
* install and import lodash (documentation: [lodash.com/docs](https://lodash.com/docs))
> ![info] Lodash is a utility library covering a lot of use cases, although we will not need to use it that much 
in this project. Indeed we will emphasize on ES next features that actually include a lot of lodash functions (which is 
a good sign) we encourage you to check useful functions like: _.clone, _.assign, _.partial, _.curry...
```sh
npm install --save lodash
```
> ![question] Have a look at your package.json file, what does the "^" mean in front of the versions?
* add minimal validation, player name: alphanumerical and length between 3 and 20, size: number between 2 and 10
* link the form to the **game view** passing parameters as get params

To help you here are a couple code snippets:
```javascript
//welcome.component.js
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
└── app/
    └── modules/
        ├── welcome/
        ├── game/
        │   ├── card.component.js
        │   ├── board.js
        │   ├── game.component.js
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

> ![tip] __Pro tip__: Using Javascript online runners can be very useful to isolate a bug and get help from the community.
We used jsfiddle here but other like: [plnkr.co](https://plnkr.co/) or [jsbin.com](https://jsbin.com) will do. And the best interpreter will 
be directly your browser console.

##### How to handle this with the dom
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

##### Shuffle your cards
We will use the server inside `/resources` ̀folder on this Git repository to handle the shuffle, 
* install and run the server
```sh
cd ../resources/server
npm install
node server.js
```

![server-detail]


**Fetch API or Ajax with promise ?**

![asynchronous-communication]

We will use the Fetch API because it is lighter to code it.

```javascript
//AJAX
          const req = new XMLHttpRequest();

          req.onreadystatechange = function(event) {
              if (this.readyState === XMLHttpRequest.DONE) {
                  if (this.status === 200) {
                    ...
                  } else {
                    ...
                  }
              }
          };

          req.open('GET', 'http://domain/service', true);
```
*  That's already heavy without even mentioning the sending of the header

**adopted solution?**


```javascript
//Fetch API
  const myPromise = fetch('http://domain/service',{method: 'GET'})
                      .then( response => response.json() )
                      .catch( error => console.error('error:', error) );

  (await myPromise) ...
```


* use the fetch api to call the server (localhost:8081/ with **nb** and **size** as get parameters)

For the parameters, **nb** is the number of the image you have and **size** the number of pairs you want to guess.

The server return a ID list : ?nb=5&size=2 will return {ids: [0, 4, 3, 4, 0, 3]}

> ![tip] __Pro tip__: Use Postman to try your http request on your API

* use the IDs list to shuffle you cards

#### 3.3.2 - Implementation

* initialize the game with *n* cards, using 2 classes: *Board* and *CardComponent*
```javascript
//board.js
//note: the board contains an array of Cards
import {CardComponent} from "./card";

export class Board {

  constructor(size) {
    this._size = size;
    this._cards = [];
    //...
  }

  init() {
      //...
      for (let i = 0; i < this._size; i++) {
        this._cards.push(new CardComponent());
      }
  }
  
  //...

}
```
```javascript
//card.component.js
//the card is bound to an element and holds 2 flags: flipped and matched
export class CardComponent {
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

* display a congratulation message to the user with his last performance

> This view is very simple we will improve it in the section 

### Checklist
 - [ ] I know how to modularize a webpack app
 - [ ] I know how to handle a basic form
 - [ ] I know how to use Javascript classes
 - [ ] I know lodash basis
 - [ ] I know how to handle Javascript asynchronous behavior using Promise and async/await 
 - [ ] I know the concept of Javascript scope/closure
 - [ ] I know the basis of debugging in a browser

## Step 4 - Unit testing and browser support
> Unit test, jasmine, phantomJS

This step is about setting up a proper front-end testing environment.

**Why ?** Have a good idea on how to unit test Javascript code.

**At the end, we should have a proper unit test set and a task to run it.**

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

You can drop the `./spec/support/jasmine.json` file, it's unused with Karma.

#### 4.2.2 - Installation

We will use these plugins in our project :

[karma-webpack](https://www.npmjs.com/package/karma-webpack) will generates a webpack bundle for each test _(and allow jasmine to understand the ESNext syntax)_

[karma-jasmine](https://www.npmjs.com/package/karma-jasmine) will provide in an adapter for Jasmine

[karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter) will use the [Mocha](https://mochajs.org/) style logging for the cli report

[karma-jasmine-html-reporter](https://www.npmjs.com/package/karma-jasmine-html-reporter) will dynamically shows our tests results on the debug.html page

[karma-phantomjs-launcher](https://www.npmjs.com/package/karma-phantomjs-launcher) will run our tests on a headless browser

* Install Karma
```sh
npm install karma karma-jasmine jasmine-core ^
            karma-webpack ^
            karma-mocha-reporter ^
            karma-jasmine-html-reporter ^
            karma-phantomjs-launcher --save-dev
```

* Init Karma
```sh
$karma init
Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> PhantomJS
> 

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> spec/**/*.spec.js
```

> ![tip] in order to use Karma as a CLI, we need to globally install Karma-cli using ̀̀̀`npm install -g karma-cli`

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

You will see these problems if you run like so
> ![troubleshoot] We use webpack without specifying the 'mode' option (production or development)
>```sh
>WARNING in configuration
>The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
>```

> ![troubleshoot] PhantomJS doesn't understand the ES6 syntax
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

As you see, we define the mode for webpack, and the 
[babel rule to transpile our code to ES5](https://babeljs.io/docs/en/babel-preset-env) for PhantomJS. 
Add other configurations here if necessary

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
> web storage usage, cookies

In this section we will improve the end view by displaying the last performance of the user in a table.

* store the game history using the web storage [developer.mozilla.org/fr/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API)
     sessionStorage and localStorage
> ![question] What is the main difference between the two? Check what happens if you close, the current tab or the browser.
* also store the game history in indexedDB: [developer.mozilla.org/fr/docs/Web/API/API_IndexedDB/Using_IndexedDB](https://developer.mozilla.org/fr/docs/Web/API/API_IndexedDB/Using_IndexedDB),
[developers.google.com/web/ilt/pwa/working-with-indexeddb](https://developers.google.com/web/ilt/pwa/working-with-indexeddb) 
using the following *Storage* class should be very easy
```javascript
//utils.js
export class Storage {

    constructor() {
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }
        let idb = indexedDB.open('memory', 1);
        this._idb = idb;

        idb.onupgradeneeded = e => {
            if (!e.target.result.objectStoreNames.contains('game')) {
                e.target.result.createObjectStore('game',{keyPath: 'id', autoIncrement: true});
            }
        };
    }

    write(data) {
        const tx = this._idb.result.transaction('game', 'readwrite');
        const gameStore = tx.objectStore('game');
        gameStore.add(data);
        return new Promise((resolve, reject) => {
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    }

    readAll() {
        const tx = this._idb.result.transaction('game', 'readonly');
        const gameStore = tx.objectStore('game');
        const get = gameStore.getAll();
        return new Promise((resolve, reject) => {
            get.onsuccess = e => resolve(e.target.result);
            get.onerror = reject;
        });
    }
}
```
> ![question] What is the difference between localStorage and indexedDB?

> ![info] The cookie interface is quite similar to the one we used although it has a different lifecycle, have a look at:
(developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/cookies)[https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/cookies]

### Checklist
 - [ ] I stored the user game history in sessionStorage, localStorage and indexedDB
 - [ ] I mapped proper Promise from indexedDB and resolve/reject it
 - [ ] I know how to use web storage and differences between APIs

## Step 6 - Bonus: Production deployment

Deploy the built application in a nginx docker image for a production ready meme-ory client.
We will use this image: (nginx)[https://hub.docker.com/_/nginx]

```dockerfile
FROM nginx
COPY dist /usr/share/nginx/html
```

> ![info] Do not forget to build the app with webpack before building the docker container (*npm run build*)

## The end

Congrats, you now have a working ![heart] Meme-ory app ![heart] !

Check your achievements with the [following test](https://docs.google.com/forms/d/e/1FAIpQLScjhXdaYV48uRRaVG_5ZYOFlWhLjGzIty3SCZJRe0ApnUpe9A/viewform?usp=sf_link)

Ready to follow up? Get started for next [![angular 01]](https://master3.takima.io/master3/angular-01) module.  

## Troubleshoot

Any specific troubles? Keep us updated and we will add those here.

# Contributors
 - Logan LEPAGE <[llepage@takima.fr](mailto://llepage@takima.fr)>
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>
 - Pierre-Quentin Warlot <[pqwarlot@takima.fr](mailto://pqwarlot@takima.fr)>

### Mentors
 - Logan LEPAGE <[llepage@takima.fr](mailto://llepage@takima.fr)>
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>


| <sub>contact us: <[formation@takima.io](mailto://formation@takima.io)></sub> | <sub>© Takima 2019</sub> |
| --- | ---:|

[milestone-status]: https://master3.takima.io/.assistant/badges/milestone-status?milestoneId=40
[Web 01: 10 credits]: https://img.shields.io/badge/web_01-10_credits-red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA0AB8AKD7i/b6AAAACXBIWXMAACE4AAAhOAFFljFgAAAAB3RJTUUH4gsbFCYzALEYOAAAAzNJREFUSMedlltoz2EYx7+/zchspuXY/iShnAljYiaUQ4gLSty4kFwosXKhkEtalMMds5mSRORGcmou0HJMccHmEDk1bMM2Pm6enx5vv//+/3nq7Xd4Dt/3eZ/D+0gZqCG16e87UACMB/YB94EWW4+AKmAykK//oQBoGLALuEtmugpMC21kCzQcOA900j36DZR1CRozgGJgLXCjC4MfgHt2rO+7kJuRCawMeJph95uAEqCfrRSwHHieINsAFCV6CcxOUPBH2QosSBcKoAdwzo7T06Ik4TKgIxB8CTS67yonnwcsAEoTbG0N7NT/E0sgH7geCLUCGwMPc02+v8Wt09YTYLAPD1AZeDrS72hKwlFWAkuc0jMn/zhNbGcFntY43lnP2B8o3rD/yxxgvZPvANqAE1ZzMTUCA10C5gJ3jPcFGBozHgSApfZ/iDvSJgdYC8xz39VOd3eQ9XOAdtv45vjnV6fQBAx0xk46XrGr01wnM89trCOIZQ5wy3jXgFyZuzHdBQrN0Epgh+NVp6nduUFyVQSxXO14w2QdwwOWA58SkuInsDow1hc4HcjtTCiVduMdlHX+mJptpaM24DKwBziaJmPPJPTkY8Z7JWBCFwC/gO/AjwztrtnJ3HZAQ+25JBbMkfRCUkNCt2qXVClpoqTpkqokdRrvjaS3kp5LqpM0X1Iv4/VwNqYCPb39nCiKWiRdSgA8HEVRlaQJklZEUbRNUo3xHkoaJ2lyFEXrJPmif+3ex0jqa5tvlvQhxxjHJBEAvrHnO0l7gUmSLkr6LWmmpKIoir6ZzHand9O9l0rqLemXpFZJF3x6nwri8tGKOq6jFLDG4kp8qwOrgr5Z7GL4GRhho0kTMDasqSOW/p1mJE6aVcav870TKAzGjrMObKm1wVEmdwDISyrklO16C7A+7jx28cbetVt21wY3zDgHeNN52BMYntUwBfQBLjkwrDGEN7y/L8fYSTUCJZkAUqZQDhwMgNJRfdBDD9n/K0BBJsCKbk5oV4E+Tn+0DWAbgEFZjYjA4izBHsfN3gEWJY2c2YAuBG6nAXoP7A11/DMrsITjLbRL9LgNVS8tewd0ywtHfwA7LOPX/9An6gAAAABJRU5ErkJggg== "Web 01"
[react module 01]: https://img.shields.io/badge/react_01--react.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=react "react module 01"
[angular module 01]: https://img.shields.io/badge/angular_01--angular.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=angular "angular module 01"

[javascript advanced]: https://img.shields.io/badge/JS-%E2%98%85%E2%98%85%20%20-yellow.svg?longCache=true&style=for-the-badge&logoColor=ffffff&logo=javascript
[angular 01]: https://img.shields.io/badge/angular_01--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=angular

[es6]: .README/icons/es6.png
[babel]: .README/icons/babel.png
[webpack]: .README/icons/webpack.png
[sass]: .README/icons/sass.png
[lodash]: .README/icons/lodash.png
[bootstrap]: .README/icons/bootstrap-64x64.png
[npm]: .README/icons/npm-64x64.png
[yarn]: .README/icons/yarn-64x64.png

[game mockup]: .README/mockup.png
[ecmascript-support]: .README/ecmascript-support.png
[welcome screenshot]: .README/meme-ory-1.png
[mvc-architecture]: .README/mvc-architecture.png
[component-architecture]: .README/component-architecture.png
[server-detail]: .README/server-detail.png

[asynchronous-communication]: .README/asynchronous-communication.png

[info]: .README/info.png
[warning]: .README/warning.png
[tip]: .README/success.png
[danger]: .README/danger.png
[error]: .README/error.png
[TODO]: .README/error.png
[question]: .README/question.png
[troubleshoot]: .README/error.png
[commit]: .README/commit.png

[frameworks_battle]: .README/frameworks_battle.jpg
[unknown-card-img]: .README/cards-miniatures/back-card.png
[takima-card-img]: .README/cards-miniatures/takima-card.png
[jawg-card-img]: .README/cards-miniatures/jawg-card.png
[gatling-card-img]: .README/cards-miniatures/gatling-card.png

[heart]: .README/smileys/heart_14x14.png "heart"
