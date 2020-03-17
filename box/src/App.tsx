import * as React from "react";

import {
    Route,
    Switch,
    Redirect,
    BrowserRouter,
} from 'react-router-dom';
import {injectIntl} from 'react-intl';

import {Layout, Menu} from 'antd';
import {
    MoneyCollectOutlined,
    BookOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import {Dashboard} from "./containers/mymoney/";


import './App.css'

// todo: 后续能不能用@XXX 直接这样代替呢?
import {AppRoutes} from "./constants/app_route";


const {Header, Sider, Content} = Layout;

class App extends React.Component<any, any> {
    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    appRouteSetting = () => [{
        key: 'r_program',
        path: AppRoutes.DASHBOARD,
        label: this.props.intl.formatMessage({id: 'route.money.dashboard'}),
        showOnTopTab: true,
        component: Dashboard,
    }];

    render() {


        return (

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
                        {/*<Dashboard/>*/}
                        {/*    路由替代*/}
                        <BrowserRouter>
                            {this.appRouteSetting().map(routeSetting => (
                                <Route
                                    id={routeSetting.key}
                                    key={`plan-router-${routeSetting.key}`}
                                    path={`${routeSetting.path}`}
                                    component={routeSetting.component}
                                />
                            ))
                            }
                            {/*<Redirect to={RouteHelper.buildPath(this.planRootRoute.path)}/>*/}
                        </BrowserRouter>

                    </Content>
                </Layout>
            </Layout>

        );
    }
}

export default injectIntl(App);