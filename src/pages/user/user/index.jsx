import React, {Component} from 'react';
import {Typography, message, Table} from "antd";
import axios from "../../../components/service/request";
import EditModal from "./edit";


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
            value: {},
            // cancelModal:this,.
        }
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
                return <Typography.Link onClick={() => this.edit(record)}>
                    编辑
                </Typography.Link>
            },
        }
    ];

    componentDidMount() {
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

    //用于关闭modal页面
    cancelModal =()=>{
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

    render() {
        const {data, pagination, loading} = this.state;
        return (
            <div>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />
                <EditModal {...this.state.editParam} cancelModal={this.cancelModal}/>
            </div>
        );
    }
}

export default User;
