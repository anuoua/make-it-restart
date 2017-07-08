const treeKill = require('tree-kill')
const spawnCommand = require('spawn-command')

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
            stdio: 'inherit',
            env: Object.assign({}, process.env, config.env)
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
