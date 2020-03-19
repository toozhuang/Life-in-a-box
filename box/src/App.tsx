import * as React from "react";
import {compose} from 'recompose';
import {
    Route,
    withRouter,
    Redirect,
} from 'react-router-dom';
import {injectIntl} from 'react-intl';

import {Layout, Menu} from 'antd';
import {
    MoneyCollectOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import {Dashboard} from "./containers/mymoney/";


import './App.scss'

// todo: 后续能不能用@XXX 直接这样代替呢?
import {AppRoutes} from "./constants/app_route";
import {SetPanel} from "./containers/box_setting/set_panel";
import CommonTopbar from "./unit/common_top_bar";


const {Header, Sider, Content} = Layout;

class App extends React.Component<any, any> {


    componentDidMount(): void {
        console.log('this.pros: ', this.props)
    }

    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    appRouteSetting = (): { key: string, path: string, label: string, icon: any, component: any }[] => [{
        key: 'money_dashboard',
        path: AppRoutes.DASHBOARD,
        label: this.props.intl.formatMessage({id: 'route.money.dashboard'}),
        icon: <MoneyCollectOutlined/>,
        component: Dashboard,
    },
        {
            key: 'box_setting',
            path: AppRoutes.SETTING,
            label: this.props.intl.formatMessage({id: 'route.box.setting'}),
            icon: <ProfileOutlined/>,
            component: SetPanel,
        }
    ];


    navigateTo = ({key}: any) => {


        this.props.history.push(this.appRouteSetting().filter(item => item.key === key).map(item => item.path)[0])

    }


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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.navigateTo}>
                        {this.appRouteSetting().map(({key, icon, label, path}) => {
                            return (
                                <Menu.Item key={key}>
                                    {/*<NavLink key={key} to={path}>*/}
                                    {icon}<span>{label}</span>
                                    {/*</NavLink>*/}
                                </Menu.Item>)

                        })}
                    </Menu>
                </Sider>
                <Layout className="site-layout">

                    <CommonTopbar/>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >

                        {this.appRouteSetting().map(routeSetting => (
                            <Route
                                id={routeSetting.key}
                                key={`plan-router-${routeSetting.key}`}
                                path={`${routeSetting.path}`}
                                component={routeSetting.component}
                            />
                        ))
                        }
                        <Redirect to={AppRoutes.DASHBOARD}/>

                    </Content>
                </Layout>
            </Layout>

        );
    }
}

export default compose(injectIntl, withRouter)(App);