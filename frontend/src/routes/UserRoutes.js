import { BrowserRouter as Router, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { jwtDecode } from 'jwt-decode'


const ProtectedRouteUser = (props) => {

    const token = localStorage?.getItem("access_token");

    const navigate = useNavigate();
    const history = createBrowserHistory();
    const { role_code } = jwtDecode(token)


    if (!token) return <Navigate to="/login" />;
    if (role_code === "R2") {
        return (
            <>
                {props.children}
            </>
        )
    }else{
        // return  <Navigate to="/" />;
        history.back()
    }
    // else if (role_code !== "R2" && props.pathCurrent == props.path) {
    //     // presentPage()
    //     history.back()
    // }
}

export default ProtectedRouteUser