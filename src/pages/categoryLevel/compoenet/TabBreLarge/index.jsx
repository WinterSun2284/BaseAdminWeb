import {Breadcrumb, Button, Col, Row} from "antd";
import React from "react";
import Edit from "../Edit"

const Index = () => {

    const [isModalVisible,setIsModalVisible]=React.useState(false)

    return <>
        <Row>
            <Col span={6}>
                <Breadcrumb>
                    <Breadcrumb.Item>大类</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={18} style={{textAlign:'right'}}>
                <Button type={"primary"} onClick={()=>setIsModalVisible(true)}>新增</Button>
            </Col>
        </Row>
        <Edit isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
    </>
}
export default Index