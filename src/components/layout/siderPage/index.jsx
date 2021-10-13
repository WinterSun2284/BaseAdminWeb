import React, {Component} from 'react';
import {Menu, Layout} from "antd";
import {privateRoutes} from "../../../routers";
import {Link} from "react-router-dom";
import {setStorage} from "../../../utils/localstorage";
const {Sider} = Layout;

class SiderPage extends Component {


    state = {
        collapsed: false,
        selectedKey: this.props.history.location.pathname
    };

    componentDidMount() {
        let _this = this
        window.onhashchange = function (e) {
            let pathname = _this.props.history.location.pathname;
            if (pathname) {
                _this.setState({
                    selectedKey:pathname
                })
                setStorage("current_uri",pathname)
            }

        }
    }


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
        let selectedKey = this.state.selectedKey;
        let split = selectedKey.split('/');
        let currentOpen=selectedKey;
        if (split.length>2){
            currentOpen = '/admin/'+split[2];
        }
        console.log(currentOpen)
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" openKeys={[currentOpen]}
                      selectedKeys={[this.state.selectedKey]} mode="inline">
                    {elements}
                </Menu>
            </Sider>
        );
    }
}

export default SiderPage;
