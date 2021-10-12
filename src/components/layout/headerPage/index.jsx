import React, {Component} from 'react';
import {Layout} from 'antd';

const {Header} = Layout;

class HeaderPage extends Component {
    render() {
        return (
            <Header className="site-layout-background" style={{padding: 0}}/>
        );
    }
}

export default HeaderPage;
