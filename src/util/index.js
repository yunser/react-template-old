const util = {

    getQuery(search, key) {
        console.log(search.split('?')[1])
        let kvs = search.split('?')[1]
        let arr = kvs.split('&')
        let ret = {}
        for (let item of arr) {
            let kv = item.split('=')
            ret[kv[0]] = kv[1]
        }
        console.log(ret)
        return ret
    },

    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },

    localQuery(_that, name) {
        let value = '';
        if (!this.isEmpty(_that) &&
            !this.isEmpty(_that.props) &&
            !this.isEmpty(_that.props.location) &&
            !this.isEmpty(_that.props.location.query)) {
            value = _that.props.location.query[name];
        }
        if (this.isEmpty(value)) {
            value = this.getQueryString(name);
        }
        return value;
    },

    isNull(obj) {
        return obj === null || typeof obj === 'undefined' || obj === undefined;
    },

    isEmpty(obj) {
        return this.isNull(obj) || obj === '';
    }
}


export default util
