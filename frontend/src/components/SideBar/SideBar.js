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

  return (
    <>
    {/* <div className={`bg-sky-900 p-[20px]  fixed w-[20%]  ${visible? 'top-0' :'top-[60px]'} bottom-[60px] overflow-auto`} > */}
    <div className={`bg-sky-900 p-[20px] fixed  w-[100%] text-white top-[60px] h-[100%] hidden sm:block sm:w-[230px]`} >
        
        <h5 className=' text-[20px] p-[10px]'>{titleSideBar}</h5>
        {listCategory.length > 0 && listCategory && listCategory?.map((item) => {
          return (
            <NavLink
              key={item.id}
              to={`/category/${item.code}`}
              style={{ textDecoration: 'none', display: 'block', padding: '10px', }}
              className={({ isActive }) =>
                [
                  isActive ? "text-white bg-secondary" : "text-dark pd-2",
                ].join(" ")
              }
            >
              {item.value}
            </NavLink>
          )

        })}
      </div>
    </>
  )
}

export default SideBar












