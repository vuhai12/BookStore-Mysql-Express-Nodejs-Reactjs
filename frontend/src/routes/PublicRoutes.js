import { BrowserRouter as Router, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from "history";

const PublicRoutes = (props) => {

  const token = localStorage.getItem('access_token')
  const navigate = useNavigate()
  const history = createBrowserHistory();

  return (
    <>
      {props.children}
    </>
  )

  // if (!token) {
  //   return (
  //     <>
  //       {props.children}
  //     </>
  //   )
  // } else if (token) {
  //   // presentPage()
  //   // history.back()
  // }
}

export default PublicRoutes