import component from "../../../common/component";
import {Button, Col, Input, Row} from "antd";

class Index extends component {

    getColumns(): null {
        return [
            {
                title: '类型名称',
                dataIndex: 'dbTypeName',
                key: 'dbTypeName',
            },
            {
                title: '备注',
                dataIndex: 'dbTypeDesc',
                key: 'dbTypeDesc',
            },
        ];
    }

    getSearchRow(): null {
        return <Input.Group>
            <Row gutter={8}>
                <Col span={6}>
                    <Input onChange={this.handleChange} allowClear placeholder="类型名" onPressEnter={this.reload}
                           name={'dbTypeName'}/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={this.reload}>搜索</Button>
                </Col>
            </Row>
        </Input.Group>;
    }

}

export default Index;