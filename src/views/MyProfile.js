import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'
import MyNav from './components/MyNav'

class MyProfile extends Component {

    state = {
        title: '首页',
        open: false,
    }

    componentDidMount() {
        document.title = '我的信息'
        this.getData()
    }

    getData() {
        http.get(`/rest/users/49347`).then(
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
        return (
            <div className="page-me">
                <div className="container">
                    <MyNav />
                    <div>
                        <ul className="common-tab">
                            <li className="item active">
                                <Link className="link" to="/me/profile">我的信息</Link>
                            </li>
                            <li className="item">
                                <Link className="link" to="/me/password">设置密码</Link>
                            </li>
                            <li className="item">
                                <Link className="link" to="/me/email">邮箱绑定</Link>
                            </li>
                        </ul>
                        我的信息
                        <button className="btn btn-primary">按钮</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile
