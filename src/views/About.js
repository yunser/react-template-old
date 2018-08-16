import React, { Component } from 'react'
import Test from './Test'

class About extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: 'show'
        }
        // this.userId = options.match.params.id
    }

    componentDidMount() {
    }

    hide = () => {
        console.log('隐藏')   
        this.setState({
            show: 'hide'
        })
    }

    render() {
        return (
            <div className="">
                <div className="container">
                    这是关于页面
                    <Test show={this.state.show} />
                    <div onClick={this.hide}>点击传值</div>
                </div>
            </div>
        )
    }
}

export default About
