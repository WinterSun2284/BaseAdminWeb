import {Col, Form, Input, Modal, Radio, Row, Select} from "antd";
import React from "react";

const Index = ({type,level,isModalVisible,setIsModalVisible,title}) => {


    const [form] = Form.useForm();
    let Option = Select.Option;
    const [arr,setArr]=React.useState([])

    const handleOk = () => {
        getArr()
      // setIsModalVisible(false)
    }

    const handleCancel=()=>{
        setIsModalVisible(false)
    }

    const getArr = () => {
        let arr1=[]
        for (let i = 0; i < 100; i++) {
            arr1.push(<Option value={i}>{"测试"+i}</Option>)
        }
        setArr(arr1)
    }

    return         <Modal title={title}
                          visible={isModalVisible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          okText={'保存'}
                          // confirmLoading={confirmLoading}
                          cancelText={'取消'}
                          width={800}
    >
        <Form form={form}
            // layout={{span: 2, offset: 2}}
              labelAlign={'right'}
            // layout={'vertical'}

        >
            <Form.Item name="id" hidden={true}>
                <Input/>
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="dbName" label="名称"
                               rules={[{required: true, message: "请填写数据库名称！"}]}
                               wrapperCol={{offset: 0, span: 15}}
                               labelCol={{offset: 0, span: 8}}>
                        <Input/>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="dbType" label="数据库类型" rules={[{required: true, message: "请选择数据库类型！"}]}
                               wrapperCol={{offset: 0, span: 15}} labelCol={{offset: 0, span: 8}}>
                        <Select
                            placeholder="请选择数据库类型"
                            style={{width: '100%'}}
                            open={true}
                            allowClear
                        >
                            {arr}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="businessName" label="业务系统名称"
                               rules={[{required: true, message: "请填写业务系统名称！"}]}
                               wrapperCol={{offset: 0, span: 15}}
                               labelCol={{offset: 0, span: 8}}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>

    </Modal>

}
export default Index