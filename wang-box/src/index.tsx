import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import zhCN from 'antd/es/locale/zh_CN';

// 添加多语言的约束 ConfigProvider
import {Button} from 'antd';
// react 的多语言
import {IntlProvider} from 'react-intl';

import './styles/index.scss';
import Dashboard from "./containers/mymoney/dashboard/dashboard";
import translationMap from "./utils/translationMap";

const ROOT = document.querySelector('.container');

let locale = 'cn';


ReactDOM.render(
    // <ConfigProvider locale={zhCN}>
    <div>
        <Button onClick={() => {
            locale = locale === 'cn' ? 'en' : 'cn'
            console.log('点击了吗？ ', locale)
        }}>切换语言</Button>
        // @ts-ignore
        <IntlProvider locale={locale} messages={translationMap[locale]}>
            <Dashboard/>
        </IntlProvider>
    </div>
    // </ConfigProvider>
    , ROOT);