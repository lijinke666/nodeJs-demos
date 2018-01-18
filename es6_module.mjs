//目前 nodejs 中 使用 import 模块语法 还是实验性的 后缀名要为 xx.mjs

//启动:node --experimental-modules xx.mjs

import fs from "fs"
import path from "path"

const data = fs.readFileSync(path.resolve("./exec.js")).toString()

console.log(data);