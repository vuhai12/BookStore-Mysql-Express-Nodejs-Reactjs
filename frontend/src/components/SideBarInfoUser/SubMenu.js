import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './SubMenu.css'
import { useSelector } from 'react-redux';


const SubMenu = ({ item,showSideBar }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const isOpenSideBarMenu = useSelector((state) => state.user.isOpenSideBarMenu)
  const [showSubNav, setShowSubNav] = useState(false)
  const handleShowSubNav = () => {
    setShowSubNav(!showSubNav)
  }

  return (
    <>
     
        <Link to={item.path} className={`flex  items-center h-[25px] my-[25px] justify-between`} onClick={item.subNav && handleShowSubNav}>
          <span className='flex items-center'><span className={`pl-[5px] mr-[10px]`}>{item.icon}</span> <span className={`${showSideBar ? '' : 'w-0 h-0 hidden'}`}>{item.title}</span></span>
          <span className={`${showSideBar ? '' : 'w-0 h-0 opacity-0'}`}>{item.subNav ? (showSubNav ? item.iconOpened : item.iconClosed) : ''}</span>

        </Link>
        {showSubNav &&

          item.subNav.map((item, index) => {
            return (
              <Link to={item.path} key={index} className={`h-[25px] my-[25px] flex items-center ${showSideBar?'ml-[30px]':'ml-0 justify-center'}`}>
                <span className={`${showSideBar ?'mr-[10px]':'mr-0'}`}>{item.icon}</span>
                 <span className={`${showSideBar ? '':'w-0 h-0 opacity-0'}`}>{item.title}</span>
              </Link>
            )
          })
        }

     
    </>
  );
};

export default SubMenu;
