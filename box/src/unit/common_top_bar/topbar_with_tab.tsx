/** 2020/3/18
 *   作者: Wang
 *   功能: 标准的 topbar的形式
 *   会使用路由设置里面的center topbar 来控制 中间的样式
 */

import React from "react";
import classnames from 'classnames';

import './common_top_bar.scss'

interface IProps {
    product: string,
    className: string,
    leftRenderer?: () => {},
    centerRenderer?: () => {},
}

class TopbarWithTabs extends React.PureComponent<IProps> {

    render() {
        const {product, className} = this.props;
        return (
            <div className={classnames('common-topbar-with-tab')}>
                <header className={`topbar ${className}`}>
                    <div className="left">
                        <span className={classnames('topbar-product-name ')}>{product}</span>
                        {this.props.leftRenderer?.()}
                    </div>
                    <div className="center">
                        {
                            this.props.centerRenderer?.()
                        }
                    </div>
                    <div className="right">
                        {/*    todo: 后面这里会放置用户登录的信息*/}
                    </div>

                </header>
            </div>
        )
    }
}


export default TopbarWithTabs;