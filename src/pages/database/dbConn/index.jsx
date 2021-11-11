import component from "../../../common/component";
import {Button, Col, DatePicker, Input, InputNumber, Popconfirm, Row, Select, Tag} from "antd";
import EditModal from './edit'
import axios from '../../../components/service/request'
import MyIcon from "../../../components/MyIcon";
import EditAndDelBtn from "@/components/EditAndDelBtn";

const Option = Select.Option;
const {RangePicker} = DatePicker;

class Index extends component {

    componentDidMount() {
        this.setState({
            roleOptions: null
        })
        super.componentDidMount();
        axios.get(this.state.baseUri + '/getDbTypes').then(res => {
            let options = []
            if (res.data) {
                options.push(res.data.map(r => {
                    return <Option value={r.id}>{r.dbTypeName}</Option>
                }))
            }
            this.setState({
                roleOptions: options
            })
        })
    }

    getColumns(): null {
        return [
            {
                title: '数据库类型',
                dataIndex: 'dbTypeName',
                key: 'dbTypeName',
            },
            {
                title: '数据库名称',
                dataIndex: 'dbName',
                key: 'dbName',
            },
            {
                title: '业务系统名称',
                dataIndex: 'businessName',
                key: 'businessName',
            },
            {
                title: 'IP地址端口',
                dataIndex: 'ipAndPort',
                key: 'ipAndPort',
            }, {
                title: '服务名（数据库）',
                dataIndex: 'serverName',
                key: 'serverName',
            }, {
                title: '数据库账户',
                dataIndex: 'dbAccount',
                key: 'dbAccount',
            },
            {
                title: '侦测连接状态',
                dataIndex: 'detectOnoff',
                key: 'detectOnoff',
                render: off => {
                    return off ? '是' : '否';
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            }, {
                title: 'DB状态',
                dataIndex: 'connStatus',
                key: 'connStatus',
                render: off => {
                    return off ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag>;
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (_, record) => {
                    return <EditAndDelBtn record={record} edit={this.edit} del={this.delete}/>
                },
            }
        ]
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
                新增数据库连接
            </Button>
        </>;
    }

    handleChangeSelect = (value) => {
        let search = {dbType: value}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        })
    }

    handleChangeDetect = (value) => {
        let search = {detectOnoff: value}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        })
    }

    handleChangeStatus = value => {
        let search = {connStatus: value}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        })
    }

    handleDate = (value, dateStrings) => {
        let search = {'startTime': dateStrings[0], 'endTime': dateStrings[1]}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        })
    }

    handleChangeDbPort=value=>{
        let search = {dbPort: value}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
        })
    }

    getSearchRow(): null {
        return <Input.Group>
            <Row gutter={[8, 16]}>
                <Col span={4}>
                    <Select
                        placeholder="请选择数据库类型"
                        style={{width: '100%'}}
                        allowClear
                        onChange={this.handleChangeSelect}
                    >
                        {this.state.roleOptions}
                    </Select>
                </Col>
                <Col span={4}>
                    <Input onChange={this.handleChange} allowClear placeholder="数据库名称" onPressEnter={this.reload}
                           name={'dbName'}/>
                </Col>
                {
                    this.state.searchFlag ? <>
                            <Col span={4}>
                                <Input onChange={this.handleChange} allowClear placeholder="业务系统名称"
                                       onPressEnter={this.reload}
                                       name={'businessName'}/>
                            </Col>
                            <Col span={4}>
                                <Input onChange={this.handleChange} allowClear placeholder="数据库ip"
                                       onPressEnter={this.reload}
                                       name={'dbIp'}/>
                            </Col>
                            <Col span={4}>
                                <InputNumber onChange={this.handleChangeDbPort} allowClear placeholder="数据库端口"
                                             onPressEnter={this.reload}
                                             style={{width: '100%'}}
                                             name={'dbPort'}/>
                            </Col>
                            <Col span={4}>
                                <Input onChange={this.handleChange} allowClear placeholder="服务名" onPressEnter={this.reload}
                                       name={'serverName'}/>
                            </Col>
                            <Col span={4}>
                                <Select
                                    placeholder="侦测连接状态"
                                    style={{width: '100%'}}
                                    allowClear
                                    onChange={this.handleChangeDetect}
                                >
                                    <Option value={true}>是</Option>
                                    <Option value={false}>否</Option>
                                </Select>
                            </Col>
                            <Col span={4}>
                                <Select
                                    placeholder="DB状态"
                                    style={{width: '100%'}}
                                    allowClear
                                    onChange={this.handleChangeStatus}
                                >
                                    <Option value={true}>正常</Option>
                                    <Option value={false}>异常</Option>
                                </Select>
                            </Col>
                            <Col span={7}>
                                <RangePicker placeholder={['创建开始时间', '创建结束时间']} onChange={this.handleDate} showTime/>
                            </Col>
                        </>
                        : ""
                }
                <Col>
                    <Button type={'primary'} onClick={this.reload}>搜索</Button>
                </Col>
                {
                    this.state.searchFlag ? <Button type="link" onClick={() => this.handleSearchFlag(false)}>收起<MyIcon
                            type={'icon-arrow-up-bold'}/></Button> :
                        <Button type="link" onClick={() => this.handleSearchFlag(true)}>展开<MyIcon
                            type={'icon-arrow-down-bold'}/></Button>
                }
            </Row>
        </Input.Group>;
    }

    getEditModal(): null {
        return <EditModal {...this.state.editParam} cancelModal={this.cancelModal} reload={this.reload}
                          baseUir={this.state.baseUri}/>
    }
}

export default Index;
