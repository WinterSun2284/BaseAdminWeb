import React, {Component} from 'react';
import axios from '../../components/service/request.js';
import {Button,message} from "antd";


class Admin extends Component {

    state = {
        message: null,
    };

    loadData=()=>{
        axios.get("/admin").then(res=>{
            if (res.code===200){
                this.setState({
                    message:res.data
                })
            }else {
                message.error(res.msg)
            }

        })
    }

    render() {
        return (
            <div>
                首页
                <span style={{color:"red"}}>{this.state.message}</span>
                <Button type={'primary'} onClick={this.loadData}>加载</Button>
            </div>
        );
    }
}

export default Admin;
