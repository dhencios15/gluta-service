import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Windmill } from '@windmill/react-ui';
import { PersistGate } from 'redux-persist/integration/react';

import './tailwind.output.css';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './store';

import { SidebarProvider } from './context/SidebarContext';
import ThemedSuspense from './components/ThemedSuspense';
import App from './App';

ReactDOM.render(
  <SidebarProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<ThemedSuspense />}>
          <Windmill usePreferences>
            <App />
          </Windmill>
        </Suspense>
      </PersistGate>
    </Provider>
  </SidebarProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
