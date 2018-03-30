exports._enum = (object) => {
    return new Proxy(object, {
        //当对象访问时
        get(target, prop) {
            //如果访问不存在的key 就报错
            if (target[prop]) {
                return Reflect.get(target, prop)       //  ==  target.prop
            } else {
                throw new ReferenceError(`Unknown enum ${prop}`)
            }
        },
        //当添加key 时  就抛错
        set() {
            throw new TypeError('Enum is readonly')
        }
    })
}