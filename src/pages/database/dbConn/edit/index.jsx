import React from "react";
import {Button, Col, Form, Input, message, Modal, Radio, Row, Select, Spin} from "antd";
import axios from "../../../../components/service/request";

const EditModal = ({isModalVisible, cancelModal, value, reload, baseUir}) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [spinLoading, setSpinLoading] = React.useState(false);
    const [title, setTitle] = React.useState("新增数据库连接");
    const [moduleOptions, setModuleOptions] = React.useState(null);
    const [testLoading, setTestLoading] = React.useState(false);

    const [form] = Form.useForm();
    let Option = Select.Option;

    React.useEffect(() => {
        if (isModalVisible) {
            setSpinLoading(true)
            axios.get(baseUir + '/getDbTypes').then(res => {
                let options = []
                if (res.data) {
                    options.push(res.data.map(r => {
                        return <Option value={r.id}>{r.dbTypeName}</Option>
                    }))
                }
                setModuleOptions(options)
                setSpinLoading(false)
            }).catch(err => {
                message.error(err)
            })

            if (value) {
                setTitle("修改数据库连接")
                form.setFieldsValue({
                    id: value.id,
                    dbType: value.dbType,
                    detectOnoff: value.detectOnoff,
                    dbName: value.dbName,
                    businessName: value.businessName,
                    dbAccount: value.dbAccount,
                    dbIp: value.dbIp,
                    dbPort: value.dbPort,
                    serverName: value.serverName,
                });
            }

            setSpinLoading(false)

        }
    }, [baseUir, form, isModalVisible, value]);

    const handleOk = () => {
        setConfirmLoading(true)
        form.validateFields()
            .then((values) => {
                form.resetFields();
                axios.post(baseUir + "/save", values).then(res => {
                    if (res.code === 200) {
                        message.info(res.msg)
                        cancelModal()
                        reload()
                    } else {
                        message.info(res.msg)
                    }
                    setConfirmLoading(false)
                })
            })
    }

    const handleCancel = () => {
        form.resetFields()
        cancelModal()
    }

    const handleTest = () => {
        setTestLoading(true)
        form.validateFields()
            .then((values) => {
                // form.resetFields();
                axios.post(baseUir + "/testConn", values).then(res => {
                    if (res.code === 200) {
                        message.info(res.msg)
                    } else {
                        message.error(res.msg)
                    }
                    setTestLoading(false)
                })

            })
    }


    return (
        <Modal title={title}
               visible={isModalVisible}
               onOk={handleOk}
               onCancel={handleCancel}
               confirmLoading={confirmLoading}
               width={1200}
               footer={[<Button key='cancel' onClick={handleCancel}>取消</Button>,
                   <Button key='test' type={'primary'} onClick={handleTest} loading={testLoading}>测试连接</Button>,
                   <Button key='ok' type={'primary'} onClick={handleOk} loading={confirmLoading}>保存</Button>]}
        >
            <Spin spinning={spinLoading}>
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
                            <Form.Item name="dbType" label="数据库类型" rules={[{required: true, message: "请选择数据库类型！"}]}
                                       wrapperCol={{offset: 0, span: 15}} labelCol={{offset: 0, span: 8}}>
                                <Select
                                    placeholder="请选择数据库类型"
                                    style={{width: '100%'}}
                                    allowClear
                                >
                                    {moduleOptions}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="detectOnoff" label="是否侦测连接状体" rules={[{required: true, message: "必选！"}]}
                                       wrapperCol={{offset: 0, span: 15}}
                                       initialValue={true}
                                       labelCol={{offset: 0, span: 8}}>
                                <Radio.Group>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="dbName" label="数据库名称"
                                       rules={[{required: true, message: "请填写数据库名称！"}]}
                                       wrapperCol={{offset: 0, span: 15}}
                                       labelCol={{offset: 0, span: 8}}>
                                <Input/>
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="dbAccount" label="数据库账户"
                                       rules={[{required: true, message: "请填写数据库账户！"}]}
                                       wrapperCol={{offset: 0, span: 15}}
                                       labelCol={{offset: 0, span: 8}}>
                                <Input autocomplete={false}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {
                                value ? <Form.Item name="dbPassword" label="密码"
                                                   wrapperCol={{offset: 0, span: 15}}
                                                   labelCol={{offset: 0, span: 8}}>
                                        <Input.Password placeholder={'密码不填写为不修改'} autocomplete={false}/>
                                    </Form.Item>
                                    :
                                    <Form.Item name="dbPassword" label="密码"
                                               wrapperCol={{offset: 0, span: 15}}
                                               labelCol={{offset: 0, span: 8}}
                                               rules={[{required: true, message: "密码是必填的！"}]}>
                                        <Input.Password autocomplete={false}/>
                                    </Form.Item>
                            }
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="dbIp" label="IP地址" wrapperCol={{offset: 0, span: 15}}
                                       rules={[{required: true, message: "请填写IP地址！"}]}
                                       labelCol={{offset: 0, span: 8}}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="dbPort" label="端口"
                                       rules={[{required: true, message: "请填写端口！"}]}
                                       wrapperCol={{offset: 0, span: 15}}
                                       labelCol={{offset: 0, span: 8}}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="serverName" label="服务名（数据库）" wrapperCol={{offset: 0, span: 15}}
                                       rules={[{required: true, message: "请填写服务名（数据库）！"}]}
                                       labelCol={{offset: 0, span: 8}}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>

        </Modal>
    );
}

export default EditModal