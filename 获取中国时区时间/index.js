const moment = require('moment')
module.exports = {
    getNowTime(){
        return moment().locale('zh-cn').utcOffset(8)
    },
    /**
     * 转换时间戳
     * params {timeString} Array|String    like "2017/2/3"
     */
    transformTimestamp(timeString) {
        if (timeString && typeof (timeString) == "string") {
            return new Date(timeString).getTime()
        }

        if (timeString && timeString instanceof Array) {
            let times = timeString.map((time, i) => {
                if (time == "") return time;
                return new Date(time).getTime()        //毫秒
            })
            return times
        }
    },
}