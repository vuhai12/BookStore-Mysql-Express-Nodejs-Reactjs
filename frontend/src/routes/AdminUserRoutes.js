import { BrowserRouter as Router, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteAdminUser = ({children}) => {
    console.log('ProtectedRouteAdminUser')

    const token = localStorage?.getItem("access_token");
    
    const roleCode = () => {
        if (token) {
            const { role_code } = jwtDecode(token)
            return role_code
        }
    }
    
    
    if (!token) return <Navigate to="/login" />;

    if (roleCode() === "R1"||roleCode()==='R2') {
        return (
            <>
                {/* {children} */}
                <Outlet/>
            </>
        )
    }else{
        return  <Navigate to="/login" />
    }
    // else if (role_code !== "R1" && props.pathCurrent == props.path) {
    //     // presentPage()
    //     history.back()
    // }
}

export default ProtectedRouteAdminUser