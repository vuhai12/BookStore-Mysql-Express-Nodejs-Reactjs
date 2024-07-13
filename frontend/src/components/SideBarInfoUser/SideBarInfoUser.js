// import React, { useEffect, useState } from 'react'
// import Col from 'react-bootstrap/esm/Col'
// // import Container from 'react-bootstrap/esm/Container'
// import Row from 'react-bootstrap/esm/Row'
// import { Link, NavLink } from 'react-router-dom'
// // import './SideBarInfoUser.css'
// import Container from 'react-bootstrap/esm/Container'
// import { SidebarNav, SidebarWrap, SidebarLink, SidebarLabel, DropdownLink } from './style'


// const menuItems = [
//   {
//     name: "Dashboard",
//     exact: true,
//     to: "/",
//     // iconClassName: "bi bi-speedometer2",
//   },
//   {
//     name: "Thông tin tài khoản",
//     exact: true,
//     to: `/user/info`,
//     // iconClassName: "bi bi-speedometer2",
//     subMenus: [
//       { name: "Quản lý đơn hàng", to: "/user/order" },
//       { name: "Sổ địa chỉ", to: "/user/address" },
//     ],
//   },
//   // { name: "Design", to: `/design`, iconClassName: "bi bi-vector-pen" },
//   // {
//   //   name: "Content 2",
//   //   exact: true,
//   //   to: `/content-2`,
//   //   iconClassName: "bi bi-speedometer2",
//   //   subMenus: [
//   //     { name: "Courses", to: "/content-2/courses" },
//   //     { name: "Videos", to: "/content-2/videos" },
//   //   ],
//   // },

// ];

// const SideBarInfoUser = ({ children }) => {

//   return (
//     <Container>
//       <Row >
//         <Col lg={2} >
//           <SidebarNav>
//             <SidebarWrap>
//               <div className="main-menu">
//                 <ul>
//                   {menuItems.map((menuItem, index) => (
//                     <li >
//                       <SidebarLink
//                         exact
//                         to={menuItem.to}
//                       >
//                         <SidebarLabel>{menuItem.name}</SidebarLabel>

//                       </SidebarLink>
//                       {menuItem.subMenus && menuItem.subMenus.length > 0 ? (
//                         <>
//                           {menuItem.subMenus.map((menu, index) => (
//                             <DropdownLink to={menu.to} key={index}>
//                               <SidebarLabel>{menu.name}</SidebarLabel>
//                             </DropdownLink>
//                           ))}
//                         </>
//                       ) : null}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </SidebarWrap>
//           </SidebarNav>
//         </Col>
//         <Col lg={10} >
//           {children}
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default SideBarInfoUser