import * as React from 'react';
import {Table, Button} from "antd";
import * as moment from 'moment'
import {injectIntl} from 'react-intl';
import mock from '../../../mock/data.json';
// import { FilterMessage } from "../../../components/views/index.js";


import AddRecordDialog from '../add_record/add_record_dialog';


import './dashboard.scss'

interface IProps {
    color?: string,
    size?: string,
}

interface IState {
    filteredInfo: any,
    sortedInfo: any,
    visible: boolean
}

class DashboardComp extends React.Component<IProps, IState> {

    // @ts-ignore
    constructor(...args) {
        // @ts-ignore
        super(...args);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            visible: false,
        }
    }


    public state = {
        filteredInfo: null,
        sortedInfo: null,
        visible: false,
    }


    dataSource: any[] = mock;

    componentDidMount(): void {

    }


    // @ts-ignore
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    paginationConfig: any = {
        position: 'bottom',
        defaultPageSize: 10
    };


    toggleDialog = (status: boolean) => {
        this.setState({visible: status});
    };

    public render() {

        const {
            // @ts-ignore
            intl: {formatMessage},
        } = this.props;

        let {sortedInfo, filteredInfo}: any = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};


        const columns = [
            {
                title:
                    formatMessage({id: 'money.dashboard.type'}),
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
                title: formatMessage({id: 'money.dashboard.createdDate'}),
                dataIndex: 'createdDate',
                key: 'createdDate',
                render: (createDate: string) => {
                    return moment.unix(Number(createDate)).format("YYYY-MM-DD HH:mmA")
                }
            },
            {
                title: formatMessage({id: 'money.dashboard.category'}),
                dataIndex: 'category',
                key: 'category'
            },
            // todo: 后面可以这两部分合并城一起
            {
                title: formatMessage({id: 'money.dashboard.subCategory'}),
                dataIndex: 'subCategory',
                key: 'subCategory',
            },
            {
                title: formatMessage({id: 'money.dashboard.currency'}),
                dataIndex: 'currency',
                key: 'currency',
            },
            {
                title: formatMessage({id: 'money.dashboard.amount'}),
                dataIndex: 'amount',
                key: 'amount',
                sorter: (a: any, b: any) => a.amount - b.amount,
                sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
            },
            {
                title: formatMessage({id: 'money.dashboard.note'}),
                dataIndex: 'note',
                width: 300,
                key: 'note',
            },
        ];

        return (
            <div>
                <Button type="primary" className="add-btn"
                        onClick={() => this.toggleDialog(!this.state.visible)}>{formatMessage({id: 'add'})}</Button>
                <AddRecordDialog visible={this.state.visible} toggleDialog={this.toggleDialog}
                                 formatMessage={formatMessage}></AddRecordDialog>
                {/*<FilterMessage/>*/}
                <Table onChange={(pagination, filters, sorter) => this.handleChange(pagination, filters, sorter)}
                       dataSource={this.dataSource} columns={columns}
                       pagination={this.paginationConfig}/>

            </div>
        )
    }
}

// @ts-ignore
export const Dashboard = injectIntl(DashboardComp);
