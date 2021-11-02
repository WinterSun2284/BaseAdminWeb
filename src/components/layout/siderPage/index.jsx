import React, {Component} from 'react';
import {Menu, Layout} from "antd";
import {privateRoutes} from "../../../routers";
import {Link} from "react-router-dom";
import {getStorage, setStorage} from "../../../utils/localstorage";

const {Sider} = Layout;

class SiderPage extends Component {


    state = {
        collapsed: false,
        selectedKey: this.props.history.location.pathname,
        openKeys: ['/admin'],
        firstHide: true
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
        this.setState({
            openKeys: openKeys
        })
    }

    onOpenChange = keys => {
        this.setState({
            openKeys: keys[keys.length - 1],
            firstHide: false
        })
    };

    onCollapse = collapsed => {
        this.setState({collapsed, firstHide: collapsed});
    };

    clickMenu = (_this, pathName) => {
        setStorage('current_uri', pathName)
    }

    tree(data) {
        let menu = []
        let user = getStorage('user');
        let modules = user.modules;
        let moduleIds = []
        for (let module of modules) {
            moduleIds.push(module.id)
        }
        if (data) {
            for (let item of data) {
                if (item.isFirst) {
                    if (moduleIds.indexOf(item.id) === -1) {
                        continue;
                    }
                }
                if (!item.children) {
                    menu.push(<Menu.Item key={item.pathName} icon={item.icon}>
                        <Link to={{pathname: item.pathName}}
                              onClick={(e) => this.clickMenu(e, item.pathName)}>{item.name}</Link></Menu.Item>)
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
                      openKeys={this.state.firstHide ? null : [this.state.openKeys]}
                      onOpenChange={this.onOpenChange}
                      selectedKeys={[this.props.history.location.pathname]} mode="inline">
                    {elements}
                </Menu>
            </Sider>
        );
    }
}

export default SiderPage;
