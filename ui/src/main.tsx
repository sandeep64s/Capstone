import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root')!;
import { store } from "./store";
import App from './App';
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
