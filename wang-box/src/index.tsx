import * as React from 'react';
import * as ReactDOM from 'react-dom';


import './styles/index.scss';
import App from "./containers/app";

const ROOT = document.querySelector('.container');


ReactDOM.render(
    <App/>

    , ROOT);