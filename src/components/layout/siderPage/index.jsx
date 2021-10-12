import React, {Component} from 'react';
import {Menu, Layout} from "antd";
import {privateRoutes} from "../../../routers";
import {Link} from "react-router-dom";

const {Sider} = Layout;


class SiderPage extends Component {

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    tree(data) {
        let menu = []
        if (data) {
            for (let item of data) {
                if (!item.children) {
                    menu.push(<Menu.Item key={item.pathName} icon={item.icon}><Link
                        to={{pathname: item.pathName}}>{item.name}</Link></Menu.Item>)
                } else {
                    menu.push(
                        <Menu.SubMenu key={item.pathName} icon={item.icon} title={item.name}>
                            {this.tree(item.children)}
                        </Menu.SubMenu>
                    )
                }
            }
        }
        return menu;
    }

    render() {
        const {collapsed} = this.state;
        const elements = this.tree(privateRoutes);
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['/admin']} mode="inline">
                    {elements}
                </Menu>
            </Sider>
        );
    }
}

export default SiderPage;
