import React from 'react';
import logo from './logo.svg';
import './App.css';
import MoneyPage from "./containers/MoneyPage";

const App: React.FC = () => {
    return (
        <div className="App">
            <MoneyPage title={"随手记"}/>
        </div>
    );
};

export default App;
