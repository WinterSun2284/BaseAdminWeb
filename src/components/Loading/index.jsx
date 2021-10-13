import React, {Component} from 'react';
import {Space, Spin} from "antd";

class Loading extends Component {
    render() {
        return (
            <div style={{textAlign:"center"}}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>,
            </div>
        );
    }
}

export default Loading;
