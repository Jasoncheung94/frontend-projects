// Starting js file that imports App.js and renders it to root div.
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'; // import all the tailwind utilities + css
import App from './App';
// npm i --legacy-peer-deps to install the right dependencies

import { ContextProvider } from './contexts/ContextProvider';


ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>,
    document.getElementById('root')
);