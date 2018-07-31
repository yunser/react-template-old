import React, { Component } from 'react'

class Home extends Component {

    test(asd) {
        alert(asd)
    }

    render() {
        return (
            <div>
                这是首页
                <button onClick={this.test('asd')}>测试一下</button>
            </div>
        )
    }
}

export default Home
