/** 2020/3/20
 *   作者: Wang
 *   功能: TopBars都具有相同的能力, 在路由enums中配置好路由以后
 *   到这里来, 添加需要显示的路由
 *   然后将要显示的路由组成 array 来显示
 */


import React from "react";
import {AppRoutes} from "../../constants/app_route";

class MoneyTopBarTabs extends React.PureComponent {


    moneyRootRoute:any = {
        key: 'records',
        path: AppRoutes.DASHBOARD,
        label: '流水',
        showOnTopTabs: true
    };


    moneyRouteSetting = () => [this.moneyRootRoute];

    buildTabs = () => {
        return this.moneyRouteSetting().reduce((result, settingRoute) => {
            // 如果 该item 不能显示在 tabs上, 那么就不插入 result数组
            if (!settingRoute.showOnTopTabs) return result;

            const url = settingRoute.path;
            const newRoute = {...settingRoute, key: settingRoute.key, url};
            result.push(newRoute);
            return result
        }, [])
    };


    render() {
        console.log(this.buildTabs())
        return <div>hahah</div>
    }
}

export default MoneyTopBarTabs;