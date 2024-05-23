import React, { useEffect } from 'react';
import { fetchGetListCategoryToolkit } from '../../redux/slides/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'


const SideBar = ({ listCategory, titleSideBar }) => {

  return (
    <>
      <div className='bg-white p-3' style={{ borderRadius: '5px', }}>
        <p style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '700', lineHeight: '150%' }}>{titleSideBar}</p>
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












