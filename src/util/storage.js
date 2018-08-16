const storage = {
    set (key, value) {
        console.log('set', key, value)
        if (value === undefined || value === null) {
            localStorage.setItem(key, null)
            return
        }
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            localStorage.setItem(key, JSON.stringify({
                _type: typeof value,
                value: value
            }))
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    },
    get (key) {
        // console.log('storage get ' + key)
        let item = localStorage.getItem(key)
        if (item === null) {
            return null
        }
        let ret = JSON.parse(item)
        if (ret && typeof ret === 'object') {
            if (ret._type === 'string' || ret._type === 'number' || ret._type === 'boolean') {
                return ret.value
            }
        }
        return ret
    }
}

export default storage
