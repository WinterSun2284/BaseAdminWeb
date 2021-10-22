import component from "../../../common/component";

class Role extends component {

    getColumns(): null {
        return [
            {
                title: '角色名',
                dataIndex: 'roleName',
                key: 'roleName',
                // sorter: true
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
                // sorter: true
            },
        ];
    }

}

export default Role;
