import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { RxAvatar } from "react-icons/rx";

export const SidebarDataAdmin = [
  {
    title: 'Quản lý người dùng',
    path: '',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav:[
      {
        title:'Người dùng',
        path:'/system/admin/user',
        icon:<AiIcons.AiFillHome />,
      }
    ]
  },
  {
    title: 'Thông tin tài khoản',
    path: '',
    icon: <RxAvatar/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav:[
      {
        title:'Tài khoản',
        path:'/user/info',
        icon:<RxAvatar/>,
      }
    ]
  },
  {
    title: 'Quản lý sách',
    path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav:[
      {
        title:'Sách',
        path:'/system/admin/book',
        icon:<IoIcons.IoIosPaper />,
      }
    ]
  },
  {
    title: 'Quản lý đơn hàng',
    path: '/system/admin/order',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    
  },

];
