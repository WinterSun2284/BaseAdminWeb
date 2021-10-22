import React from 'react';
import {Col, Form, Input, message, Modal, Row, Select, Spin} from "antd";
import axios from "../../../../components/service/request";
import {removeStorage} from "../../../../utils/localstorage";

const EditModal = ({isModalVisible, cancelModal, value, reload}) => {

    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [spinLoading, setSpinLoading] = React.useState(false);
    const [roleOptions, setRoleOptions] = React.useState("新增用户");
    const [title, setTitle] = React.useState(false);

    const [form] = Form.useForm();
    let Option = Select.Option;

    React.useEffect(() => {

        if (isModalVisible) {
            setSpinLoading(true)
            axios.get('/admin/user/user/getRoles').then(res => {
                let options = []
                if (res.data) {
                    options.push(res.data.map(r => {
                        return <Option value={r.id}>{r.roleName}</Option>
                    }))
                }
                setRoleOptions(options)
                setSpinLoading(false)
            }).catch(err => {
                message.error(err)
            })

            if (value) {
                setTitle("修改用户信息")
                let roleIds = value.roles.map(r => {
                    return r.id
                })
                form.setFieldsValue({
                    id: value.id,
                    userAccount: value.userAccount,
                    userName: value.userName,
                    roleIds: roleIds
                });
            }

        }
    }, [form, isModalVisible, value]);


    const handleOk = () => {
        setConfirmLoading(true)
        form.validateFields()
            .then((values) => {
                form.resetFields();
                axios.post("/admin/user/user/save", values).then(res => {
                    if (res.code === 200) {
                        message.info(res.msg)
                        cancelModal()
                        reload()
                    } else if (res.code === 5001) {
                        Modal.error({
                            title: '登录失效',
                            content: "您修改过当前登录的账号的密码，请重新登录！",
                            onOk: (values) => {
                                removeStorage('token')
                                removeStorage('user')
                                window.location.href = '/'
                            }
                        });
                    } else {
                        message.info(res.msg)
                    }
                })
            })
            .catch((info) => {
            }).finally(() => {
            setConfirmLoading(false)
        });
    };

    const handleCancel = () => {
        form.resetFields()
        cancelModal()
    }

    const checkAccount = (value): res => {
        return new Promise(resolve => {
            axios.post('/admin/user/user/checkAccount',
                value)
                .then(res => {
                    resolve(res)
                })
        });

    }

    return (
        <Modal title={title}
               visible={isModalVisible}
               onOk={handleOk}
               onCancel={handleCancel}
               okText={'保存'}
               confirmLoading={confirmLoading}
               cancelText={'取消'}
               width={800}
        >
            <Spin spinning={spinLoading}>
                <Form form={form}
                    // layout={{span: 2, offset: 2}}
                      labelAlign={'right'}
                      layout={'vertical'}

                >
                    <Form.Item name="id" hidden={true}>
                        <Input/>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="userAccount" label="账号" rules={[
                                {
                                    required: true,
                                    message: "必须填写账号！",
                                },
                                ({getFieldValue}) => ({
                                    async validator(_, accountValue) {
                                        if (accountValue && !value) {
                                            let res = await checkAccount(accountValue);
                                            if (res.code === 200) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject(new Error(res.msg));
                                            }
                                        }
                                    }
                                })
                            ]}>
                                {
                                    value ? <Input disabled={true}/> :
                                        <Input/>
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="userName" label="用户名" rules={[{required: true, message: "必须填写用户名！"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="roleIds" label="角色" rules={[{required: true, message: "至少选择一个角色！"}]}>
                                <Select
                                    placeholder="请选择角色"
                                    style={{width: '100%'}}
                                    allowClear
                                    mode="multiple"
                                >
                                    {roleOptions}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {
                                value ? <Form.Item name="password" label="密码">
                                        <Input.Password placeholder={'密码不填写为不修改'}/>
                                    </Form.Item>
                                    :
                                    <Form.Item name="password" label="密码"
                                               rules={[{required: true, message: "密码是必填的！"}]}>
                                        <Input.Password/>
                                    </Form.Item>
                            }
                        </Col>
                    </Row>
                </Form>
            </Spin>

        </Modal>
    );
}

export default EditModal;
