import component from "../../../common/component";
import {Button, Col, Input, message, Popconfirm, Row, Select} from "antd";
import EditModal from "./edit";
import axios from "../../../components/service/request";

const Option = Select.Option

class User extends component {

    componentDidMount() {
        super.componentDidMount()
        axios.get(this.state.baseUri + '/getRoles').then(res => {
            let options = []
            if (res.data) {
                options.push(res.data.map(r => {
                    return <Option value={r.id}>{r.roleName}</Option>
                }))
            }
            this.setState({
                roleOptions: options
            })
        }).catch(err => {
            message.error(err)
        })
    }

    delete = record => {
        let userIds = []
        userIds.push(record.id + '')
        axios.post('/admin/user/user/delete', userIds.join(',')).then(res => {
            if (res.code === 200) {
                message.info(res.msg)
                this.reload()
            } else {
                message.error(res.msg)
                this.reload()
            }
        }).catch(err => {
            message.error(err)
        })
    }

    edit = record => {
        let param = {isModalVisible: true, value: record}
        this.setState({
            editParam: param
        })
    }

    getColumns(): [] {
        return [
            {
                title: '账号',
                dataIndex: 'userAccount',
                key: 'userAccount',
                sorter: true,
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '角色',
                dataIndex: 'roleNames',
                key: 'roleNames',
                render: roleNames => {
                    return roleNames.join('、');
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (_, record) => {
                    return <>
                        <Button type="primary" className={'button-default'} size={'small'}
                                onClick={() => this.edit(record)}>
                            编辑
                        </Button>
                        <Popconfirm
                            title="你确定永久删除此条数据吗？"
                            onConfirm={() => this.delete(record)}
                            // onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="primary" className={'button-default'} danger size={'small'}>
                                删除
                            </Button>
                        </Popconfirm>

                    </>
                },
            }
        ];
    }

    handleAdd = () => {
        this.setState({
            editParam: {
                isModalVisible: true,
                value: null,
            },
        })
    }


    handleSelectChange = (value) => {
        let search = {roleIds: [value]}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        })
    }

    getSearchRow(): null {
        return <Input.Group>
            <Row gutter={8}>
                <Col span={7}>
                    <Input onChange={this.handleChange} allowClear placeholder="账号" onPressEnter={this.reload}
                           name={'userAccount'}/>
                </Col>
                <Col span={7}>
                    <Input onChange={this.handleChange} allowClear placeholder="用户名" onPressEnter={this.reload}
                           name={'userName'}/>
                </Col>
                {/*<Col span={7}>*/}
                {/*    <Select*/}
                {/*        showSearch*/}
                {/*        style={{width: '100%'}}*/}
                {/*        placeholder="请选择角色"*/}
                {/*        onChange={this.handleSelectChange}*/}
                {/*        onSearch={this.reload}*/}
                {/*        filterOption={(input, option) =>*/}
                {/*            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                {/*        }*/}
                {/*    >*/}
                {/*        {*/}
                {/*            this.state.roleOptions ? this.state.roleOptions : null*/}
                {/*        }*/}
                {/*    </Select>*/}
                {/*</Col>*/}
                <Col span={3}>
                    <Button type={'primary'} onClick={this.reload}>搜索</Button>
                </Col>
            </Row>
        </Input.Group>;
    }

    deleteSelect = () => {
        let selectedRowKeys = this.state.selectedRowKeys;

        if (selectedRowKeys.length === 0) {
            message.error("请选择账号！")
            return
        }

        this.setState({
            deleteLoading: true
        }, () => {
            axios.post('/admin/user/user/delete', selectedRowKeys.join(',')).then(res => {
                if (res.code === 200) {
                    message.info(res.msg)
                    this.reload()
                } else {
                    message.error(res.msg)
                    this.reload()
                }
            }).catch(err => {
                message.error(err)
            }).finally(() => {
                this.setState({
                    deleteLoading: false
                })
            })
        })
    }

    getButtonRow(): null {
        return <>
            <Popconfirm
                title="你确定永久删除选中的数据吗？"
                onConfirm={this.deleteSelect}
                okText="确定"
                cancelText="取消"
            >
                <Button className={'button-delete button-default'} type="primary" danger
                        loading={this.state.deleteLoading}>
                    删除选中
                </Button>
            </Popconfirm>
            <Button className={'button-delete button-default'} onClick={this.handleAdd} type="primary">
                新增用户
            </Button>
        </>;
    }

    getEditModal(): null {
        return <EditModal {...this.state.editParam} cancelModal={this.cancelModal} reload={this.reload}/>
    }
}

export default User;
