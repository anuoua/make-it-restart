# make-it-restart
yeah! make it restart

## usage

install
```bash
npm install make-it-restart --save-dev
```

create a restartor

```javascript
const restart = require('make-it-restart')
let restartor = restart(option)
```

`option`

- `script` the path of js script.
- `exec` your command.
- `initRun` when init restartor, run it immediately or not.
- `env` set environment variable with an object (don't use `set` in windows or `export` in linux to set environment with `exec`, it's useless).

NOTE: `script` and `exec`, just choose one. if you set both of them, exec will run.

example

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
let restartor = restart({
    script: './script.js',
    initRun: true,
    env: {
        NODE_ENV: 'production'
    }
})

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
production
1
2
3
```