import React, { Component } from 'react'
import Test from './Test'
import { Link } from 'react-router-dom'

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

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        console.log(nextProps)
        // this.articleId = nextProps.match.params.id
        // // 当路由切换时跳到页面顶部
        // if (this.props.location !== nextProps.location) {
        //     window.scrollTo(0,0)
        // }
        // this.init()
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
                    这是关于页面
                    <div><Link to="/about">关于</Link></div>
                    <div><Link to="/about?v=2">关于2</Link></div>
                    <Test show={this.state.show} />
                    <div onClick={this.hide}>点击传值</div>
                </div>
            </div>
        )
    }
}

export default About
