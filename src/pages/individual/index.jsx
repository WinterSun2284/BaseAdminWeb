import React from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select, Spin} from "antd";
import axios from "../../components/service/request";
import {getStorage, removeStorage, setStorage} from "../../utils/localstorage";

let Option = Select.Option;

const Index = () => {

    const [spinLoading, setSpinLoading] = React.useState(false);
    const [roleOptions, setRoleOptions] = React.useState("新增用户");
    const [user, setUser] = React.useState(getStorage('user'));

    const [form] = Form.useForm();

    React.useEffect(() => {
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

        if (user) {
            let roleIds = user.roles.map(r => {
                return r.id
            })
            form.setFieldsValue({
                id: user.id,
                userAccount: user.userAccount,
                userName: user.userName,
                roleIds: roleIds
            });
        }
        setSpinLoading(false)

    }, [form, user]);

    const onFinish = (values) => {
        axios.post("/admin/user/user/save", values).then(res => {
            if (res.code === 200) {
                message.info(res.msg)
                setStorage("user",res.data)
                setUser(res.data)
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
    }

    return <>
        <Spin spinning={spinLoading}>

            <Form form={form} labelAlign={'right'} layout={'vertical'} onFinish={onFinish}>
                <Form.Item name="id" hidden={true}>
                    <Input/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="userAccount" label="账号" rules={[{required: true, message: "必须填写账号！"}]}>
                            <Input disabled={true}/>
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
                        <Form.Item name="password" label="密码">
                            <Input.Password placeholder={'密码不填写为不修改'}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item wrapperCol={{offset: 12, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Spin>
    </>
}

export default Index;