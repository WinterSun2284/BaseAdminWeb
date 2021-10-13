import React, {Component} from "react";
import {Layout,} from 'antd';
import './index.less'
import HeaderPage from './headerPage'
import ContentPage from "./contentPage";
import FooterPage from "./footerPage";
import SiderPage from "./siderPage";

class FrameOut extends Component {

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                {/*左边栏*/}
                <SiderPage {...this.props}/>
                <Layout className="site-layout">
                    {/*头部*/}
                    <HeaderPage/>
                    {/*主体*/}
                    <ContentPage {...this.props}/>
                    {/*脚部*/}
                    <FooterPage/>
                </Layout>
            </Layout>
        );
    }
}

export default FrameOut;
