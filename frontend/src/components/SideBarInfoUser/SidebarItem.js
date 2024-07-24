import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

const SidebarItem = ({ item, showSideBar }) => {
    return (
        <NavLink
            to={item.path}
            // key={index}
            className={({ isActive }) =>
                isActive ? 'bg-gray-500 text-white font-semibold flex items-center p-[10px]' : ' flex item-center p-[10px]'
            }
        >
            <span className={`pl-[5px] ${showSideBar ? 'mr-[10px]' : 'mr-0'}`}>{item.icon}</span>
            <span className={`${showSideBar ? '' : 'w-0 h-0 opacity-0'}`}>{item.title}</span>
        </NavLink>
    )
}

export default SidebarItem