# Cheatsheet ES6

## Technologies
### NVM [github.com/creationix/nvm](https://github.com/creationix/nvm)
 - `nvm install <version>` install <version> of node
 - `nvm use --lts` use installed lts of node
 - `nvm ls` lists current versions
### Node [nodejs.org](https://nodejs.org)
 - `node script.js` runs script.js
 - `node` runs node interpreter
### NPM [npmjs.com](https://www.npmjs.com/)
 - `npm init` inits a npm module
 - `npm i` or `npm install` install current module, based on ./package.json
    - `npm i --save <dependency>`, `npm i --save-dev <dependency>` install dependency and save it to node_modules/ and
    package.json file
 - `npm run <command>` run-script, run commands defined in scripts
 
A problem with some dependencies?
npm stores the installed modules in ./node_modules (that's why we do not push those files)
just delete the folder (`rm -rf node_modules/`) and do another install
npm also manages his own cache, you can check this using `npm cache verify`, want to clean the cache? `npm cache clean`

## Tools
### Webpack [webpack.js.org](https://webpack.js.org)
 - `webpack [--config webpack.config.js]` bundle using config file
 - `webpack <entry> [<entry>] -o <output>` bundle entry file into output
### Karma [karma-runner.github.io](https://karma-runner.github.io/latest/index.html)
 - `karma init` generates karma conf
 - `karma start` start test server and run the tests


| <sub>contact us: <[formation@takima.io](mailto://formation@takima.io)></sub> | <sub>© Takima 2019</sub> |
| --- | ---:|
