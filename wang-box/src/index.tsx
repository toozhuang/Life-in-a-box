import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/index.scss';
import Dashboard from "./containers/mymoney/dashboard/dashboard";

const ROOT = document.querySelector('.container');

ReactDOM.render(<div>
    <Dashboard color={'blue'}></Dashboard>
</div>, ROOT);