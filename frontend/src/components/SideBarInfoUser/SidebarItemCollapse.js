import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import './SubMenu.css'
import { createBrowserHistory } from "history";


const SidebarItemCollapse = ({ item, showSideBar, key }) => {
  const path = createBrowserHistory().location.pathname
  const [showSubNav, setShowSubNav] = useState(false)
  const handleShowSubNav = () => {
    setShowSubNav(!showSubNav)
  }
  useEffect(()=>{
    if(path.includes(item.state)){
      setShowSubNav(true)
    }
    if(!showSideBar){
      setShowSubNav(false)
    }
  },[path,showSideBar])
  return (
    <>
      <button
        key={key}
        className='flex p-[10px] justify-between flex-row w-full'
        onClick={item.subNav && handleShowSubNav}
      >
        <span className='flex items-center'><span className={`pl-[5px] mr-[10px]`}>{item.icon}</span> <span className={`${showSideBar ? '' : 'w-0 h-0 hidden'}`}>{item.title}</span></span>
        <span className={`${showSideBar ? '' : 'w-0 h-0 opacity-0'}`}>{item.subNav ? (showSubNav ? item.iconOpened : item.iconClosed) : ''}</span>
      </button>
      {showSubNav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              // key={index}
              className={({ isActive }) =>
                isActive ? 'bg-gray-500 text-white font-semibold flex item-center p-[10px]' : ' flex item-center p-[10px]'
              }
            >
              {/* <span className={`pl-[5px] ${showSideBar ? 'mr-[10px]' : 'mr-0'}`}>{item.icon}</span> */}
              <span className={`${showSideBar ? 'ml-[30px]' : 'w-0 h-0 opacity-0'}`}>{item.title}</span>
            </NavLink>
          )
        })
      }
    </>
  );
};

export default SidebarItemCollapse;
