import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from "react-intl";

import {translationMap} from "./utils/translationMap";


const getTranslationMap = (locale: string) => translationMap[locale];
const locale = 'zh';
ReactDOM.render(<IntlProvider locale={locale}
                              messages={getTranslationMap((locale))}><App/></IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
