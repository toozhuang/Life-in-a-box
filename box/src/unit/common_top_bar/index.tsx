import {withRouter, Switch, Route} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import React from "react";
import {AppRoutes} from "../../constants/app_route";
import {EventEmitter} from "events";
import TopbarWithTabs from "./topbar_with_tab";


// interface IProps {
//     match: {
//         params: any
//     }
// }
// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {
    param: string,
}


// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    // someString: string,
}

// interface routingType {
//     [propName: string]: any
// }

type routingType = {
    [propName: string]: {
        className: string,
        product: string
        customRender?: any
    }
}

const topbarEventListener = new EventEmitter();

class CommonTopbar extends React.PureComponent<PropsType> {


    static routeSetting: routingType = {
        // todo: 后面要把 DASHBOARD 改成 money record 相关的
        [AppRoutes.DASHBOARD]: {
            className: 'money-topbar',
            product: 'Money Record',
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

    fixedRender = (key: string) => () => {
        console.log('我怕是没偶偶传过来吧: ', key, CommonTopbar.routeSetting[key]);
        return <TopbarWithTabs  {...CommonTopbar.routeSetting[key]}/>;
    };

    render() {
        const routeSettingPaths: string[] = Object.keys(CommonTopbar.routeSetting);

        return (
            <Switch>
                {
                    routeSettingPaths.map((key) => {
                        // 这个地方就是我们render的形式了, 虽然最终肯定是route的形式, 但是route 也是有长相样式的
                        // 但是, 目前, 我们并没有对 customRender 进行使用, 主要还是后面这个 top bar with tabs 来设置
                        console.log('难道没有key:L', key)
                        const renderFunc = CommonTopbar.routeSetting[key].customRender ||
                            (this.fixedRender(key));

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