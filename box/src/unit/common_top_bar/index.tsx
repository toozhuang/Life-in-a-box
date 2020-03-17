import {withRouter} from "react-router-dom";
import React from "react";


class CommonTopbar extends React.PureComponent<any, any> {

    render() {
        return <h2>我是 topbar </h2>
    }
}


export default withRouter(CommonTopbar);