import './index.less'
import React, {Component} from 'react';
import {message, Table, Row, Col} from "antd";
import axios from "../../components/service/request";
class component extends Component {

    state = {
        baseUri:this.props.history.location.pathname,
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
        deleteLoading: false,
        searchFlag:false
    };

    getColumns() {
        return null
    }

    getEditModal() {
        return null;
    }

    getSearchRow() {
        return null;
    }

    getButtonRow() {
        return null;
    }

    componentDidMount() {
        this.reload()
    }

    handleSearchFlag=(flag)=>{
        this.setState({
            searchFlag:flag
        })
    }

    handleAdd = () => {
        this.setState({
            editParam: {
                isModalVisible: true,
                value: null,
            },
        })
    }

    edit = record => {
        let param = {isModalVisible: true, value: record}
        this.setState({
            editParam: param
        })
    }

    reload = () => {
        const {pagination} = this.state;
        this.fetch(pagination);
    }

    handleTableChange = (pagination, filters, sorter) => {
        let search = {sortField: sorter.field, sortOrder: sorter.order, ...filters,}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        }, () => {
            this.reload();
        })

    };

    //用于关闭modal页面
    cancelModal = () => {
        let param = {isModalVisible: false, value: {}}
        this.setState({
            editParam: param
        })
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        axios.post(this.state.baseUri+'/list', params).then(data => {
            if (data.code === 200) {
                this.setState({
                    loading: false,
                    data: data.data.records,
                    pagination: {
                        ...params,
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

    handleChange = (e) => {
        e.preventDefault()
        let search = {[e.target.name]: e.target.value}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        })
    }

    handleDelete=(param)=>{
        axios.post(this.state.baseUri+'/delete', param).then(res => {
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

    delete = value => {
        let ids = []
        ids.push(value.id + '')
        this.handleDelete(ids.join(','))
    }

    //删除选中数据
    deleteSelect = () => {
        let selectedRowKeys = this.state.selectedRowKeys;

        if (selectedRowKeys.length === 0) {
            message.error("请选择数据！")
            return
        }

        this.setState({
            deleteLoading: true
        }, () => {
            this.handleDelete(selectedRowKeys.join(','))
            this.setState({
                deleteLoading: false
            })
        })
    }

    render() {
        const {data, pagination, loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <>
                <Row gutter={[8, 12]}>
                    <Col span={24} >
                        {
                            this.getSearchRow()
                        }
                    </Col>
                    <Col span={12} className={'function-left'}>

                    </Col>
                    <Col span={12} className={'function-right'}>
                        {
                            this.getButtonRow()
                        }
                    </Col>

                    <Col span={24}>
                        {
                            this.getColumns()?<Table
                                rowSelection={rowSelection}
                                columns={this.getColumns()}
                                rowKey={record => record.id}
                                dataSource={data}
                                pagination={pagination}
                                loading={loading}
                                onChange={this.handleTableChange}
                            />:""
                        }
                    </Col>
                </Row>
                {
                    this.getEditModal()
                }
            </>
        );
    }
}

export default component;
