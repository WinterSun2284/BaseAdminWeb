import React from 'react';
import TableOne from '../compoenet/TableOne'

function Index() {

    // React.useState()
    React.useEffect(() => {
        console.log(this.props.history);
    },{});
    const columns = [
        {title: '编码', dataIndex: 'code', key: 'code'},
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {title: '备注', dataIndex: 'remark', key: 'remark'},
        {title: '创建时间', dataIndex: 'creatTime', key: 'creatTime'},
        {title: '操作', key: 'k', render: () => <a>Publish</a>},
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i,
            code:i+"a",
            name: '综合政务'+i,
            remark: '关于政治领域的当前状况和发展'+i,
            creatTime: '2014-12-24 23:12:00',
        });
    }

    return <TableOne columns={columns} data={data} />




}

export default Index;
