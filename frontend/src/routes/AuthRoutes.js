import { BrowserRouter as Router, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteAuth = (props) => {

    const token = localStorage?.getItem("access_token");
    const history = createBrowserHistory();
    const roleCode = () => {
        if (token) {
            const { role_code } = jwtDecode(token)
            return role_code
        }
    }
    if (token && roleCode()) {
        history.back()
    } else {
        return (
            <>
                {props.children}
            </>
        )
    }



    //   return (
    //         <>
    //             {props.children}
    //         </>
    //     )
    
    // else if (role_code !== "R1" && props.pathCurrent == props.path) {
    //     // presentPage()
    //     history.back()
    // }
}

export default ProtectedRouteAuth