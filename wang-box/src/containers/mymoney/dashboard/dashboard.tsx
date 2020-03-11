import * as React from 'react';
import {Table} from "antd";
import * as moment from 'moment'

// @ts-ignore
import mock from '../../../mock/data.json';

interface IProps {
    color?: string,
    size?: string,
}

interface IState {
    filteredInfo: any,
    sortedInfo: any,
}

class Dashboard extends React.Component<IProps, IState> {
    public state = {
        filteredInfo: null,
        sortedInfo: null,
    }


    dataSource: any[] = mock;

    componentDidMount(): void {

    }


    // @ts-ignore
    handleChange = ({pagination, filters, sorter}: { pagination: any, filters: any, sorter: any }) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    paginationConfig: any = {
        position: 'bottom',
        defaultPageSize: 20
    }


    public render() {


        let {sortedInfo, filteredInfo}: any = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};


        //{ title: string, dataIndex: string, key: string,width?: number}[]

        const columns = [
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                filters: [
                    {text: '支出', value: '支出'},
                    {text: '收入', value: '收入'},
                ],
                filteredValue: filteredInfo.type || null,
                onFilter: (value: any, record: any) => record.type.includes(value),
                ellipsis: true,
            },
            {
                title: '消费时间',
                dataIndex: 'createdDate',
                key: 'createdDate',
                render: (createDate: string) => {
                    return moment.unix(Number(createDate)).format("YYYY-MM-DD HH:mmA")
                }
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
                sorter: (a: any, b: any) => a.amount - b.amount,
                sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
            },
            {
                title: '备注',
                dataIndex: 'note',
                width: 300,
                key: 'note',
            },
        ];

        return (
            <div><Table onChange={() => this.handleChange} dataSource={this.dataSource} columns={columns}
                        pagination={this.paginationConfig}/>

            </div>
        )
    }
}

export default Dashboard;