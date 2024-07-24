import React, { Fragment } from 'react'
import PublicRoutes from './PublicRoutes'
import ProtectedRouteAdmin from './AdminRoutes'
import ProtectedRouteUser from './UserRoutes'
import ProtectedRouteAuth from './AuthRoutes'
import NotFoundPage from '../components/NotFoundPage/NotFoundPage'
import { routePublic, routeAdmin, routeUser, routeAdminUser, routeAuth } from './Routes'
import { Routes, Route, Link, Redirect, Switch, Navigate, BrowserRouter as Router } from 'react-router-dom';
import DefaultComponent from '../components/DefaultComponent/DefaultComponent'
import SideBarInfoUser from '../components/SideBarInfoUser/SideBarInfoUser'
import Sidebar from '../components/SideBarInfoUser/Sidebar'
import { SidebarDataUser } from '../components/SideBarInfoUser/SidebarDataUser'
import { SidebarDataAdmin } from '../components/SideBarInfoUser/SidebarDataAdmin'
import ProtectedRouteAdminUser from './AdminUserRoutes'
import { jwtDecode } from "jwt-decode";




const AppRoutes = ({ pathCurrent }) => {
    return (
        <>
            <Routes>

                {routePublic.map((route, idx) => {

                    const Page = route.page
                    const Layout = route.isShowHeader ? DefaultComponent : Fragment
                    return (
                        <Route key={route.path} path={route.path} element={
                            <PublicRoutes pathCurrent={pathCurrent} path={route.path}>
                                <Layout>
                                    <Page />
                                </Layout>
                            </PublicRoutes>
                        } />
                    )
                })}
                {/* </Route> */}

                {routeAuth.map((route, idx) => {
                    const Page = route.page
                    const Layout = route.isShowHeader ? DefaultComponent : Fragment
                    return (
                        <Route key={route.path} path={route.path} element={
                            // <AuthRoutes pathCurrent={pathCurrent} path={route.path}>
                            <ProtectedRouteAuth pathCurrent={pathCurrent} path={route.path}>
                                <Layout>
                                    <Page />
                                </Layout>
                            </ProtectedRouteAuth>
                        } />
                    )
                })}

                {routeUser.map((route, idx) => {
                    const Page = route.page
                    const Layout = route.isShowHeader ? DefaultComponent : Fragment
                    return (
                        <Route key={route.path} path={route.path} element={
                            // <AuthRoutes pathCurrent={pathCurrent} path={route.path}>
                            <ProtectedRouteUser pathCurrent={pathCurrent} path={route.path}>
                                <Layout>
                                    <Sidebar >
                                        <Page />
                                    </Sidebar>
                                </Layout>
                            </ProtectedRouteUser>
                        } />
                    )
                })}

                {routeAdmin.map((route, idx) => {
                    const Page = route.page
                    const Layout = route.isShowHeader ? DefaultComponent : Fragment

                    return (
                        // <Route element={<ProtectedRouteAdmin />}>
                        //     <Route element={<Layout />}>
                        //         <Route element={<Sidebar />}>
                        //             <Route path={route.path} element={<Page />} />
                        //         </Route>
                        //     </Route>
                        // </Route>
                        <Route key={route.path} path={route.path} element={
                            <ProtectedRouteAdmin pathCurrent={pathCurrent} path={route.path}>
                                <Layout>
                                    <Sidebar >
                                        <Page />
                                    </Sidebar>
                                </Layout>
                            </ProtectedRouteAdmin>
                        }
                        />
                    )
                })}

                {routeAdminUser.map((route, idx) => {
                    const Page = route.page
                    const Layout = route.isShowHeader ? DefaultComponent : Fragment

                    return (
                        <>
                            <Route element={<ProtectedRouteAdminUser />}>
                                <Route element={<Layout />}>
                                    <Route element={<Sidebar />}>
                                        <Route path={route.path} element={<Page />} />
                                    </Route>
                                </Route>
                            </Route>
                            {/* <Route path={route.path} element={
                                // <AuthRoutes pathCurrent={pathCurrent} path={route.path}>
                                <ProtectedRouteAdminUser>
                                    <Layout>
                                        <Sidebar >
                                            <Page />
                                        </Sidebar>
                                    </Layout>
                                </ProtectedRouteAdminUser>
                            } /> */}

                        </>
                    )
                })}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default AppRoutes