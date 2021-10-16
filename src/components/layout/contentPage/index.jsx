import React, {Component} from 'react';
import {Breadcrumb, Layout} from "antd";
import {privateRoutes} from '../../../routers'
import {Link} from "react-router-dom";

const {Content} = Layout;


class ContentPage extends Component {

    state = {
        firstLevel: "",
        secondaryLevel: ""
    }

    componentDidMount() {

        let _this = this

        this.handleBranner(this)

        window.onhashchange = function (e) {
            _this.handleBranner(_this);
        }
    }

    handleBranner(_this) {
        let firstLevel;
        let secondaryLevel;
        let current = _this.props.history.location.pathname;

        for (let p of privateRoutes) {
            if (p.children) {
                firstLevel = p.name
                let flag = false;
                for (let c of p.children) {
                    if (current === c.pathName) {
                        secondaryLevel = c.name
                        flag = true;
                        break
                    }
                }
                if (flag) {
                    break
                }
            } else {
                if (p.pathName === current) {
                    firstLevel = p.name
                    break;
                }
            }
        }

        _this.setState({
            firstLevel: firstLevel,
            secondaryLevel: secondaryLevel
        })
    }

    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.firstLevel}</Breadcrumb.Item>
                    {
                        this.state.secondaryLevel ? <Breadcrumb.Item>{this.state.secondaryLevel}</Breadcrumb.Item> : ''
                    }
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {
                        this.props.children
                    }
                </div>
            </Content>
        );
    }
}

export default ContentPage;
