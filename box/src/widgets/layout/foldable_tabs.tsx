/** 2020/3/20
 *   作者: Wang
 *   功能: UrlFoldableTabs BaseUrlFoldableTabs FoldableTabs
 *   逐层渐进, 从最底层的 FoldableTabs 开始
 */

import React from 'react';
import classnames from 'classnames';
import { get} from 'lodash-es';

import './foldable_tabs.scss';


interface Itab {

    key: string,
    url?: string,
    label: string

}

interface IProps {
    className: string,
    // 是否为纯文本tab
    // tab数组
    tabs: Itab[],
    history: any, // 路由控制跳转而用
    // 始终显示在更多菜单里的tabs
    tabsInMore?: {
        key: string,
        url?: string,
        label: string,
    }[],
    // 纯文本tab的 activedTabKey
    activedTabKey?: string,
    // 切换tab的时间
    onActivedTabChange?: any,
    tabRenderer?: any,
    menuItemRenderer?: any,
    moreElement?: any, // node
    afterTabRenderer?: any, // node
    checkClass?: string,
}

// todo: 查一下 state 在 typescript 的 interface 怎么写
// interface IState {
//     tabs: [],
//     className: '',
//     onActivedTabChange: any, // noop from es todo: 查一下这个应该怎么表示
//     tabsInMore: [],
//     activedTabKey: '',
//     moreElement: null,
//     afterTabRenderer: null,
//     checkClass: null,
// }

export class FoldableTabs extends React.PureComponent<IProps, any> {
    // @ts-ignore
    constructor(...args) {
        // @ts-ignore
        super(...args);
        this.state = {
            visiableCount: this.props.tabs.length,
            activedTabKey: this.props.activedTabKey,
        }
    }


    componentDidMount(): void {
        this.handleResize();
    }


    handleResize = () => {

    }


    getClassName = (tab: Itab, isvisiable: boolean) => {
        return classnames('foldable-tabs-item', {
            'foldableTabs-item-actived': isvisiable,
            //    第二个 class 后面会添加 foldable tab item
        })
    };


    handleTabClick = (tab: Itab) => {
        // this.updateActivedKey(tab.key);
        this.setState({
            activedTabKey: tab.key,
        });
    }

    tabRenderer = (tab: Itab) => {
        return (
            // todo: 后面要把这个改成可跳转的
            <a href={'#'}>
                <span>{tab.label}</span></a>
        )
    }


    renderTab = (tab: Itab, isvisible: boolean, className: string) => {
        return (
            <div key={tab.key} role="presentation" className={className} onClick={() => this.handleTabClick(tab)}>
                {
                    this.tabRenderer(tab)
                }
            </div>
        )
    }

    renderTabs = (activedTab: Itab | undefined) => {
        return this.props.tabs.map((tab, index) => {
            const isVisible = activedTab && activedTab.key === tab.key;
            // @ts-ignore
            return this.renderTab(tab, true, this.getClassName(tab, isVisible))
        });

    };


    defaultMatch = (tab: Itab, pathname: string) => {
        if (pathname == null) debugger
        return pathname.startsWith(tab.url || '');
    };

    render() {
        const {className, history, tabs} = this.props;


        const activedTab = tabs.find((tab: Itab) => {
            return this.defaultMatch(tab, get(history, 'location.pathname'));
        });


        return (
            <div className={classnames(className, 'foldable-tabs')}>
                {this.renderTabs(activedTab)}
            </div>
        )
    }

}


// todo note 后面后续会根据这个标题栏的要求而扩展这部分的功能
// class BaseUrlFoldableTabs extends React.PureComponent {
//     componentDidMount(): void {
//         // this.
//     }
// }
