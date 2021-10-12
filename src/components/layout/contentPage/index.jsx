import React, {Component} from 'react';
import {Breadcrumb,Layout} from "antd";

const {Content} = Layout;

class ContentPage extends Component {
    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {
                        this.props.children
                    }
                </div>
            </Content>
        );
    }
}

export default ContentPage;
