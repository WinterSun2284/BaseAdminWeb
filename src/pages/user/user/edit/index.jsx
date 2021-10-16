import React, {Component} from 'react';
import {Modal} from "antd";

class EditModal extends Component {

    state={
        isModalVisible:false,
    }

    componentDidUpdate() {
        if(this.props.isModalVisible!==this.state.isModalVisible){
            this.setState({
                isModalVisible:this.props.isModalVisible
            })
        }
        console.log(this.props)
    }


    handleOk = () => {
    };

     handleCancel = () => {
    };

    render() {
        return (
            <Modal title="Basic Modal" visible={this.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}

export default EditModal;
