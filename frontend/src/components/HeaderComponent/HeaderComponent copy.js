import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import Form from 'react-bootstrap/Form';
import { createBrowserHistory } from "history";
import { GrCart } from "react-icons/gr";
import Badge from 'react-bootstrap/Badge';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { IoIosSearch } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { WrapperAccount, WrapperAccountItem } from './style';
import { useEffect, useState } from 'react';
import { fetchGetListBookToolkit } from '../../redux/slides/bookSlice';
import { jwtDecode } from 'jwt-decode'
import { fetchGetCartToolkit } from '../../redux/slides/cartSlice';

const HeaderComponent = () => {

    const { t, i18n } = useTranslation('translation')
    const currentLanguage = i18n.language
    const path = createBrowserHistory().location.pathname
    const dispatch = useDispatch()
    const listCart = useSelector((state) => state.cart.listCart)
    useEffect(()=>{
        dispatch(fetchGetCartToolkit())
    },[])

   
   

    const navigate = useNavigate()
    const auth = localStorage.getItem('auth')
    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.setItem('auth', false)
    }

    const token = localStorage.getItem("access_token");

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        localStorage.setItem('lng', lng)
    }

    const handleCart = () => {
        if(token){
            const { role_code } = jwtDecode(token)
            if((role_code == 'R1' || role_code == 'R2')){
                navigate('/book/cart')
            }else{
                
                navigate('/login')
            }
        }else{
            navigate('/login')
        }
       
    }

    const [searchString,setSearchString] = useState('')
    const limit = useSelector((state)=>state.book.limit)
    const pageCurent =1

    const handleSearch = (e) => {
        setSearchString(e.target.value)
    }

    const handleSubmit = ()=>{
        dispatch(fetchGetListBookToolkit({limit,pageCurent,searchString:''}))
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" style={{ background: 'white', paddingTop: '10px', paddingBottom: '10px' }}>
                <Container>
                    <Navbar.Brand href="#home">Book</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto border-none">
                            <NavLink className='nav-link' to='/'>{t('book.home')}</NavLink>
                        </Nav>
                        <Nav className="me-auto border-none">
                            <InputComponent
                                placeholder='Search'
                                styleInput={{ padding: '10px', width: '300px' }}
                                onChange={handleSearch}
                            />
                            <ButtonComponent
                                icon={<IoIosSearch />}
                                // textButton='Search'
                                styleButton={{ width: '50px' }}
                                onClick={handleSubmit}
                            />
                        </Nav>

                        <Nav style={{ display: 'flex', alignItems: 'center' }}>
                            <Navbar.Text href="#home">{localStorage.getItem('access_token') ? localStorage.getItem('email') : ''}</Navbar.Text>
                            <Form.Select aria-label="Default select example" onChange={(e) => changeLanguage(e.target.value)}>
                                <option value="vi">Tiếng Việt</option>
                                <option value="en">English</option>
                            </Form.Select>
                            <div style={{ display: 'flex', cursor: 'pointer' }} onClick={handleCart}>
                                <GrCart style={{ fontSize: '30px', marginLeft: '30px', marginRight: '5px' }} />
                                {listCart?.length > 0 && <Badge bg="danger" style={{ display: 'flex', alignItems: 'center', width: '20px', height: '20px', borderRadius: '50%', justifyContent: 'center', lineHeight: '20px' }}>{listCart?.length}</Badge>}
                            </div>
                            <WrapperAccount>
                                <MdOutlineAccountCircle style={{ fontSize: '30px', marginLeft: '20px', marginRight: '5px' }} />
                                <WrapperAccountItem className='dropdown-content'>
                                    {localStorage.getItem('access_token') && (localStorage.getItem('role_code') == 'R1') ?
                                        <>
                                            <NavLink className='nav-link' to='/system/admin'>Thông tin tài khoản</NavLink>
                                            <NavLink className='nav-link' to='/login' onClick={logout}>
                                                {t('logout')}</NavLink>
                                        </>
                                        :
                                        <NavLink className='nav-link' to='/login'>{t('login')}</NavLink>}
                                </WrapperAccountItem>
                            </WrapperAccount>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderComponent