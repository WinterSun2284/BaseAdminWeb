import React, {Component} from 'react';
import './index.less'
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

class NotFound extends Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="很抱歉，您访问的页面不存在。"
                extra={<Button type="primary"><Link to={'/admin'}>返回首页</Link></Button>}
            />
        );
    }
}

export default NotFound;
