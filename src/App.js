import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
// page
import Home from './views/Home'
import About from './views/About'
import ArticleDetail from './views/ArticleDetail'
import MyProfile from './views/MyProfile'
import MyComment from './views/MyComment'
import MyPassword from './views/MyPassword'
import MyEmail from './views/MyEmail'
import MyMessage from './views/MyMessage'
import UserHome from './views/UserHome'
import Error404 from './views/Error404'
import Login from './views/Login'
import Search from './views/Search'
import ToTop from './views/components/ToTop'

// ui
// import MenuIcon from '@material-ui/icons/Menu';
// import Footer from './Footer'
import './scss/main.scss';

class PrimaryLayout extends Component {
    
    // constructor(props) {
    //     super(props)
    // }

    state = {
        title: '首页2',
        loginRegisterVisibale: true,
        open: false,
        redirect: false
    }

    setTitle(title) {
        // this.setState('title', title)
    }

    // login() {
    //     this.setState({
    //         loginRegisterVisibale: true
    //     })
    // }

    toggleLogin = () => {
        console.log('关闭')
        this.setState({
            loginRegisterVisibale: !this.state.loginRegisterVisibale
        })
    }

    getUserInfo = () => {

    }

    search() {
        console.log(this.router)
        this.setState({
            redirect: true
        })
    }

    render() {
        const {loginRegisterVisibale, keyword, redirect} = this.state

        if (redirect) {
            return <Redirect push to={'/search?keyword=' + keyword} />
        }

        // let LoginRegister = loginRegisterVisibale ? Login : null

        // console.log('渲染', LoginRegister)

        return (
            <div className="app page-wrap">
                <header className="page-header">
                    <div className="container">
                        <Link to="/">
                            <img className="logo" src="http://www.leikeji.com/static/images/logo_mobile.png" />
                        </Link>
                        <ul className="header-nav-list">
                            <li className="item">
                                <Link to='/'>首页</Link>
                            </li>
                            <li className="item">
                                <Link to='/about'>关于</Link>
                            </li>
                        </ul>
                        <input />
                        <button onClick={this.search.bind(this)}>搜索</button>
                        <span className="iconfont icon-edit"></span>
                        <span onClick={this.toggleLogin}>登录</span>
                        <span onClick={this.toggleLogin}>注册</span>

                        <ul>
                            <li><Link to="/me/home">我的主页</Link></li>
                            <li><Link to="/me/profile">个人中心</Link></li>
                            {/* <li><Link to="/personal/setting">我的主页</Link></li> */}
                        </ul>
                    </div>
                </header>
                <div className="page-body">
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/articles/:id" component={ArticleDetail} />
                    <Route path="/me/profile" component={MyProfile} />
                    <Route path="/me/comments" component={MyComment} />
                    <Route path="/me/email" component={MyEmail} />
                    <Route path="/me/password" component={MyPassword} />
                    <Route path="/me/messages" component={MyMessage} />
                    <Route path="/users/:id" component={UserHome} />
                    <Route path="/search" component={Search} />
                    {/* <Route path="*" component={Error404} /> */}
                </div>
                <footer className="page-footer">
                    <div className="container">
                        <div>
                            <ul>
                                <li><Link to='/'>首页</Link></li>
                                <li><Link to='/about'>关于</Link></li>
                                <li><Link to='/articles/1212'>文章详情</Link></li>
                                <li><Link to='/search?keyword=穷'>搜索</Link></li>
                            </ul>
                        </div>
                    </div>
                </footer>
                {/* <Login /> */}
                <ToTop />
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <PrimaryLayout />
            </BrowserRouter>
        )
    }
}

export default App;
