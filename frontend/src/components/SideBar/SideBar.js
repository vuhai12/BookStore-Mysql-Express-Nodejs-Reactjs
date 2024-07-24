import React, { useEffect, useState } from 'react';
import { fetchGetListCategoryToolkit } from '../../redux/slides/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'


const SideBar = ({ listCategory, titleSideBar }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 60) {
      setVisible(true)
    }
    else if (scrolled <= 60) {
      setVisible(false)
    }
  };

  window.addEventListener('scroll', toggleVisible);
  const [active, setactive] = useState()
  const navigate = (id) => {
    setactive(id)
  }

  return (
    <>
      {/* <div className={`bg-sky-900 p-[20px]  fixed w-[20%]  ${visible? 'top-0' :'top-[60px]'} bottom-[60px] overflow-auto`} > */}
      <div className={`bg-sky-900 fixed  w-[100%] text-white top-[60px] h-[100%] hidden sm:block sm:w-[230px]`} >

        <h5 className=' text-[25px] px-[15px] py-[10px] font-bold'>{titleSideBar}</h5>
        {listCategory.length > 0 && listCategory && listCategory?.map((item) => {
          return (
            <NavLink
              key={item.id}
              className={({ isActive }) =>
                isActive ? 'text-blue-950 font-semibold bg-gray-300 block p-[15px]' : 'text-white block p-[15px]'
              }
              to={`/category/${item.code}`}
            >
              {item.value}
            </NavLink>
            // <a className={`block p-[15px]  ${active == item.id ? 'text-blue-950 font-semibold bg-gray-300 ' : 'text-white'}`} onClick={() => navigate(item.id)} >{item.value}</a>

          )

        })}
      </div>
    </>
  )
}

export default SideBar












