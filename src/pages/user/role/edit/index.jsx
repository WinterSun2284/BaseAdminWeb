import {Col, Form, Input, message, Modal, Row, Select, Spin} from "antd";
import React from "react";
import axios from "../../../../components/service/request";

const EditModal = ({isModalVisible, cancelModal, value, reload, baseUir}) => {

    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [spinLoading, setSpinLoading] = React.useState(false);
    const [title, setTitle] = React.useState("新增用户");
    const [moduleOptions, setModuleOptions] = React.useState(null);

    const [form] = Form.useForm();
    let Option = Select.Option;

    React.useEffect(() => {
        if (isModalVisible) {
            setSpinLoading(true)
            axios.get(baseUir + '/getModules').then(res => {
                let options = []
                if (res.data) {
                    options.push(res.data.map(r => {
                        return <Option value={r.id}>{r.moduleName}</Option>
                    }))
                }
                setModuleOptions(options)
                setSpinLoading(false)
            }).catch(err => {
                message.error(err)
            })

            if (value) {
                setTitle("修改用户信息")
                let moduleIds = value.modules.map(m => {
                    return m.id
                })
                form.setFieldsValue({
                    id: value.id,
                    roleName: value.roleName,
                    moduleIds: moduleIds,
                    roleDesc:value.roleDesc,
                    createTime:value.createTime
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
                axios.post(baseUir+"/save", values).then(res => {
                    if (res.code === 200) {
                        message.info(res.msg)
                        cancelModal()
                        reload()
                    }  else {
                        message.info(res.msg)
                    }
                })
            })
        setConfirmLoading(false)
    }

    const handleCancel = () => {
        form.resetFields()
        cancelModal()
    }

    const checkRoleName = (roleName): res => {
        let param
        if (value){
            param={roleName:roleName,roleId:value.id}
        }else {
            param={roleName:roleName}
        }

        return new Promise(resolve => {
            axios.post(baseUir+'/checkRoleName',param)
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
                            <Form.Item name="roleName" label="角色名" rules={[
                                {
                                    required: true,
                                    message: "必须填写角色名！",
                                },
                                ({getFieldValue}) => ({
                                    async validator(_, roleNameValue) {
                                        if (roleNameValue) {
                                            let res = await checkRoleName(roleNameValue);
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
                                        <Input/>
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="moduleIds" label="模块" rules={[{required: true, message: "至少选中一个模块！"}]}>
                                <Select
                                    placeholder="请选择角色"
                                    style={{width: '100%'}}
                                    allowClear
                                    mode="multiple"
                                >
                                    {moduleOptions}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="roleDesc" label="备注">
                                {
                                    <Input/>
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="createTime" label="创建时间" >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>

        </Modal>
    );

}

export default EditModal;
