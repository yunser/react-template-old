import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'
import classNames from 'classnames'

class Article extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // 类型
            types: [
                {
                    name: '精选'
                },
                {
                    name: '新鲜事'
                },
                {
                    name: '涨知识'
                },
                {
                    name: '嘿科技'
                },
                {
                    name: '智能榜'
                },
                {
                    name: '撸评测'
                },
                {
                    name: 'VR专区'
                }
            ],
            currentType: '精选',
            // 文章
            currentPage: 1,
            articles: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        console.log('获取数据')
        let colName = this.state.currentType
        if (this.state.currentType === '精选') {
            colName = '看点'
        } else if (this.state.currentType === 'VR专区') {
            // colName = 'VR资讯,VR装备,VR游戏,VR应用'
            colName = 'VR资讯'
        }
        let url = `/columns/getArticleList`
        http.get(url, {
            params: {
                ifHome: 1,
                status: 1,
                channels: 1,
                pageIndex: this.state.currentPage,
                pageSize: 20,
                orderBy: 'postDate',
                orderType: 'desc',
                colName: colName
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

    // 选择文章类型
    selectType = typeName => {
        this.setState({
            currentPage: 1,
            currentType: typeName
        }, () => {
            this.getData()
        })
    }

    render() {
        const {articles, types, currentType} = this.state

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

        let Type = (
            <div className="type-box">
                <ul className="type-list">
                    {types.map(type =>
                        <li className={classNames('item', {active: type.name === currentType})}
                            onClick={this.selectType.bind(this, type.name)}>
                            {type.name}
                        </li>
                    )}
                </ul>
            </div>
        )
        return (
            <div className="page-article">
                <div className="container">
                    {Type}
                    {ActicleList}
                </div>

            </div>
        )
    }
}

export default Article
