/***
 * common top bar
 * 主要的职责并不是设置tab bar
 * 而是 根据 当前的路由, 来决定我们在该路由下
 * 显示什么样的 tab bar
 * 所有 才会有 static routeSetting
 */

import {withRouter, Switch, Route} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import React from "react";
import {AppRoutes} from "../../constants/app_route";
import {EventEmitter} from "events";
import TopbarWithTabs from "./topbar_with_tab";
import MoneyTopBarTabs from "components/component/money_topbar_tabs";


type PathParamsType = {
    param: string,
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    // someString: string,
}

type routingType = {
    [propName: string]: {
        className: string,
        product: string
        centerRenderer?: any
        customRender?:any
    }
}

const topbarEventListener = new EventEmitter();

class CommonTopbar extends React.PureComponent<PropsType> {


    static routeSetting: routingType = {
        // todo: 后面要把 DASHBOARD 改成 money record 相关的
        [AppRoutes.DASHBOARD]: {
            className: 'money-topbar',
            product: 'Money Record',
            centerRenderer: () => <MoneyTopBarTabs/>
        },
        [AppRoutes.SETTING]: {
            className: 'money-topbar',
            product: 'Setting',
        }
    };


    static addSettingToPath = () => {
    };

    componentWillMount(): void {
        topbarEventListener.on('updateTobar', () => {
            // 如果有这个 update to bar 的时间,
            // 那么就更新全局stamp
            this.setState({
                stamp: new Date().getTime()
            })
        })
    }

    /**
     * common top bar renderer
     */
    fixedRenderer = (key: string) => () => {
        return <TopbarWithTabs  {...CommonTopbar.routeSetting[key]}/>;
    };

    render() {

        const routeSettingPaths: string[] = Object.keys(CommonTopbar.routeSetting);
        console.log('按照我的理解应该这里会有啊: ', routeSettingPaths)
        return (
            <Switch>
                {
                    routeSettingPaths.map((key) => {
                        // 这个地方就是我们render的形式了, 虽然最终肯定是route的形式, 但是route 也是有长相样式的
                        // 但是, 目前, 我们并没有对 customRender 进行使用, 主要还是后面这个 top bar with tabs 来设置
                        const renderFunc = CommonTopbar.routeSetting[key].customRender ||
                            (this.fixedRenderer(key));

                        return (
                            <Route path={key}
                                   key={`top-bar-router-${key}`}
                                   render={renderFunc}
                            />
                        )
                    })
                }
            </Switch>
        );


    }
}


export default withRouter(CommonTopbar);