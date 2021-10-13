import React, {Component} from 'react';
import axios from '../../components/service/request.js';
import {Button} from "antd";

class Admin extends Component {

    state = {
        message: "",
    };

    loadData=()=>{
        axios.get("/admin").then(res=>{
            this.setState({
                message:res
            })
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
