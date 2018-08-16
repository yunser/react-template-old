import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'
import MyNav from './components/MyNav'

class MyComment extends Component {

    state = {
        title: '首页',
        type: 'all'
    }

    componentDidMount() {
        document.title = '我的消息'
        this.getData()
    }

    setType(type) {
        this.setState({
            type: type
        })
    }

    getData() {
        http.get(`/rest/messages/my`, {
            params: {
                token: '9364b10b60ba93c2bf7d02d0d2eb05757e3f0b78'
            }
        }).then(
            response => {
                let data = response.data
                console.log(data)
                if (data.code === '200') {
                    this.setState({
                        article: data.data
                    })
                }
                this.loading = false
            },
            response => {
                console.log(response)
                this.loading = false
            })
    }

    render() {
        let {type} = this.state

        return (
            <div className="page-me">
                <div className="container">
                    <MyNav />
                    <div>
                        <ul className="common-tab">
                            <li className={'item' + (type === 'all' ? ' active' : '')} onClick={this.setType.bind(this, 'all')}>
                                <span className="link">全部</span>
                            </li>
                            <li className={'item' + (type === 'system' ? ' active' : '')} onClick={this.setType.bind(this, 'system')}>
                                <span className="link">系统</span>
                            </li>
                            <li className="item"className={'item' + (type === 'like' ? ' active' : '')} onClick={this.setType.bind(this, 'like')}>
                                <span className="link" to="/me/email">赞</span>
                            </li>
                        </ul>
                        我的消息{type}
                    </div>
                </div>
            </div>
        )
    }
}

export default MyComment
