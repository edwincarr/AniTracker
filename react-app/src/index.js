// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import './index.css';
// import App from './App';
// import configureStore from './store';

// const store = configureStore();

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//         <App />
//       </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store';
const container = document.getElementById('root');
const root = createRoot(container);
const store = configureStore();

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
