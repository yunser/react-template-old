import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'
import util from '../util/index'
import Notifications, {notify} from 'react-notify-toast'

class Search extends Component {

    constructor(props) {
        super(props)
        console.log(window.location.href)
        
        console.log(util.localQuery('keyword'))
        this.keyword = util.getQuery(this.props.location.search).keyword
        console.log(this.keyword)
        this.userId = props.match.params.id
    }

    state = {
        loading: false,
        total: 0,
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
        this.setState({
            loading: true
        })
        http.get(`/search`, {
            params: {
                pageIndex: this.state.currentPage,
                pageSize: 10,
                keyword: this.keyword,
                type: 'json'
            }
        }).then(
            response => {
                let data = response.data
                console.log(data)
                if (data.code !== 200) {
                    notify.show('请求搜索结果失败', 'error', 1000)
                    return
                }
                let articles = []
                if (this.state.currentPage === 1) {
                    articles = data.data.items
                } else {
                    articles = this.state.articles.concat(data.data.items)
                }
                this.setState({
                    loading: false,
                    articles: articles,
                    total: data.data.total
                })
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
        let {articles, type, loading, total} = this.state

        const ActicleList = (
            <div>
                <div>共 {total} 条结果</div>
                <ul className="search-article-list">
                    {articles.map(article =>
                        <div className="item" key={article.id}>
                            <Link className="link" to={'/articles/' + article.id}>
                                <div className="img-box" style={{backgroundImage: `url("${article.pic_url}")`, backgroundSize: 'cover'}}>
                                    {/* <img className="img" src={article.picUrl} /> */}
                                </div>
                                <h3 className="title"><Link to={'/articles/' + article.id}>{article.title}</Link></h3>
                                <div>{article.introduction}</div>
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
                <Notifications />
            </div>
        )
    }
}

export default Search
