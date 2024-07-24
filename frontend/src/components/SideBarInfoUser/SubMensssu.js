import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import './SubMenu.css'
import { useSelector } from 'react-redux';


const SubMenu = ({ showSideBar }) => {

  const [item, setItem] = useState(false)
  const handleTest = () => {
    setItem(!item)
  }
  return (
    <>

      <NavLink to='/user/info' className='block' onClick={handleTest}>{showSideBar ? 'xbsh' : 'bxshbxhs'}</NavLink>
      {item && <NavLink to='/user/info'>bhbhhbhbhbh</NavLink>}

    </>
  );
};

export default SubMenu;
