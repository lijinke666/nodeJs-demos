/**
 * const require = (id) => {
 *   return module.exports
 * }
 */

const app = require('./module')
const app2 = require('./exports')

app.test()
app2.test()
