ctrl + f & replace:
 - `#F5F5F5 = $grey-100-color`
 - `#cb2468 = $primary`
 - `#FCFCFC = $primary-txt`

* turn component into class extends Component
* turn render into a method: 
render(outlet) {
	super(outlet);
}

replace css classes (.game, .card, .score, .welcome) by they component names (game, card, score, welcome)

WelcomeComponent
================
replace 
```
'./game.html?name=' + name + '&size=' + size
```
by
```
 `game?name=${name}&size=${size}`
```

GameComponent
============
lodash.capitalize

remove duplicated parseUrl
created class `environment`

factorize with parseUrl();
replace callback fn by arrow function. use `this.start` instead of `_this.start`
replace `var i in this._cards` with `forEach`
# Checklist:
 - component has no more concatenated strings. (use string literals)
 - component is a class
 - component within a web module (removed closure)
 - component use no `var` (only `const` & `let`)
 

parseUrl() => replace with Array.map.forEach
 
CardComponent
===============

Move assets


