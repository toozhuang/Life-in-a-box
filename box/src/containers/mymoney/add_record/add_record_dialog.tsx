import * as React from 'react';

import {Modal, Button} from 'antd';

class App extends React.Component<any, any> {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    };

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
        const {confirmLoading, ModalText} = this.state;
        const {visible} = this.props;
        return (
            <Modal
                title="Title"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <p>{ModalText}</p>
            </Modal>
        );
    }
}

export default App;