import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import http from '../util/http'
import storage from '../util/storage'
import Notifications, {notify} from 'react-notify-toast'
import classNames from 'classnames'

class ArticleDetail extends Component {

    constructor(options) {
        super()

        this.articleId = options.match.params.id

        this.state = {
            loading: false,
            // 文章
            article: null,
            relateArticles: [],
            // 评论
            comments: [],
            inputComment: ''
        }
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        document.title = '文章详情'
        console.log('componentDidMount')
        console.log(http)
        this.getData()
    }

    getData() {
        this.loading = true
        // 获取文章详情
        let url = `/rest/articles/${this.articleId}`
        http.get(url).then(
            response => {
                let data = response.data
                console.log(data)
                let article = data.data
                article.isLike = storage.get('article_like_' + article.id)
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
        // 获取评论列表
        console.log('获取评论')
        http.get(`/rest/comments`, {
            params: {
                entityType: 'Article',
                entityId: this.articleId,
                pageIndex: 1,
                pageSize: 20
            }
        }).then(
            response => {
                let data = response.data
                console.log(data)
                if (data.code !== '200') {
                    // wx.showToast({
                    //     title: '获取评论失败',
                    //     duration: 2000
                    // })
                    return
                }
                this.setState({
                    comments: data.data
                })
            },
            response => {
                console.log(response)
                this.loading = false
            })
        // 获取相关文章
        http.get(`s/relateEntities`, {
            params: {
                entityId: this.articleId,
                entityType: 'article',
                relateType: 0,
                limit: 4
            }
        }).then(
            response => {
                let data = response.data
                console.log(data)
                if (data.code === '200') {
                    this.setState({
                        relateArticles: data.data
                    })
                }
                this.loading = false
            },
            response => {
                console.log(response)
                this.loading = false
            })
    }

    // 文章点赞
    like() {
        console.log('赞')
        this.likeOrUnlike('like')
    }

    // 文章踩
    unlike() {
        this.likeOrUnlike('water')
    }

    // 文章赞或踩
    likeOrUnlike(type) {
        if (storage.get('article_like_' + this.state.article.id) || storage.get('article_unlike_' + this.state.article.id)) {
            notify.show('你已经点过赞了', 'error', 1000)
            return
        }
        this.setState({
            article: this.state.article
        })
        http.post('/s/touchEntity', {
            entityType: 'Article',
            entityId: this.state.article.id,
            touchType: type,
            belongUserId: -1 // TODO 游客
        }).then(
            response => {
                let data = response.data
                if (data.code !== 200) {
                    notify.show('点赞失败', 'error', 1000)
                    return
                }
                
                if (type === 'like') {
                    this.state.article.likeTimes++
                    this.state.article.isLike = true
                    this.setState({
                        article: this.state.article
                    })
                    storage.set('article_like_' + this.state.article.id, true)
                } else {
                    this.state.article.isUnlike = true
                    this.state.article.waterTimes++
                    this.setState({
                        article: this.state.article
                    })
                    storage.set('article_unlike_' + this.state.article.id, true)
                }
                console.log('赞')
                storage.set('asd', 'asasadsasa')
                console.log9=(storage.get('asd'))
                console.log(data.data)
            },
            response => {
                console.log(response)
            })
    }

    // 评论点赞
    likeComment(comment, index) {
        if (storage.get('comment_like_' + comment.commentId)) {
            notify.show('你已经点过赞了', 'error', 1000)
            return
        }
        console.log('评论点赞', comment)
        http.post('/s/touchEntity', {
            entityType: 'Comment',
            entityId: comment.commentId,
            touchType: 'like',
            belongUserId: -1 // TODO
            // belongUserId: getGlobalData('user') ? (getGlobalData('user').userId || -1) : -1
        }).then(
            response => {
                let data = response.data
                if (data.code !== '200') {
                    notify.show('点赞失败', 'error', 1000)
                    return
                }
                storage.se('comment_like_' + comment.commentId, true)
                this.state.comments[index].likeTimes++
                this.setState({
                    comments: this.state.comments
                })
            },
            response => {
                console.log(response)
            })
    }

    // 评论输入
    handleInputChange(e) {
        this.setState({
            inputComment: e.target.value
        })
    }

    // 评论
    comment() {
        console.log('评论')
        if (!this.state.inputComment) {
            notify.show('请输入评论内容', 'error', 1000)
            return
        }
        
        http.post('/s/addComment', {
            entityType: 'Article',
            entityId: this.articleId,
            content: this.state.inputComment,
            whereEntityType: 'Article',
            whereEntityId: this.articleId,
            // belongUserId: getGlobalData('user').userId
        }).then(
            response => {
                let data = response.data
                if (data.code !== '200') {
                    notify.show('评论失败', 'error', 1000)
                    return
                }
                notify.show('评论成功', 'success', 1000)
                this.getCommentList()
            },
            response => {
                console.log(response)
            })
    }

    // 取消评论
    removeComment(comment) {
        console.log('删除评论', comment)
        http.delete('/rest/comments', {
            entityType: 'Comment',
            entityId: comment.commentId,
            touchType: 'like',
            belongUserId: -1 // TODO
            // belongUserId: getGlobalData('user') ? (getGlobalData('user').userId || -1) : -1
        }).then(
            response => {
                let data = response.data
                if (data.code !== '200') {
                    // wx.showToast({
                    //     title: '点赞失败',
                    //     icon: 'none',
                    //     duration: 2000
                    // })
                    return
                }
            },
            response => {
                console.log(response)
            })
    }

    render() {
        const {loading, comments, article, relateArticles} = this.state

        // 加载中
        let Loading = null
        if (loading) {
            Loading = (
                <div>加载中</div>
            )
        }

        let Comment = (
            <div>
                <div className="commnet-box">
                    <input className="input" type='text' placeholder='说点什么...' value={this.state.inputComment} onInput={this.handleInputChange.bind(this)}/>
                    <div className="comment" onClick={this.comment.bind(this)}>评论</div>
                </div>

                <div className="comment-list">
                    {comments.map((comment, index) =>
                        <div className="item" key={comment.commentId}>
                            <img className="user-avatar" src={comment.user.avatarUrl} />
                            <div className="info">
                                <div className="header">
                                    <div className="user-name">{comment.user.userName}</div>
                                    评论{comment.commentTimes}
                                    <div onClick={this.likeComment.bind(this, comment, index)}></div>
                                    <span className="icon icon-zixun">赞 {comment.likeTimes}</span>
                                </div>
                                <div className="content">{comment.content}</div>
                                <div className="time">{comment.updateTime}</div>
                                <div onClick={this.removeComment.bind(this, comment)}>删除评论</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )

        // 文章详情
        let Article = null
        if (article) {
            Article = (
                <div className="article-box">
                    <div>
                        <span>评论{article.commentTimes}</span>
                        <span onClick={this.like.bind(this)} className={classNames('article-like', {active: article.isLike})}>赞{article.likeTimes}</span>
                    </div>

                    <img className="main-img" src={article.photoUrl} />
                    <h1 className="title">{article.title}</h1>
                    <div className="info">
                        <div>
                            <img className="user-avatar" src={article.user.avatarUrl} />
                            <span className="user-name">{article.user.name}</span>
                            |
                            <span className="time">{article.postDate}</span>
                        </div>
                        
                    </div>
                    <article className="article article-content" dangerouslySetInnerHTML={{__html: article.content}}></article>
                    <ul className="tag-list">
                        {article.tags.map(tag =>
                            <li className="item" key={tag.tagId}>{tag.tagName}</li>
                        )}
                    </ul>
                </div>
            )
        }

        // 相关文章
        let RelateArticle = (
            <ul className="relate-article-list">
                {relateArticles.map(article =>
                    <li className="item" key={article.articleId}>
                        <Link to={'/articles/' + article.articleId}>
                            <img className="img" src={article.picUrl} />
                            <h3 className="title">{article.title}</h3>
                        </Link>
                    </li>
                )}
            </ul>
        )
        return (
            <div className="page-article-detail">
                <div className="container">
                    {Loading}
                    {article &&
                        <div>
                            这是面包屑导航
                            {Comment}
                            {Article}
                            {RelateArticle}
                        </div>
                    }
                </div>
                <Notifications />
            </div>
        )
    }
}

export default ArticleDetail
