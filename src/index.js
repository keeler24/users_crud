import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'


const rootNode = document.getElementById('root')
ReactDOM.render(
    <Provider store={store} >
    <Router>
        <App />
    </Router>
    </Provider>,
     rootNode
)


