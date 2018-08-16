import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ToTop extends Component {

    ToTop() {
        // document.body.scrollTop = 0
        // document.body.scrollTo = 0
        console.log(document.body.scrollTop)
        // document.documentElement.scrollTop = 0
        
        let timer = setInterval(() => {
            document.documentElement.scrollTop -= 60
            if (document.documentElement.scrollTop === 0) {
                clearInterval(timer)
            }
        }, 10)
    }

    render() {
        return (
            <div className="to-top" onClick={this.ToTop}></div>
        )
    }
}

export default ToTop
