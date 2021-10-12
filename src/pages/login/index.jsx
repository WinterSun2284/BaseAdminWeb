import React, {Component} from 'react';
import {Form, Input, Button} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import './index.less'
import Logo from './images/logo.png'

/**
 * 登录路由组件
 */
class Login extends Component {

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    render() {
        return (
            <div className={'login'}>
                {/*头部*/}
                <header className={'login-header'}>
                    <img src={Logo} alt={"logo"}/>
                    <h1>基础项目框架</h1>
                </header>
                {/*中间登录框*/}
                <section className={'login-content'}>
                    <h2>用户登录</h2>
                    <div>
                        <Form
                            name="login"
                            className="login-form"
                            initialValues={{remember: true}}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: '请输入用户名!'}]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: '请输入密码!'}]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <a href="/login">注册</a>
                                <a className="login-form-forgot" href="/login">
                                    忘记密码？
                                </a>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        );
    }
}


export default Login;
