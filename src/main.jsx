// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom';
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//   <StrictMode>
//     <App />
//   </StrictMode>
//   </BrowserRouter>
// // )

import React, { StrictMode } from 'react';  // ✅ Import React
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './Redux/store.js'; // Ensure this path is correct

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

// import React from "react";

// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <BrowserRouter>
//     <React.StrictMode>
//     <App />
//     </React.StrictMode>
//         {/* <App /> */}
//     </BrowserRouter>,
   
// );