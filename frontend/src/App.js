import './App.scss';
import React, { Fragment } from 'react'
import { Routes, Route, BrowserRouter as Router  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createBrowserHistory } from "history";
import AppRoutes from './routes/AppRoutes'


function App() {

  const path = createBrowserHistory().location.pathname

  return (
    <>
      <AppRoutes pathCurrent={path}/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
