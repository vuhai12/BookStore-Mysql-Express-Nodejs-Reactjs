import React, { useState } from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import { AiFillHome } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { IoClose, IoPerson } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { SidebarDataUser } from '../SideBarInfoUser/SidebarDataUser';
import { SidebarDataAdmin } from '../SideBarInfoUser/SidebarDataAdmin';



const DefaultComponent = ({ children }) => {
  const navigate = useNavigate()
  const [showListBook, setShowListBook] = useState(false)
  const [showDetailPerson, setShowDetailPerson] = useState(false)
  const listCategory = useSelector((state) => state.user.listCategory)
  const token = localStorage.getItem('access_token')
  const roleCode = () => {
    if (token) {
      const { role_code } = jwtDecode(token)
      console.log('role_code', role_code)
      return role_code
    }
  }

  const sidebarData = roleCode() == 'R2' ? SidebarDataUser : SidebarDataAdmin
  const handleHome = () => {
    navigate('/')
    setShowListBook(false)
    setShowDetailPerson(false)
  }

  const handleOpenDetailPerson = () => {
    setShowDetailPerson(true)
    setShowListBook(false)
  }
  const handleCloseDetailPerson = () => {
    setShowDetailPerson(false)
  }
  const handleOpenListBook = () => {
    setShowListBook(true)
    setShowDetailPerson(false)
  }
  const handleCloseListBook = () => {
    setShowListBook(false)
  }
  const handleDirect = () => {
    setShowListBook(false)
  }



  return (
    <div className='h-[100%] relative flex flex-col'>
      <HeaderComponent />
      {/* <div className=' h-[100%] relative'> */}
      {children}
      <footer className='bg-gray-200  p-[15px] flex items-center justify-center  w-[100%] mt-auto z-30'>
        <p>coppy right@ 20024</p>
      </footer>
      {/* </div> */}
      <div className={`${showDetailPerson ? 'block' : 'hidden'} fixed top-0 bottom-0 right-0 left-0 bg-gray-200 flex flex-col items-center`}>
        <div className='w-full text-right px-[30px] py-[20px]' onClick={handleCloseDetailPerson}>
          <IoClose size={30} />
        </div>
        {sidebarData.map((item, id) => {
          return (
            <>
              <NavLink
                key={id}
                // onClick={handlePersonDetail}
                to={item.path}
                className='text-black p-[30px] hover:bg-gray-600 w-full hover:text-white '
              >
                {item.title}
              </NavLink>
            </>
          )
        })}
      </div>
      <div className={`${showListBook ? 'block' : 'hidden'} list-book fixed top-0 bottom-0 right-0 left-0 bg-gray-200 flex flex-col`}>
        <div className='w-full text-right px-[30px] py-[20px]' onClick={handleCloseListBook}>
          <IoClose size={30} />
        </div>
        {listCategory.map((item) => {
          return (
            // <p className='text-black p-[30px] hover:bg-gray-600 w-full hover:text-white '>{item.value}</p>
            <NavLink
              key={item.id}
              onClick={handleDirect}
              to={`/category/${item.code}`}
              className='text-black p-[30px] hover:bg-gray-600 w-full hover:text-white '
            >
              {item.value}
            </NavLink>
          )
        }

        )}
      </div>
      <div className='bottom-navigator flex fixed bottom-0 w-full h-[60px] items-center bg-gray-50 sm:hidden'>
        <div className='bottom-navigator-items grow text-center flex flex-col items-center' onClick={handleHome}>
          <AiFillHome />
          <p>Trang chủ</p>
        </div>
        <div className='bottom-navigator-items grow text-center flex flex-col items-center' onClick={handleOpenListBook}>
          <FaThList />
          <p>Danh mục</p>
        </div>
        <div className='bottom-navigator-items grow text-center flex flex-col items-center' onClick={handleOpenDetailPerson}>
          <IoPerson />
          <p>Cá nhân</p>
        </div>

      </div>
    </div>
  )
}

export default DefaultComponent