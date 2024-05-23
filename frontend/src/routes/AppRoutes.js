import React, { Fragment } from 'react'
import PublicRoutes from './PublicRoutes'
import ProtectedRouteAdmin from './AdminRoutes'
import ProtectedRouteUser from './UserRoutes'
import NotFoundPage from '../components/NotFoundPage/NotFoundPage'
import { routePublic, routeAdmin, routeUser } from './Routes'
import { Routes, Route, Link, Redirect, Switch, Navigate, BrowserRouter as Router } from 'react-router-dom';
import DefaultComponent from '../components/DefaultComponent/DefaultComponent'


const AppRoutes = ({ pathCurrent }) => {
    return (
        <>
            <Routes>
                {routePublic.map((route, idx) => {
                    const Page = route.page
                    const Layout = route.isShowHeader ? DefaultComponent : Fragment
                    return (
                        <Route key={route.path} path={route.path} element={
                            // <AuthRoutes pathCurrent={pathCurrent} path={route.path}>
                            <PublicRoutes pathCurrent={pathCurrent} path={route.path}>
                                <Layout>
                                    <Page />
                                </Layout>
                            </PublicRoutes>
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
                                    <Page />
                                </Layout>
                            </ProtectedRouteUser>
                        } />
                    )
                })}

                {routeAdmin.map((route, idx) => {
                    const Page = route.page
                    const Layout = route.isShowHeader ? DefaultComponent : Fragment
                    return (
                        <Route key={route.path} path={route.path} element={
                            // <AuthRoutes pathCurrent={pathCurrent} path={route.path}>
                            <ProtectedRouteAdmin pathCurrent={pathCurrent} path={route.path}>
                                <Layout>
                                    <Page />
                                </Layout>
                            </ProtectedRouteAdmin>
                        } />
                    )
                })}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default AppRoutes