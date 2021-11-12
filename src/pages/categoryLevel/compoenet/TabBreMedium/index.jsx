import {Breadcrumb, Button, Col, Row} from "antd";
import React from "react";

const Index = () => {

    return <>
        <Row>
            <Col span={6}>
                <Breadcrumb>
                    <Breadcrumb.Item>大类</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        中类
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={18} style={{textAlign:'right'}}>
                <Button type={"primary"}>新增</Button>
            </Col>
        </Row>
    </>
}
export default Index