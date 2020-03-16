import * as React from "react";

import {Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MoneyCollectOutlined,
    BookOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import {Dashboard} from "./containers/mymoney/";
import {IntlProvider} from "react-intl";
import {translationMap} from "./utils/translationMap";


import './App.css'


const {Header, Sider, Content} = Layout;

class App extends React.Component {
    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    translationMap = (locale: string) => translationMap[locale];

    render() {

        const locale = 'zh';

        return (
            <IntlProvider locale={locale} messages={this.translationMap((locale))}>
                <Layout>
                    <Sider breakpoint="lg"
                           collapsedWidth="0"
                           onBreakpoint={broken => {
                               console.log(broken);
                           }}
                           onCollapse={(collapsed, type) => {
                               this.toggle()
                           }}
                           collapsed={this.state.collapsed}
                    >
                        <div className="logo"/>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <MoneyCollectOutlined/>
                                <span>Money</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <BookOutlined/>
                                <span>Day One</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <ProfileOutlined/>
                                <span>壮</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background">

                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <Dashboard/>
                        </Content>
                    </Layout>
                </Layout>
            </IntlProvider>
        );
    }
}

export default App;