# make-it-restart [![](https://github.com/anuoua/make-it-restart/workflows/Node CI/badge.svg)](https://github.com/anuoua/make-it-restart/actions?workflow=Node+CI)

Make command or app restart. e.g. make electron/webpack... restart.

## usage

install
```bash
npm install make-it-restart --save-dev
```

create a restartor

```javascript
const restart = require('make-it-restart')
let restartor = restart(command, env)
```

### parameter

- `command`: it supports running commands directly which in `./node_modules/.bin/`, like `npm run`.
- `env`: set environment variables with an object.

## example

script.js
```javascript
let count = 0
console.log(process.env.NODE_ENV)
setInterval(() => {
    console.log(++count)
}, 500)
```

index.js
```javascript
const restart = require('make-it-restart')

let restartor = restart('node ./script.js', { NODE_ENV: 'production' })

restartor()

setInterval(() => {
    restartor()
}, 2000)
```
result
```bash
production
1
2
3
restarting...
production
1
2
3
restarting...
```
