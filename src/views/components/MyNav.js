import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MyNav extends Component {

    state = {
        title: '首页',
        navs: [
            {
                title: '个人中心',
                to: '/me/profile'
            },
            {
                title: '我的消息',
                to: '/me/messages'
            },
            {
                title: '我的评论',
                to: '/me/comments'
            },
            // {
            //     title: '我的投稿',
            //     to: '/me/profile'
            // }
        ]
    }

    render() {
        let {navs} = this.state

        return (
            <ul className="my-nav-list">
                {navs.map((nav, index) =>
                    <li className="item" key={index}>
                        <Link className="link" to={nav.to}>{nav.title}</Link>
                    </li>
                )}
            </ul>
        )
    }
}

export default MyNav
