import {Button} from "antd";
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

    translationMap = (locale:string) => translationMap[locale];

    render() {
        const {locale} = this.state;

        let div = <div>
            <Button onClick={() => {
                this.localeChange()
            }}>切换语言</Button>
            <IntlProvider locale={locale} messages={this.translationMap((locale))}>
                <Dashboard/>
            </IntlProvider>
        </div>;
        return div
    }
}

export default App;

