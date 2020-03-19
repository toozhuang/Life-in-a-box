/** 2020/3/20
 *   作者: Wang
 *   功能: UrlFoldableTabs BaseUrlFoldableTabs FoldableTabs
 *   逐层渐进, 从最底层的 FoldableTabs 开始
 */

import React from 'react';

interface IProps {
    className: string,
    // 是否为纯文本tab
    // tab数组
    tabs: {
        key: string,
        url?: string,
        label: string
    }[],
    // 始终显示在更多菜单里的tabs
    tabsInMore: {
        key: string,
        url?: string,
        label: string,
    }[],
    // 纯文本tab的 activedTabKey
    activedTabKey?: string,
    // 切换tab的时间
    onActivedTabChange?: any,
    tabRenderer: any,
    menuItemRenderer: any,
    moreElement: any, // node
    afterTabRenderer: any, // node
    checkClass: string,
}

// todo: 查一下 state 在 typescript 的 interface 怎么写
interface IState {
    tabs: [],
    className: '',
    onActivedTabChange: any, // noop from es todo: 查一下这个应该怎么表示
    tabsInMore: [],
    activedTabKey: '',
    moreElement: null,
    afterTabRenderer: null,
    checkClass: null,
}

export class FoldableTabx extends React.PureComponent<IProps,IState> {

}
