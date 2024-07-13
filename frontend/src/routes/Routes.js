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
import UserInfo from '../components/UserInfo/UserInfo';
import UserOrder from '../components/UserOrder/UserOrder';
import AminOrder from '../components/AminOrder/AminOrder';
import AminUser from '../components/AminUser/AminUser';
import AminBook from '../components/AminBook/AminBook';

export const routeAdmin = [
    {
        path: '/system/admin/book',
        page: AminBook,
        isShowHeader: true
    },
    {
        path: '/system/admin/order',
        page: AminOrder,
        isShowHeader: true
    },
    {
        path: '/system/admin/user',
        page: AminUser,
        isShowHeader: true
    },
    
   
]

export const routeAdminUser = [
  
   
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
        path: '/user/info',
        page: UserInfo,
        isShowHeader: true
    },
]

export const routeUser = [
    
    
    // {
    //     path: '/user/info',
    //     page: UserInfo,
    //     isShowHeader: true
    // },
    {
        path: '/user/order',
        page: UserOrder,
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

export const routeAuth = [
    
    {
        path: '/login',
        page: Login,
        isShowHeader: true,
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: true
    },
    
    
    
]

