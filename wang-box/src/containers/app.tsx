import {Button} from "antd";
import {IntlProvider} from "react-intl";
import translationMap from "../utils/translationMap";

import * as React from "react";
import Dashboard from "./mymoney/dashboard/dashboard";


class App extends React.Component<IProps, IState> {

    constructor() {
        super();
        this.state = {
            locale: 'zh'
        }
    }

    componentDidMount(): void {
        this.state = {
            locale: 'zh'
        }
    }

    localeChange = () => {
        let hh_locale = this.state.locale === 'zh' ? 'en' : 'zh'
        this.setState({locale: hh_locale});
    }

    render() {
        const {locale} = this.state;

        return <div>
            <Button onClick={() => {
                this.localeChange()
            }}>切换语言</Button>
            // @ts-ignore
            <IntlProvider locale={locale} messages={translationMap[locale]}>
                <Dashboard/>
            </IntlProvider>
        </div>
    }
}

export default App;

