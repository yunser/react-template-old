import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ToTop extends Component {

    constructor() {
        super()
        
        this.state = {
            show: false
        }
    }

    ToTop() {
        let timer = setInterval(() => {
            document.documentElement.scrollTop -= 60
            if (document.documentElement.scrollTop === 0) {
                clearInterval(timer)
            }
        }, 10)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll = () => {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            console.log('顶部' + scrollTop)
            if (scrollTop > 500) {
                this.setState({
                    show: true
                })
            } else {
                this.setState({
                    show: false
                })
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        const {show} = this.state

        let ret = null
        if (show) {
            ret = (
                <div className="to-top" onClick={this.ToTop}></div>
            ) 
        }
        return ret
    }
}

export default ToTop
