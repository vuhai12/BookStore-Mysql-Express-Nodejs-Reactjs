import './App.css';
import React, { Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { createBrowserHistory } from "history";
import AppRoutes from './routes/AppRoutes'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
