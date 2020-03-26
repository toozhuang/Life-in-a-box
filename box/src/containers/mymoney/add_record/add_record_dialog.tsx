import * as React from "react";

import {Modal, Button} from 'antd';
import {Input, Tooltip} from 'antd';
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';

import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

class AddRecordDialog extends React.Component<any, any> {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    };


    componentDidMount() {
        const client = new ApolloClient({
            uri: 'http://localhost:5000/graphql',
        });

      client
      .query({
        query: gql`
            {
                tickets{
                    user{
                        name
                    }
                }
            }
        `
      })
      .then(result => console.log(result));

    }

    showModal = () => {
        this.props.toggleDialog(
            true
        );
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                confirmLoading: false,
            });
            this.handleCancel();
        }, 2000);
    };

    handleCancel = () => {

        this.props.toggleDialog(false);

    };

    render() {

        const {
            formatMessage,
            visible,
        } = this.props;

        const {confirmLoading, ModalText} = this.state;

        return (
            <Modal
                title={formatMessage({id: 'money.dashboard.dialog.title'})}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <Input
                    placeholder="Enter your username"
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    suffix={
                        <Tooltip title="Extra information">
                            <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>
                    }
                />
                <br/>
                <br/>
                <Input prefix="￥" suffix="RMB"/>

                <br/>
                <br/>

                <Input prefix="￥" suffix="RMB" disabled/>
            </Modal>
        );
    }
}

export default AddRecordDialog;
