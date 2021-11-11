import {Button, Popconfirm} from "antd";

const Index=({record,edit,del})=>{
    return <>
        <Button type="primary" className={'button-default'} size={'small'}
                onClick={() => edit(record)}>
            编辑
        </Button>
        <Popconfirm
            title="你确定永久删除此条数据吗？"
            onConfirm={() => del(record)}
            // onCancel={cancel}
            okText="确定"
            cancelText="取消"
        >
            <Button type="primary" className={'button-default'} danger size={'small'}>
                删除
            </Button>
        </Popconfirm>

    </>
}

export default Index;
