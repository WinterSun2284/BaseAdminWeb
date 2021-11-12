import React, {Component} from 'react';
import TableOne from '../compoenet/TableOne'

class Index extends Component {

    state = {
        keysLarge: [],
        keysMedium:[]
    };

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const columns = [
            {title: '编码', dataIndex: 'code', key: 'code'},
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                onFilter: (value, record) => record.address.indexOf(value) === 0,
            },
            {title: '备注', dataIndex: 'remark', key: 'remark'},
            {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
            {title: '操作', dataIndex: 'operation'},
        ];

        const getSmell = () => {
            return <TableOne columns={columns} baseUir={this.props.history.location.pathname} type={'small'}
                             superCode={this.state.keysMedium}
            />
        }

        const getMedium = () => {
            return <TableOne columns={columns} baseUir={this.props.history.location.pathname} type={'medium'}
                             row={getSmell}
                             handlerRowChange={handlerRowChangeMedium}
                             superCode={this.state.keysLarge}
            />
        }

        const handlerRowChangeMedium = (flag, record) => {
            let row = this.state.keysMedium
            if (row) {
                row = getKey(row, record)
                this.setState({
                    keysMedium: row
                })
            }
        }

        const handlerRowChangeLarge = (flag, record) => {
            let row = this.state.keysLarge
            if (row) {
                row = getKey(row, record)
                this.setState({
                    keysMedium: row
                })
            }
        }

        const getKey = (row, record) => {
            // 只展开一行
            if (row.length > 0) { //进这个判断说明当前已经有展开的了
                //返回某个指定的字符串值在字符串中首次出现的位置，下标为0
                let index = row.indexOf(record.code);
                if (index > -1) { //如果出现则截取这个id,1d到1相当于0，针对重复点击一个
                    row.splice(index, 1);
                } else {
                    //如果没出现则截取所有id,添加点击id，0到1，针对已经有一个展开，点另一个会进入判断
                    row.splice(0, row.length);
                    row.push(record.code);
                }
            } else {
                //数组长度小于0，说明都没展开，第一次点击，id添加到数组，数组有谁的id谁就展开
                row.push(record.code);
            }
            return row;
        }


        return (
            <TableOne columns={columns}
                      baseUir={this.props.history.location.pathname}
                      type={'large'} row={getMedium}
                      handlerRowChange={handlerRowChangeLarge}
                      expandedRowKeys={this.state.keysLarge}
            />
        );
    }
}

export default Index;
