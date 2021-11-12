import React from "react";
import {Table} from "antd";
import axios from "@components/service/request";
import TabBreLarge from '../TabBreLarge'
import TabBreMedium from '../TabBreMedium'
import TabBreSmall from '../TabBreSmall'

const Index = ({columns, row, baseUir, type, handlerRowChange, expandedRowKeys, superCode}) => {
    const isFirst = React.useRef(true);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        if (isFirst.current) {
            switch (type) {
                case 'large':
                    axios.post(baseUir + '/getLarge').then(res => {
                        setData(res.data);
                    })
                    break;
                case 'medium':
                    if (superCode.length >= 1) {
                        axios.post(baseUir + '/getMedium', superCode[0]).then(res => {
                            setData(res.data);
                        })
                    }
                    break;
                case 'small':
                    if (superCode.length >= 1) {
                        axios.post(baseUir + '/getSmall', superCode[0]).then(res => {
                            setData(res.data);
                        })
                    }
                    break;
                default:
            }

        }
        isFirst.current = false;
    }, [baseUir, superCode, type]);


    return <Table
        columns={columns}
        title=
            {
                () => {
                    switch (type) {

                        case 'large':
                            return <TabBreLarge/>
                        case 'medium':
                            return <TabBreMedium/>
                        case 'small':
                            return <TabBreSmall/>
                        default:
                            return ''
                    }

                }
            }
        rowKey={record => record.code}
        expandable=
            {
                row ? {expandedRowRender: row} : ""
            }
        dataSource={data}
        bordered={true}
        pagination={false}
        onExpand={handlerRowChange}
        expandedRowKeys={expandedRowKeys}
        // expandedRowKeys={[16]}
    />
}

export default Index
