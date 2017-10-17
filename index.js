const treeKill = require('tree-kill')
const spawnRun = require('spawn-run')
/**
 * @param  {string} command - commands like npm run.
 * @param  {object} env - object of environment variables.
 */
module.exports = function (command, env) {
    let child

    if (!command || typeof command !== 'string') {
        throw new Error('Please input right command')
    }

    function execFn() {
        child = spawnRun(command, {
            stdio: 'inherit',
            env: Object.assign({}, process.env, env)
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
