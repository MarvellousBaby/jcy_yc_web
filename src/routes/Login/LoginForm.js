import React from 'react'
import {calculateWidth} from '../../utils/utils'
import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react/index'
import {Form, Input, message} from 'antd'
import PromptBox from '../../components/PromptBox'

import {login} from '../../api/loginApi'


@withRouter @inject('appStore') @observer @Form.create()
class LoginForm extends React.Component {
    state = {
        focusItem: -1,   //保存当前聚焦的input
    }

    componentDidMount() {
    }

    loginSubmit = (e) => {
        e.preventDefault()
        this.setState({
            focusItem: -1
        })
        this.props.form.validateFields((err, values) => {
            console.log("values", values);
            let params = {
                userName: "admin",
                userPwd: "123456"
            }
            login(params).then(res => {
                console.log("res", res);
                message.success(111);
                this.props.appStore.toggleLogin(true, {username: values.username})

                const {from} = this.props.location.state || {from: {pathname: '/'}}
                this.props.history.push(from)
            }).catch(error => {
                message.error(222)
            })
        })
    }

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form
        const {focusItem} = this.state
        return (
            <div className={this.props.className}>
                <h3 className='title'>登录</h3>
                <Form onSubmit={this.loginSubmit}>
                    <Form.Item help={getFieldError('username') &&
                    <PromptBox info={getFieldError('username')} width={calculateWidth(getFieldError('username'))}/>}>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名'}]
                        })(
                            <Input
                                onFocus={() => this.setState({focusItem: 0})}
                                onBlur={() => this.setState({focusItem: -1})}
                                maxLength={16}
                                placeholder='用户名'
                                addonBefore={<span className='iconfont icon-User'
                                                   style={focusItem === 0 ? styles.focus : {}}/>}/>
                        )}
                    </Form.Item>
                    <Form.Item help={getFieldError('password') &&
                    <PromptBox info={getFieldError('password')} width={calculateWidth(getFieldError('password'))}/>}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码'}]
                        })(
                            <Input
                                onFocus={() => this.setState({focusItem: 1})}
                                onBlur={() => this.setState({focusItem: -1})}
                                type='password'
                                maxLength={16}
                                placeholder='密码'
                                addonBefore={<span className='iconfont icon-suo1'
                                                   style={focusItem === 1 ? styles.focus : {}}/>}/>
                        )}
                    </Form.Item>
                    <div className='bottom'>
                        <input className='loginBtn' type="submit" value='登录'/>
                    </div>
                </Form>
                <div className='footer'>
                    <div>欢迎登陆真烟外流信息管理系统</div>
                </div>
            </div>
        )
    }
}

const styles = {
    focus: {
        width: '20px',
        opacity: 1
    },
}

export default LoginForm