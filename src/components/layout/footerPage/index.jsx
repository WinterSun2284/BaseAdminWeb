import React, {Component} from 'react';
import {Layout} from "antd";

const {Footer} = Layout;

class FooterPage extends Component {
    render() {
        return (
            <Footer style={{textAlign: 'center'}}>wintersun ©2021 <span/><a href="https://beian.miit.gov.cn/"  style={{textAlign: 'center',color: 'rgba(0, 0, 0, 0.85)'}}>湘ICP备2021021085号-1</a></Footer>
        );
    }
}

export default FooterPage;
