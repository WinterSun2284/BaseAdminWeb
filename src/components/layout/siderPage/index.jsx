import React, {Component} from 'react';
import {Menu, Layout} from "antd";
import {privateRoutes} from "../../../routers";
import {Link} from "react-router-dom";
import {setStorage} from "../../../utils/localstorage";

const {Sider} = Layout;

class SiderPage extends Component {


    state = {
        collapsed: false,
        selectedKey: this.props.history.location.pathname,
        openKeys: ['/admin'],
    };

    componentDidMount() {
        this.handleMenu();
        window.addEventListener('hashchange', this.handleMenu);
    }


    handleMenu = (e) => {
        let pathname = this.props.history.location.pathname;
        if (pathname) {
            this.setState({
                selectedKey: pathname
            })
            setStorage("current_uri", pathname)
        }

        let split = pathname.split('/');
        let openKeys = []
        let url = '';
        for (let splitElement of split) {
            if (splitElement !== '') {
                url += '/' + splitElement
                openKeys.push(url)
            }
        }
        console.log(openKeys)
        this.setState({
            openKeys: openKeys
        })
    }

    onOpenChange = keys => {
        this.setState({
            openKeys: keys
        })
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    tree(data) {
        let menu = []
        if (data) {
            for (let item of data) {
                if (!item.children) {
                    menu.push(<Menu.Item key={item.pathName} icon={item.icon}>
                        <Link to={{pathname: item.pathName}}>{item.name}</Link></Menu.Item>)
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
                <Menu theme="dark"
                    // defaultSelectedKeys={[this.props.history.location.pathname]}
                      openKeys={this.state.openKeys}
                      onOpenChange={this.onOpenChange}
                      selectedKeys={[this.props.history.location.pathname]} mode="inline">
                    {elements}
                </Menu>
            </Sider>
        );
    }
}

export default SiderPage;
