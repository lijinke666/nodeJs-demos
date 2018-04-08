const schedule = require('node-schedule')
const cron = ({ minute = 1 }={})=>  {
        const rule = `*/${minute} * * * *`
        const job = schedule.scheduleJob(rule, async () => {
            testFn()
        })
}

const testFn = ()=> {
    console.log(1111);
}


cron({minute:1})