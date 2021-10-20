import React, {Component} from 'react';
import {message, Table, Button, Popconfirm, Row, Col} from "antd";
import axios from "../../../components/service/request";
import EditModal from "./edit";
import './index.less'


const getRandomuserParams = params => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
});


class User extends Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        editParam: {
            isModalVisible: false,
            value: null,
            // cancelModal:this,.
        },
        selectedRowKeys: [],
        deleteLoading: false
    };

    columns = [
        {
            title: '账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
            sorter: true
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

    componentDidMount() {
        this.reload()
    }

    reload = () => {
        const {pagination} = this.state;
        this.fetch({pagination});
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    edit = record => {
        let param = {isModalVisible: true, value: record}
        this.setState({
            editParam: param
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

    //用于关闭modal页面
    cancelModal = () => {
        let param = {isModalVisible: false, value: {}}
        this.setState({
            editParam: param
        })
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        let randomuserParams = getRandomuserParams(params);
        axios.post('/admin/user/user/list', randomuserParams).then(data => {
            if (data.code === 200) {
                this.setState({
                    loading: false,
                    data: data.data.records,
                    pagination: {
                        ...params.pagination,
                        total: data.data.total,
                    },
                });
            } else {
                message.error(data.msg)
                this.setState({
                    loading: false,
                    data: [],
                });
            }

        });
    };

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

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

    handleAdd=()=>{
        this.setState({
            editParam: {
                isModalVisible: true,
                value: null,
            },
        })
    }


    render() {
        const {data, pagination, loading, selectedRowKeys, deleteLoading} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <>
                <Row gutter={[8, 12]}>
                    <Col span={12} className={'function-left'}>

                    </Col>
                    <Col span={12} className={'function-right'}>
                        <Popconfirm
                            title="你确定永久删除选中的数据吗？"
                            onConfirm={this.deleteSelect}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button className={'button-delete button-default'} type="primary" danger
                                    loading={deleteLoading}>
                                删除选中
                            </Button>
                        </Popconfirm>
                        <Button className={'button-delete button-default'} onClick={this.handleAdd} type="primary" loading={deleteLoading}>
                            新增用户
                        </Button>
                    </Col>

                    <Col span={24}>
                        <Table
                            rowSelection={rowSelection}
                            columns={this.columns}
                            rowKey={record => record.id}
                            dataSource={data}
                            pagination={pagination}
                            loading={loading}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </Row>

                <EditModal {...this.state.editParam} cancelModal={this.cancelModal} reload={this.reload}/>
            </>
        );
    }
}

export default User;
