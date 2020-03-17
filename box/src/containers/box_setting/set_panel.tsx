import * as React from "react";
import {injectIntl} from "react-intl";


class SetPanelComp extends React.Component<any, any> {


    render() {
        return <div>a word</div>
    };
}

export const SetPanel = injectIntl(SetPanelComp);