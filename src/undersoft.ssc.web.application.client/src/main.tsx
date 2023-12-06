import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { accounts, } from './infra/store/accountStore'
import { Authorization } from './infra/store/authorizationStore'
import { subcontractorAccounts, } from './infra/store/subcontractorAccountStore'
import { userAccounts, } from './infra/store/userAccountStore'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={accounts.store}>
        <Provider store={subcontractorAccounts.store}>
        <Provider store={userAccounts.store}>
        <Provider store={Authorization.store}>
            <BrowserRouter>
                <App />
                        </BrowserRouter>
                    </Provider>
                </Provider>
            </Provider>
        </Provider>
    </React.StrictMode>
)