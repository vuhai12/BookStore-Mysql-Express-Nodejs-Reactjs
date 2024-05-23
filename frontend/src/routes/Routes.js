import Home from '../pages/homePage/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import BookDetail from '../pages/book/BookDetail'
import CartDetail from '../pages/cart/CartDetail';
import Payment from '../pages/payment/Payment';
import OrderSuccess from '../pages/orderSuccess/OrderSuccess';
import MyOrder from '../pages/myOrder/MyOrder';
import AminPage from '../pages/adminPage/AminPage';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage'; 

export const routeAdmin = [
    {
        path: '/system/admin',
        page: AminPage,
        isShowHeader: true
    },
]

export const routeUser = [
    
   
   
    {
        path: '/book/cart',
        page: CartDetail,
        isShowHeader: true
    },
    {
        path: '/checkout/payment',
        page: Payment,
        isShowHeader: true
    }, 
    {
        path: '/order-success',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrder,
        isShowHeader: true
    },
   
]

export const routePublic = [
    {
        path: '/category/:code',
        page: Home,
        isShowHeader: true
    },
    {
        path: '/login',
        page: Login,
        isShowHeader: false,
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: false
    },
    {
        path: '/',
        page: Home,
        isShowHeader: true
    },
    {
        path: '/book/:id',
        page: BookDetail,
        isShowHeader: true
    },

    // {
    //     path: '*',
    //     page: NotFoundPage
    // },
]

