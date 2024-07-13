import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SelectQuantity from '../../components/SelectQuantity/SelectQuantity';
// import { blobToBase64 } from '../../ultils/blobToBase64';
import { GoTrash } from "react-icons/go";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {
  fetchGetCartToolkit,
  fetchDeleteBookInCartToolkit,
  fetchCheckedBookCartToolkit,
  fetchCheckedAllBookCartToolkit,
  fetchDeleteAllBookCartToolkit,
  fetchIncrementQuantityBookInCart,
  fetchDecrementQuantityBookInCart
} from '../../redux/slides/cartSlice'
import Cart from '../../assets/pngwing.png'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { fetchGetProfileUserToolkit } from '../../redux/slides/profileUserSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchGetUserByIdToolkit } from '../../redux/slides/userSlice';

const CartDetail = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const token = localStorage.getItem('access_token')

  const [show, setShow] = useState(false);

  const listCart = useSelector((state) => state.cart.listCart)
  // const address = useSelector((state) => state.profileUser.address)
  const address = useSelector((state) => state.user.userData.address)
  console.log('address', address)
  let isCheckedOrder = listCart?.some((item) => item.books.cartBooks.isChecked == 1)
  let isCheckedAll = listCart?.every((item) => item.books.cartBooks.isChecked == 1)
  let listCartBookId = listCart?.map((item) => item.books.id)

  useEffect(() => {
    dispatch(fetchGetProfileUserToolkit())
    dispatch(fetchGetCartToolkit())
    dispatch(fetchGetUserByIdToolkit())
  }, [])



  const handleClose = () => setShow(false);

  const handleChangeQuantity = useCallback((item, flag) => {
    if (flag == 'minus' && item.books.quantity == 1) return
    if (flag == 'plus' && item.books.quantity > item.books.available) return
    if (flag == 'minus') {
      dispatch(fetchDecrementQuantityBookInCart({ bookId: item.books.id, quantity: +item.books.quantity - 1 })).then(() => {
        dispatch(fetchGetCartToolkit())
      })
    }
    if (flag == 'plus') {
      dispatch(fetchIncrementQuantityBookInCart({ bookId: item.books.id, quantity: +item.books.quantity + 1 })).then(() => {
        dispatch(fetchGetCartToolkit())
      })
    }
  }, [])

  const handleCheckBox = (itemBook) => {
    dispatch(fetchCheckedBookCartToolkit({ cartBookId: itemBook.books.id, isChecked: !itemBook.books.cartBooks.isChecked })).then(() => {
      dispatch(fetchGetCartToolkit())
    })
  }

  const handleSelectAll = () => {
    dispatch(fetchCheckedAllBookCartToolkit({ isChecked: !isCheckedAll, listCartBookId })).then(() => {
      dispatch(fetchGetCartToolkit())
    })
  }

  const handleOrder = () => {
    if (!isCheckedOrder) {
      // setShow(true)
      alert('ban chua chon san pham de mua!')
    } else {
      navigate('/checkout/payment')
    }
  }

  const handleDeleteItemChecked = (item) => {
    if (item.books.cartBooks.isChecked == 1) {
      dispatch(fetchDeleteBookInCartToolkit(item.books.id)).then((result) => {
        alert('bạn có muốn xóa sản phẩm')
        if (result.payload.error == 0) {
          dispatch(fetchGetCartToolkit())
        }
      })
    } else {
      alert('chưa chọn sản phẩm để xóa')
    }
  }
  const handleDeleteAllItemChecked = () => {
    if (isCheckedOrder) {
      dispatch(fetchDeleteAllBookCartToolkit()).then((result) => {
        alert('bạn có muốn xóa sản phẩm')
        if (result.payload.error == 0) {
          dispatch(fetchGetCartToolkit())
        }
      })
    } else {
      alert('chưa chọn sản phẩm để xóa')
    }
  }

  const handleEditAddress = () => {
    if (token) {
      navigate('/user/info')
    }
  }
  return (
    <>
      <div className='mt-[60px] p-[20px]'>
        <h3>Giỏ hàng</h3>
        {listCart?.length > 0 ?
          <div className='flex flex-col my-[30px]' >
            <div className='overflow-auto '>
              <table className='w-[600px] sm:w-[100%]'>
                <thead>
                  <tr>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  "><input type="checkbox" checked={isCheckedAll} onChange={handleSelectAll} /></th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Sản phẩm</th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Đơn giá</th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Số lượng</th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Thành tiền</th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  " onClick={handleDeleteAllItemChecked}><GoTrash /></th>
                  </tr>
                </thead>
                <tbody>
                  {listCart && listCart?.length > 0 && listCart?.map((item, idx) => {
                    return (
                      <tr key={`user${idx}`}>
                        <td className="p-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">
                          <input
                            type="checkbox"
                            onChange={() => {
                              handleCheckBox(item)
                            }}
                            checked={item.books.cartBooks.isChecked}
                          />
                        </td>
                        {/* <td><img style={{ width: '50px', height: '50px' }} src={blobToBase64(item.image)}></img></td> */}
                        <td className="p-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]"><img style={{ width: '50px', height: '50px' }} src={(item.books.image)}></img></td>
                        <td className="p-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{item.books.price.toLocaleString()} vnđ</td>
                        <td className="p-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">
                          <SelectQuantity
                            quantity={item.books.quantity}
                            handleChangeQuantity={(flag) => handleChangeQuantity(item, flag)}
                          />
                        </td>
                        <td className="p-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{(+item.books.price * item.books.quantity).toLocaleString()} vnđ</td>
                        <td className="p-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]" onClick={() => handleDeleteItemChecked(item)}><GoTrash /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className='mt-[10px]'>
              <h5>Giao tới: {address ? address : ''} </h5>
              <p style={{ color: 'blue', cursor: 'pointer' }} onClick={handleEditAddress}>Chỉnh sửa</p>
              <button className='bg-red-500 text-white p-[10px] rounded-[5px]'  onClick={handleOrder}>Mua hàng</button>
            </div>
          </div> :
          <div className='text-center flex items-center flex-col mt-[10px]' >
            <img src={Cart} className='w-[30%] sm:w-[10%]' />
            <h3 className='my-[10px]'>giỏ hàng trống</h3>
            <button
              onClick={() => navigate('/')}
             className='bg-slate-700 text-white p-[10px] rounded-[5px] mt-[10px]'
            >Mua sắm ngay</button>
          </div>
        }
      </div>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Body>Bạn chưa chọn sản phẩm để mua!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ok đã hiểu
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export default CartDetail