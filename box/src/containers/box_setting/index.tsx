import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {SettingRoutes} from "constants/app_route";
import {SetPanel} from "./set_panel";


export const SettingRoute = () => {
    console.log('我来这里了吗：『 ')
    return <Switch>
        {/* 项目设置的第一个页面*/}
        <Route
            path={SettingRoutes.SETTING_HOME}
            component={SetPanel}
        />
        <Redirect to={SettingRoutes.SETTING_HOME} />
    </Switch>
};

