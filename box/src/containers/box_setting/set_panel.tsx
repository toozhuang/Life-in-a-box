import * as React from "react";
import {injectIntl} from "react-intl";


class SetPanelComp extends React.Component<any, any> {

    componentDidMount(): void {
        console.log('我来了吗');
    }

    render() {
        return <div>a word</div>
    };
}

export const SetPanel = injectIntl(SetPanelComp);
