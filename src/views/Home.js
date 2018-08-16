import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'

class Home extends Component {

    constructor() {
        super()
        
        this.state = {
            currentPage: 2,
            articles: []
        }
    }

    componentDidMount() {
        document.title = '首页'
        console.log('http')
        console.log(http)
        this.getData()
    }

    test(asd) {
        alert(asd)
    }

    getData() {
        console.log('获取数据')
        let url = `/rest/articles`
        http.get(url, {
            params: {
                ifHome: 1,
                status: 1,
                channels: 1,
                pageIndex: this.state.currentPage,
                pageSize: 20,
                orderBy: 'postDate',
                orderType: 'desc'
            }
        }).then(
            response => {
                let data = response.data
                console.log(data)
                if (data.code === '200') {
                    this.setState({
                        articles: data.data
                    })
                }
            },
            response => {
                console.log(response)
            })
    }
    
    render() {
        const {articles} = this.state

        const ActicleList = (
            <div>
                <h2 className="">最新文章</h2>
                <ul className="home-article-list">
                    {articles.map(article =>
                        <div className="item" key={article.onlyUrl}>
                            <div className="type">{article.belongCategory}</div>
                            <Link className="img-box" to={'/articles/' + article.onlyUrl} style={{backgroundImage: `url("${article.picUrl}")`}}>
                                {/* <img className="img" src={article.picUrl} /> */}
                            </Link>
                            <div className="info">
                                <h3 className="title"><Link to={'/articles/' + article.onlyUrl}>{article.title}</Link></h3>
                                <div className="content">{article.introduction}</div>
                                <div className="meta">
                                    <Link className="user-name" to={`/users/${article.user.userId}`}>{article.user.userName}</Link>
                                    ·
                                    <span className="time">{article.postDate}</span>
                                </div>
                                <div className="comment">评论{article.commentTimes}</div>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        )

        return (
            <div>
                <div className="container">
                    {ActicleList}
                </div>
            </div>
        )
    }
}

export default Home
