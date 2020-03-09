import * as React from 'react';
import {Table} from "antd";

interface IProps {
    color: string,
    size?: string,
}

interface IState {
    count: number,
}

class Dashboard extends React.Component<IProps, IState> {
    public state = {
        count: 1,
    }


    dataSource: { address: string; name: string; key: string; age: number }[] = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];


    columns: { title: string, dataIndex: string, key: string }[] = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];


    public render() {
        return (
            <div><Table dataSource={this.dataSource} columns={this.columns}/></div>
        )
    }
}

export default Dashboard;