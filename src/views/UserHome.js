import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'

class UserHome extends Component {

    constructor(options) {
        super()

        this.userId = options.match.params.id
    }

    state = {
        loading: true,
        title: '首页',
        currentPage: 1,
        articles: [],
        type: 'new'
    }

    componentDidMount() {
        document.title = '用户主页'
        this.getData()
        window.addEventListener('scroll', this.handleScroll = () => {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            console.log(scrollTop)
            if (window.innerHeight + scrollTop > document.body.scrollHeight - 100) {
                if (!this.loading) {
                    this.loading = true
                    this.loadMore()
                }
            }
            console.log(window.innerHeight + scrollTop, document.body.scrollHeight)
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        console.log('浏览器滚动事件')
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop

        console.log(scrollTop)
        if (window.innerHeight + scrollTop > document.body.scrollHeight - 200) {
            this.loadMore()
        }
        console.log(window.innerHeight + scrollTop, document.body.scrollHeight)
    }

    loadMore() {
        console.log('加载更多')
        this.setState({
            loading: true,
            currentPage: this.state.currentPage + 1
        }, () => {
            this.getData()
        })

    }

    getData() {
        console.log('加载数据')
        http.get(`/personal/latestArticles`, {
            params: {
                userId: this.userId,
                pageIndex: this.state.currentPage,
                pageSize: 12
            }
        }).then(
            response => {
                let data = response.data
                console.log(data)
                if (data.code === '200') {
                    let articles = []
                    if (this.state.currentPage === 1) {
                        articles = data.data
                    } else {
                        articles = this.state.articles.concat(data.data)
                    }
                    this.setState({
                        articles: articles
                    })
                }
                this.loading = false
            },
            response => {
                console.log(response)
                this.loading = false
            })
    }

    setType(type) {
        this.setState({
            type: type
        })
    }

    render() {
        let {articles, type, loading} = this.state

        const ActicleList = (
            <div>
                <ul className="user-article-list">
                    {articles.map(article =>
                        <div className="item" key={article.onlyUrl}>
                            <Link className="link" to={'/articles/' + article.onlyUrl}>
                                <div className="img-box" style={{backgroundImage: `url("${article.picUrl}")`, backgroundSize: 'cover'}}>
                                    {/* <img className="img" src={article.picUrl} /> */}
                                </div>
                                <h3 className="title"><Link to={'/articles/' + article.onlyUrl}>{article.title}</Link></h3>
                            </Link>
                        </div>
                    )}
                </ul>
            </div>
        )

        return (
            <div className="page-me">
                <div className="container">
                    <div>
                        <ul className="common-tab">
                            <li className={'item' + (type === 'new' ? ' active' : '')} onClick={this.setType.bind(this, 'new')}>
                                <span className="link" to="/">最新文章</span>
                            </li>
                            <li className={'item' + (type === 'hot' ? ' active' : '')} onClick={this.setType.bind(this, 'hot')}>
                                <span className="link" to="/">最热文章</span>
                            </li>
                        </ul>
                        {ActicleList}
                        {loading &&
                            <div>加载中{loading}</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHome
