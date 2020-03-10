import * as React from 'react';
import {Table} from "antd";

// @ts-ignore
import mock from '../../../mock/data.json';

interface IProps {
    color?: string,
    size?: string,
}

interface IState {
    count: number,
}

class Dashboard extends React.Component<IProps, IState> {
    public state = {
        count: 1,
    }


    dataSource: any[] = mock


    columns: { title: string, dataIndex: string, key: string }[] = [
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '消费时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category'
        },
        // todo: 后面可以这两部分合并城一起
        {
            title: '二级类别',
            dataIndex: 'subCategory',
            key: 'subCategory',
        },
        {
            title: '币种',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: '数额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '备注',
            dataIndex: 'note',
            key: 'note',
        },
    ];


    public render() {


        return (
            <div><Table dataSource={this.dataSource} columns={this.columns}/></div>
        )
    }
}

export default Dashboard;