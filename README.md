# Initiation to ESNext ![Module: 0 credits]

[![milestone-status]](https://master3-assistant.takima.io?milestoneId=40&redirectUri=https%3A%2F%2Fmaster3.takima.io%2Fmaster3%2Fes6-01)

> read estimate : **TODO 30 minutes**.

![SKILL javascript]

#### You are here because

 - you know how to code in javascript
 - you want to start on Angular, React or other recent framework
 - You have basic knowledge in **ES6 or newer**

## Bill of modules

This tutorial is designed to come after those topics :

[![Milestone mmm]](https://master3.takima.io/master3/mmm-01)

If you did not achieved those topics, please consider using their correction.

## Abstract

##### \>>>>>  ![error] TODO complete complete abstract
In this milestone, we will focus on ...

>Write a short paragraph to ...
 
##### \<<<<<

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
 - have **nodejs** and **npm** installed

## Setup

##### \>>>>>  ![error] TODO complete setup
  - `sudo apt-get install nodejs npm`

During the whole README, if you feel something needs a particular attention, or is an extra,
please widely use the quotes below.

> ![info] TODO_some_more_info.

> ![warning] TODO_some_warning.

> ![tip] __Pro tip__: TODO_some_tip.

> ![danger] TODO_some_danger

> ![question] TODO_some_question

##### \<<<<<

## Get started

##### \>>>>>  ![error] TODO complete "get started"
[TODO write get started]
Basically the same as abstract, but with more **storytelling**.

[TODO remember current context]
The trainees are at some certain point of the training. Recall what we have right now, before telling about what we want right now

[TODO introduce main goals.]

A short paragraph to introduce the goals,
 - why are we doing this milestone, why is it important to do so...
 - what is the benefit once the milestone is achieved
 - ...

[TODO introduce tools core strength]
##### \<<<<<

## Step 1 - NPM & webpack setup
topics: NPM, webpack

##### \>>>>>  ![error] TODO introduce chapter goal
This step is about setting up a standard npm module containing a webpack application, this will be the project skeleton.

**Why ?** Have a standardized NPM module and an easily runnable webpack application.

**At the end, we should have ...** [TODO step result]
##### \<<<<<

### Step 1.1 - init your npm project
```sh
mkdir meme-mory
cd meme-mory/
npm init -y
npm install
```
* set your package as private
```json
//package.json
{
  ...
  "private": true,
  ...
}
```
Files produced:
```sh
package.json
```
![commit] **commit step**
### Step 1.2 - webpack: install and naive setup

Webpack is a javascript tool used to bundle a web application, basically a coffee maker used in 99% of web projects.
Webpack can be quite a complex bundler and does a lot of its work behind the scene, we will go trough a simple manual 
setup to check what is going on. You can check the documentation to get a deeper insight of this tool:
[https://webpack.js.org/guides/getting-started/] & [https://webpack.jakoblind.no/]
(you might also want to check webpack-cli, a tool to help you create your webpack config: [https://github.com/webpack/webpack-cli])

Let's head to our setup, this will start by installing everything we need:
```sh
npm install --save-dev webpack webpack-dev-server \
babel-loader @babel/core @babel/preset-env \
clean-webpack-plugin html-webpack-plugin
```
> ![question] What's the difference between the options --save-dev, --save and none?

Create your webpack client application containing: .babelrc, src/index.html and src/app/index.js:
```
mem-ory
│   .babelrc
│   package.json
└───src
    │   index.html
    └───app
        |   index.js
    
```
```json
// .babelrc
{
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ]
}
```
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

### Step 1.3 - run webpack
Now let's configure how we run our application using webpack by defining 2 npm scripts:
```json
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
* *npm run dev* will be used to start a local development server

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

* add semantic-ui-css to the project
```sh
npm install --save semanti-ui-css
```
* load semantic-ui css in the application before your styling
```javascript
//index.js
// ...
import 'semantic-ui-css/semantic-ui.min.css';
// ...
```
* add webpack static loader to handle semantic-ui fonts
```javascript
//webpack.config.js
// ...
module: {
    loaders: [        // ...
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
}
// ...
```
* add sass support
[https://sass-lang.com/guide]
[https://github.com/webpack-contrib/sass-loader]

## Step 3 - Implement memory game
topics: ES6 features, lodash, Promise, async/await, debugger

## Step 4 - Unit testing and browser support
topics: Unit test, jasmine, phantomJS, polyfill

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
 - [TODO contributor] John DOE <[jdoe@takima.fr](mailto://jdoe@takima.fr)>
 - ...

### Mentors
 - [TODO mentor] John DOE <[jdoe@takima.fr](mailto://jdoe@takima.fr)>
 - ...


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

[info]: .README/info.png
[warning]: .README/warning.png
[tip]: .README/success.png
[danger]: .README/danger.png
[error]: .README/error.png
[question]: .README/question.png
[troubleshoot]: .README/error.png
[commit]: .README/commit.png

[heart]: .README/smileys/heart_14x14.png "heart"
