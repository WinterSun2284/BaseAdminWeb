import component from "../../../common/component";
import {Button, Col, DatePicker, Input, Popconfirm, Row} from "antd";
import EditModal from "./edit";
import EditAndDelBtn from "@/components/EditAndDelBtn";

const {RangePicker} = DatePicker;

class Role extends component {

    handleDate = (value, dateStrings) => {
        let search = {'startTime': dateStrings[0], 'endTime': dateStrings[1]}
        this.setState({
            pagination: Object.assign(this.state.pagination, search)
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
                新增角色
            </Button>
        </>;
    }

    getSearchRow(): null {
        return <Input.Group>
            <Row gutter={8}>
                <Col span={6}>
                    <Input onChange={this.handleChange} allowClear placeholder="角色名" onPressEnter={this.reload}
                           name={'roleName'}/>
                </Col>
                <Col span={6}>
                    <Input onChange={this.handleChange} allowClear placeholder="备注" onPressEnter={this.reload}
                           name={'roleDesc'}/>
                </Col>
                <Col span={7}>
                    <RangePicker placeholder={['创建开始时间', '创建结束时间']} onChange={this.handleDate} showTime/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={this.reload}>搜索</Button>
                </Col>
            </Row>
        </Input.Group>;
    }

    getColumns(): null {
        return [
            {
                title: '角色名',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '模块',
                dataIndex: 'moduleNames',
                key: 'moduleNames',
                render: moduleNames => {
                    return moduleNames.join('、');
                }
            },
            {
                title: '备注',
                dataIndex: 'roleDesc',
                key: 'roleDesc',
                // sorter: true
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                sorter: true
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (_, record) => {
                    return <EditAndDelBtn record={record} edit={this.edit} del={this.delete}/>
                },
            }
        ];
    }

    getEditModal(): null {
        return <EditModal {...this.state.editParam} cancelModal={this.cancelModal} reload={this.reload}
                          baseUir={this.state.baseUri}/>
    }
}

export default Role;
