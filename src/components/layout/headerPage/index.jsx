import React, {Component} from 'react';
import {Dropdown, Layout, Menu} from 'antd';
import {removeStorage} from "../../../utils/localstorage";
import './index.less'
import {DownOutlined} from "@ant-design/icons";
import {getStorage} from "../../../utils/localstorage";
import {Link} from "react-router-dom";

const {Header} = Layout;

const logout = () => {
    removeStorage("token")
    removeStorage("user")
    window.location.href = '/'
}
const menu = (
    <Menu>
        <Menu.Item key={1}>
            <Link to={'/admin/individual'}>个人中心</Link>
        </Menu.Item>
        <Menu.Item key={2}>
            <a target="_blank" rel="noopener noreferrer" onClick={logout} href={'javaScript(#)'}>
                退出登录
            </a>
        </Menu.Item>
    </Menu>
);

class HeaderPage extends Component {


    render() {
        let user = getStorage('user');
        let userName
        if (user){
            userName = user.userName;
        }

        return (
            <Header className="site-layout-background header" style={{padding: 0}}>
                <h1 className={'header-title'}>开箱即用的后台管理系统</h1>
                <div className={'header-right'}>
                    <Dropdown overlay={menu}>
                        <div>
                            <a href={'javaScript(#)'} className="user-info" onClick={e => e.preventDefault()}>
                                {
                                    userName
                                } <DownOutlined/>
                            </a>
                        </div>
                    </Dropdown>,
                </div>
            </Header>
        );
    }
}

export default HeaderPage;
