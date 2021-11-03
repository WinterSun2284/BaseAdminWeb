import component from "../../../common/component";
import {Button, Popconfirm, Tag} from "antd";
import EditModal from './edit'

class Index extends component {



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

    getEditModal(): null {
        return <EditModal {...this.state.editParam} cancelModal={this.cancelModal} reload={this.reload}
                          baseUir={this.state.baseUri}/>
    }
}

export default Index;