import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { RxAvatar } from "react-icons/rx";

export const SidebarDataAdmin = [
  {
    id: 1,
    title: 'Quản lý người dùng',
    path: '/system/admin/user',
    state: 'user',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        id: 1,
        title: 'Người dùng',
        path: '/system/admin/user',
        // icon:<AiIcons.AiFillHome />,
      }
    ]
  },
  {
    id: 2,
    title: 'Thông tin tài khoản',
    path: '/admin/info',
    state: 'info',
    icon: <RxAvatar />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        id: 1,
        title: 'Tài khoản',
        path: '/admin/info',
        // icon:<RxAvatar/>,
      }
    ]
  },
  {
    id: 3,
    title: 'Quản lý sách',
    path: '/system/admin/book',
    state: 'book',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        id: 1,
        title: 'Sách',
        path: '/system/admin/book',
        // icon:<IoIcons.IoIosPaper />,
      }
    ]
  },
  {
    id: 4,
    title: 'Quản lý đơn hàng',
    path: '/system/admin/order',
    state: 'order',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },

];
