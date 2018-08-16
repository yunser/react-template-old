import React, { Component } from 'react'
import http from '../util/http'

class Login extends Component {

    state = {
        loginRegisterVisibale: true,
        // 登录
        account: '1418503647@qq.com',
        password: 'cjh18lkj',
        // 注册
        registerEmail: '1418503647@qq.com',
        registerPassword: '123456',
        registerConfirmPassword: '123456',
        code: '',
        codeUrl: 'http://www.leikeji.com/captcha',
        tip: ''
    }

    handleChange = event => {
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }

    toggleLogin = () => {
        console.log('关闭')
        this.setState({
            loginRegisterVisibale: !this.state.loginRegisterVisibale
        })
    }

    // 更新验证码
    updateCode = () => {
        this.setState({
            codeUrl: 'http://www.leikeji.com/captcha?' + new Date().getTime()
        })
    } 

    login = () => {
        let tip = ''
        if (!this.state.account) {
            this.setState({
                tip: '账号不能为空'
            })
            return
        }
        if (!this.state.password) {
            this.setState({
                tip: '密码不能为空'
            })
            return
        }
        console.log(this.state)
        http.post('/rest/auth', {
            loginaccount: this.state.account,
            password: this.state.password
        }).then(
            response => {
                let data = response.data
                if (data.code !== '200') {
                    this.setState({
                        tip: data.message
                    })
                    return
                }
                console.log(data.data)
            },
            response => {
                console.log(response)
            })
    }

    register = () => {
        let tip = ''
        if (!this.state.registerEmail) {
            this.setState({
                tip: '邮箱不能为空'
            })
            return
        }
        if (!this.state.registerPassword) {
            this.setState({
                tip: '密码不能为空'
            })
            return
        }
        if (!this.state.registerConfirmPassword) {
            this.setState({
                tip: '确认密码不能为空'
            })
            return
        }
        console.log(this.state)
        http.post('/rest/auth', {
            loginaccount: this.state.account,
            password: this.state.password
        }).then(
            response => {
                let data = response.data
                if (data.code !== '200') {
                    this.setState({
                        tip: data.message
                    })
                    return
                }
                console.log(data.data)
            },
            response => {
                console.log(response)
            })
    }

    getUserInfo = () => {
        let tip = ''
        if (!this.state.account) {
            this.setState({
                tip: '账号不能为空'
            })
            return
        }
        if (!this.state.password) {
            this.setState({
                tip: '密码不能为空'
            })
            return
        }
        console.log(this.state)
        http.post('/rest/auth', {
            loginaccount: this.state.account,
            password: this.state.password
        }).then(
            response => {
                let data = response.data
                if (data.code !== '200') {
                    this.setState({
                        tip: data.message
                    })
                    return
                }
                console.log(data.data)
            },
            response => {
                console.log(response)
            })
    }

    render() {
        const {account, password, tip, registerEmail, registerPassword, registerConfirmPassword, code, codeUrl} = this.state

        return (
            <div className="login-box">
                <div className="box-content">
                    <div className="box-header">
                        <div>登录</div>
                        <div>注册</div>
                        <a title="关闭" className="close iconfont icon-close" onClick={this.toggleLogin}></a>
                    </div>
                    <div className="box-body">
                        {tip &&
                            <div className="tip">{tip}</div>
                        }
                        <input name="account" placeholder="用户名 | 邮箱" value={account} onChange={this.handleChange} />
                        <br/>
                        <input name="password" value={password} placeholder="密码" />
                        <br />
                        <button onClick={this.login}>登录</button>
                        <span onClick={this.getUserInfo}>获取用户信息</span>
                        <hr />
                        <input name="account" placeholder="邮箱" value={registerEmail} onChange={this.handleChange} />
                        <br/>
                        <input name="account" placeholder="邮箱" value={registerPassword} onChange={this.handleChange} />
                        <br/>
                        <input name="account" placeholder="邮箱" value={registerConfirmPassword} onChange={this.handleChange} />
                        <br/>
                        <input name="account" placeholder="验证码" value={code} onChange={this.handleChange} />
                        <img src={codeUrl} />
                        <span onClick={this.updateCode}>看不清，换一个</span>
                        <br/>
                        <button onClick={this.register}>注册</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
