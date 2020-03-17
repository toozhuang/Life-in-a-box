import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import {IntlProvider} from "react-intl";
import {translationMap} from "./utils/translationMap";
import {BrowserRouter, Route} from "react-router-dom";

import App from './App';

import * as serviceWorker from './serviceWorker';

const getTranslationMap = (locale: string) => translationMap[locale];
const locale = 'zh';

const intro = <IntlProvider locale={locale} messages={getTranslationMap((locale))}>
    <BrowserRouter>
        <Route key={'route'} path={'/'} component={App}/>
    </BrowserRouter>
</IntlProvider>;
ReactDOM.render(intro, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
