import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import './scss/main.scss';

ReactDOM.render(<BrowserRouter>
    <App />
    </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
