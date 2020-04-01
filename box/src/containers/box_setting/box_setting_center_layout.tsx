/** 2020/4/1
 *   作者: Wang
 *   功能: 一个包裹性的 layout hoc
 *   用来在核心的显示区域外面 再添加一层显示
 */

import React from 'react';

import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';

interface IProps {
    permission: boolean   // 后期要判断能不能进入这个页面
}

interface IState {
    isLoading: boolean
}

export const SettingLayoutView = (ContentComponent: any) => {
    class SettingLayoutViewHoc extends React.PureComponent<IProps, IState> {

    }
}
