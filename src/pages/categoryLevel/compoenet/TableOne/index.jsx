import {message, Table} from "antd";
import React from "react";
import axios from "@/components/service/request";

const Index = ({columns, data, row}) => {

    React.useEffect(() => {

    },{});


    return <Table
        columns={columns}
        title={() => '大类'}
        expandable=
            {
                row ? {expandedRowRender: row} : ""
            }
        dataSource={data}
        pagination={false}
    />
}

export default Index
