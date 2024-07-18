import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SubMenu from './SubMenu';
import './Sidebar.css'
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { SidebarDataUser } from './SidebarDataUser';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import { FaBars } from 'react-icons/fa6';

const Sidebar = ({ children }) => {
  const isOpenSideBarMenu = useSelector((state) => state.user.isOpenSideBarMenu)
  const token = localStorage.getItem('access_token')
  const roleCode = () => {
    if (token) {
      const { role_code } = jwtDecode(token)
      return role_code
    }
  }

  const sidebarData = roleCode() == 'R2' ? SidebarDataUser : SidebarDataAdmin

  const [showSideBar, setShowSideBar] = useState(true)

  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  return (
    <>
      <div className='flex sm:h-full' >
        {/* <nav className={`sidebar ${isOpenSideBarMenu ? "inactive" : ""} hidden`}  >
          <div className='sidebar-wrap'>
            {sidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </nav> */}
        <div className={`sm:flex sm:bg-gray-300 sm:flex-col sm:text-black sm:p-[10px] sm:fixed sm:top-0 sm:bottom-0 sm:left-0 ${showSideBar ? 'sm:w-[220px]' : 'sm:w-[50px]'} hidden`}>
          <div onClick={handleShowSideBar}>
            <FaBars size={30} />
          </div>
          <div>
            {sidebarData.map((item, index) => {
              return (
                <SubMenu item={item} key={index} showSideBar={showSideBar}/>
              )
              // return <SubMenu item={item} key={index} />;
            })}
          </div>
        </div>
        <div className={`w-full mb-[10px] sm:mt-[50px] sm:p-[20px]  ${showSideBar ? 'sm:ml-[220px]' : 'sm:ml-[50px]'} `}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
