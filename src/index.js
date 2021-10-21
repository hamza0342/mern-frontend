import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';



Providers.globalProvider = new Msal2Provider({
  clientId: '312e3c8e-f0e5-4323-ab33-6d0cfc08a037'
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

