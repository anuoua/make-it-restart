const treeKill = require('tree-kill')
const spawnCommand = require('spawn-command')
const readline = require('readline');

module.exports = function (opts) {
    let config = Object.assign({
        script: undefined,
        exec: undefined,
        initRun: false,
        env: undefined,
    }, opts)

    if (!config.script && !config.exec) throw new Error('missing options')

    const cmd = config.exec || `node ${config.script}`

    let child;

    if (config.initRun === true) execFn()

    function execFn() {
        child = spawnCommand(cmd, {
            env: Object.assign({}, process.env, config.env)
        })
        readline.createInterface({
            input: child.stdout,
            output: process.stdout,
        })
        readline.createInterface({
            input: child.stderr,
            output: process.stderr,
        })
    }

    return function () {
        if (child) {
            treeKill(child.pid, 'SIGTERM', () => {
                console.log('restarting...')
                execFn()
            })
        } else {
            execFn()
        }
    }
}
