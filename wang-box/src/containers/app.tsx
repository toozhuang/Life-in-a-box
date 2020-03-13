/** 2020/3/13
 *   作者: Wang
 *   功能: 整个项目的入口， 目前还包含了 多语言的切换
 */

import {IntlProvider} from "react-intl";
import {translationMap} from "../utils/translationMap";

import * as React from "react";
import Dashboard from "./mymoney/dashboard/dashboard";

interface IProps {

}

interface IState {
    locale: string
}


class App extends React.Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        // this.state = {
        //     locale: 'zh'
        // }
    }

    componentDidMount(): void {
        // this.state = {
        //     locale: 'zh'
        // }
    }

    localeChange = () => {
        let hh_locale = this.state.locale === 'zh' ? 'en' : 'zh'
        this.setState({locale: hh_locale});
    }

    translationMap = (locale:string) => translationMap[locale];

    render() {
        // const {locale} = this.state;
        const locale = 'zh'

        let div = <div>
            {/*Note: 暂时先禁用这个功能吧*/}
            {/*<Button onClick={() => {*/}
            {/*    this.localeChange()*/}
            {/*}}>切换语言</Button>*/}
            <IntlProvider locale={locale} messages={this.translationMap((locale))}>
                <Dashboard/>
            </IntlProvider>
        </div>;
        return div
    }
}

export default App;

