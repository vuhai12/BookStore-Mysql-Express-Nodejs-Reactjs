import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import Badge from 'react-bootstrap/esm/Badge';
import { fetchGetCartToolkit } from '../../redux/slides/cartSlice';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { fetchLogoutToolkit, openSideBarMenu } from '../../redux/slides/userSlice';
import Toggle from '../Toggle/Toggle';
import { fetchGetListBookToolkit } from '../../redux/slides/bookSlice';
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";



function HeaderComponent() {
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listCart = useSelector((state) => state.cart.listCart)
    const { t, i18n } = useTranslation('translation')
    const currentLanguage = i18n.language
    const isOpenSideBarMenu = useSelector((state) => state.user.isOpenSideBarMenu)

    const handleClick = () => {
        dispatch(openSideBarMenu(!isOpenSideBarMenu))
    }
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        setDropdown(true);
        // if (window.innerWidth < 960) {
        //     setDropdown(false);
        // } else {
        //     setDropdown(true);
        // }
    };

    const onMouseLeave = () => {
       
        setDropdown(false);
        // if (window.innerWidth < 960) {
        //     setDropdown(false);
        // } else {
        //     setDropdown(false);
        // }
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        localStorage.setItem('lng', lng)
    }
    const token = localStorage?.getItem("access_token");
    useEffect(() => {
        if (token) {
            dispatch(fetchGetCartToolkit())
        }
    }, [])

    const handleCart = () => {
        if (token) {
            const { role_code } = jwtDecode(token)
            if ((role_code == 'R1' || role_code == 'R2')) {
                navigate('/book/cart')
            } else {
                navigate('/login')
            }
        } else {
            navigate('/login')
        }
    }
    const [toggle, setToggle] = useState('vi');
    const handleToggleChange = () => {
        if (toggle == 'vi') {
            setToggle('en');
        } else {
            setToggle('vi');
        }
        i18n.changeLanguage(toggle)
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        dispatch(fetchLogoutToolkit()).then((result) => {
            if (result.payload.error == 0) {
                localStorage.clear()
                dispatch(fetchGetCartToolkit()).then((result) => {
                    if (result.error) {
                        navigate('/login')
                    }
                })

            }
        })
    }

    const [searchString, setSearchString] = useState('')

    const handleSearch = (e) => {
        setSearchString(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(fetchGetListBookToolkit({ limit: 2, pageCurent: 1, searchString }))
    }
    const [isOpenOverlay, setIsOpenOverlay] = useState(false)

    const handleCloseOverlay = () => {
        setIsOpenOverlay(false)
    }
    const handleOpenOverlay = () => {
        setIsOpenOverlay(true)
    }

    return (
        <>
            <nav className='navbar w-[100%]'>
                <div className='flex justify-between w-full items-center sm:justify-between'>
                    <div className='mobile-menu-btn sm:hidden' onClick={handleOpenOverlay}>
                        <FaBars size={30} />
                    </div>
                    <div className='navbar-item sm:flex' >
                        {/* <Link to='/' className='navbar-item-logo' onClick={closeMobileMenu}> */}
                        {token && <div className='menu-icon' onClick={handleClick}>
                            {/* <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> */}
                            <i className={false ? 'fas fa-times' : 'fas fa-bars'} />
                        </div>}
                        {/* </Link> */}
                        <Link to='/' className='navbar-item-logo sm:ml-[30px]'
                        // onClick={closeMobileMenu}
                        >
                            <span>Book</span>
                        </Link>
                        <div className='nav-group-search sm:ml-[80px] sm:w-[50%]' >
                            <FaSearch className='nav-icon-search' />
                            <input onChange={handleSearch} className='sm:pl-[50px]'/>
                            <button onClick={handleSubmit}>Tìm kiếm</button>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='navbar-item'>
                            <ul className='nav-menu-item '>
                                <li className='nav-item '>
                                    <Link to='/' className='nav-links-item'>
                                        {t('book.home')}
                                    </Link>
                                </li>
                                <li
                                    className='nav-item'
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                >
                                    <Link
                                        to='/'
                                        className='nav-links-item'
                                    >
                                        Tài khoản <i className='fas fa-caret-down' />
                                    </Link>
                                    {dropdown && <Dropdown />}
                                </li>

                                {/* <li className='nav-item'>
                            <div style={{ display: 'flex', cursor: 'pointer' }} onClick={handleCart}>
                                <FaShoppingCart className='text-[25px] text-sky-900' />
                                {listCart?.length > 0 && <Badge bg="danger" style={{ display: 'flex', alignItems: 'center', width: '20px', height: '20px', borderRadius: '50%', justifyContent: 'center', lineHeight: '20px' }}>{listCart?.length}</Badge>}
                            </div>
                        </li> */}

                                {/* <li>
                        <Link
                            to='/sign-up'
                            className='nav-links-item-mobile'
                            onClick={closeMobileMenu}
                        >
                            Sign Up
                        </Link>
                    </li> */}
                            </ul>
                            {/* <div className='w-[100px] grow'>
                                <Toggle toggle={toggle} handleToggleChange={handleToggleChange} />
                            </div> */}

                        </div>
                      
                        <div className='flex cursor-pointer relative grow mr-[30px]' onClick={handleCart}>
                            <FaShoppingCart className='text-[25px] text-sky-900' />
                            {listCart?.length > 0 && <div className='bg-red-500 w-[20px] h-[20px] rounded-[50%] text-white flex items-center justify-center text-[12px]' ><span>{listCart?.length}</span></div>}
                        </div>
                        <div className='grow my-[10px] sm:mr-[10px]'>
                            <Toggle toggle={toggle} handleToggleChange={handleToggleChange} />
                        </div>
                        {!token ?
                            <div className='grow hidden sm:block'>
                                <button onClick={handleLogin} className='btn-auth sm:px-[10px]'>Sign In</button>
                            </div>
                            :
                            <div className='grow hidden sm:block ' >
                                <button onClick={handleLogout} className='btn-auth sm:px-[10px]'>Logout</button>
                            </div>
                        }
                        
                    </div>
                </div>
                <div className='overlay'>
                    {/* <div className={`nav-mobile ${isOpenOverlay ?'translate-x-[-100%]':'translate-x-[-100%]' }} `}> */}
                    <div className={`nav-mobile ${isOpenOverlay ? 'translate-x-[0%]' : 'translate-x-[-100%]'} `}>
                        <div className='close-mobile-menu-btn' onClick={handleCloseOverlay}>
                            <IoClose size={30} />
                        </div>
                        <div className={`nav-group-search mx-auto mt-[50px]`} >
                            <FaSearch className='nav-icon-search' />
                            <input onChange={handleSearch} />
                            {/* <div className='flex cursor-pointer my-[5px]' onClick={handleCart}>
                                <FaShoppingCart className='text-[25px] text-sky-900' />
                                {listCart?.length > 0 && <Badge bg="danger" style={{ display: 'flex', alignItems: 'center', width: '20px', height: '20px', borderRadius: '50%', justifyContent: 'center', lineHeight: '20px' }}>{listCart?.length}</Badge>}
                            </div> */}
                        </div>
                        <ul className='nav-mobile-items'>
                            <li>Trang chủ</li>
                            <li>Tài khoản</li>
                        </ul>
                        {!token ?
                            <div className='grow'>
                                <button onClick={handleLogin} className='btn-auth'>Sign In</button>
                            </div>
                            :
                            <div className='grow'>
                                <button onClick={handleLogout} className='btn-auth'>Logout</button>
                            </div>
                        }



                    </div>

                    <div className={`nav-overlay ${isOpenOverlay ? 'block' : 'hidden'}`} onClick={handleCloseOverlay} />

                </div>

            </nav>
        </>
    );
}

export default HeaderComponent;
