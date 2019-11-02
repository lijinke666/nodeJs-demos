/**
 * const require = (id) => {
 *   return module.exports
 * }
 */

const app = require('./module')
const app2 = require('./exports')

app.test()
app.a() // TypeError: app.a is not a function
app2.test()
