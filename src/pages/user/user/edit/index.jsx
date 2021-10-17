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
    }


    handleOk = () => {
        this.props.cancelModal()
    };

     handleCancel = () => {
         this.props.cancelModal()
     };

    render() {
        return (
            <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}

export default EditModal;
