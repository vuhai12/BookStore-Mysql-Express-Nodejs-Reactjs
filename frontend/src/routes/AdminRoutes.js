import { BrowserRouter as Router, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from "history";

const ProtectedRouteAdmin = (props) => {

    const token = localStorage.getItem("access_token");
    const role_code = localStorage.getItem("role_code");
    
    const navigate = useNavigate();
    const history = createBrowserHistory();
    
    if (!token) return <Navigate to="/login" />;

    if (role_code === "R1") {
        return (
            <>
                {props.children}
            </>
        )
    }
    // else if (role_code !== "R1" && props.pathCurrent == props.path) {
    //     // presentPage()
    //     history.back()
    // }
}

export default ProtectedRouteAdmin