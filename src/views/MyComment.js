import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'

class MyComment extends Component {

    state = {
        title: '首页',
        navs: [
            {
                title: '个人中心',
                to: '/me/profile'
            },
            {
                title: '我的投稿',
                to: '/me/profile'
            },
            {
                title: '我的评论',
                to: '/me/comments'
            }
        ],
        open: false,
    }

    componentDidMount() {
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
        let {navs} = this.state

        let NavList = (
            <ul className="my-nav-list">
                {navs.map((nav, index) =>
                    <li className="item" key={index}>
                        <Link className="link" to={nav.to}>{nav.title}</Link>
                    </li>
                )}
            </ul>
        )

        return (
            <div className="page-me">
                <div className="container">
                    {NavList}
                    <div>
                        我的评论
                    </div>
                </div>
            </div>
        )
    }
}

export default MyComment
