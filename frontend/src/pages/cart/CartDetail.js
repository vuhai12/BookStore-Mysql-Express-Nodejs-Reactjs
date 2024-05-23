import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import { fetchGetBookByIdToolkit } from '../../redux/slides/userSlice';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SelectQuantity from '../../components/SelectQuantity/SelectQuantity';
import { blobToBase64 } from '../../ultils/blobToBase64';
import { GoTrash } from "react-icons/go";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {
  addToCart,
  decrementItem,
  incrementItem,
  checkedItem,
  getTotalPrice,
  checkedAllItem,
  getCartsChecked,
  removeItemCheckedCarts,
  removeAllItemCheckedCarts
} from '../../redux/slides/cartSlice'
import Cart from '../../assets/pngwing.png'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const CartDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const listCart = useSelector((state) => state.cart.carts)
  const totalPrice = useSelector((state) => state.cart.totalPrice)
  const cartToTalBook = useSelector((state) => state.cart.cartToTalBook)
  const quantity = useSelector((state) => state.cart.quantity)
  const isCheckedAll = useSelector((state) => state.cart.isCheckedAll)
  const cartsChecked = useSelector((state) => state.cart.cartsChecked)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getTotalPrice())
  }, [listCart])

  const handleChangeQuantity = useCallback((item, flag) => {
    if (flag == 'minus' && item.quantity == 1) return
    if (flag == 'minus') {
      dispatch(decrementItem({ bookId: item.bookId, quantity: item.quantity, price: item.price }))
    }
    if (flag == 'plus') {
      dispatch(incrementItem({ bookId: item.bookId, quantity: item.quantity, price: item.price }))
    }
  }, [])

  // const arrAllIdBook = listCart?.map((item) => item.bookId)
  
  // const [listCart[0],...arrAllIdBook]=listCart
  // const [a,...arrAllIdBook] = listCart
  const arrAllIdBook = listCart?.map((item) => item.bookId)

  const handleCheckBox = (price, itemBook) => {
    dispatch(checkedItem({ price, bookId: itemBook.bookId }))
  }

  const handleSelectAll = () => {
    dispatch(checkedAllItem({ isCheckedAll: !isCheckedAll, arrAllIdBook }))
  }

  const handleOrder = () => {
    if (totalPrice == 0) {
      setShow(true)
    } else {
      dispatch(getCartsChecked())

      console.log('cartsChecked',cartsChecked)
      console.log('cartToTalBook',cartToTalBook)
      navigate('/checkout/payment', {
        state: {
          cartsChecked,
          totalPrice,
          cartToTalBook
        }
      })
    }
  }

  const handleDeleteItemChecked = (bookId) => {
    dispatch(removeItemCheckedCarts(bookId))
  }

  const handleDeleteAllItemChecked = () => {
    dispatch(removeAllItemCheckedCarts())
  }

  console.log('arrAllIdBook',arrAllIdBook)
  console.log('listCart',listCart)
  console.log('list cart',listCart)


  return (
    <>
      <Container>
        {listCart.length > 0 ?
          <Row>
            <h3>Giỏ hàng</h3>
            <Col lg={9}>
              <Table striped bordered hover className='mt-3'>
                <thead>
                  <tr>
                    <th><input type="checkbox" checked={isCheckedAll} onChange={handleSelectAll} /></th>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th onClick={handleDeleteAllItemChecked}><GoTrash /></th>
                  </tr>
                </thead>
                <tbody>
                  {listCart && listCart.length > 0 && listCart?.map((item, idx) => {
                    return (
                      <tr key={`user${idx}`}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() => {
                              handleCheckBox(+item.price, item)

                            }}
                            checked={item.isChecked}
                          />
                        </td>
                        {/* <td><img style={{ width: '50px', height: '50px' }} src={blobToBase64(item.image)}></img></td> */}
                        <td><img style={{ width: '50px', height: '50px' }} src={(item.image)}></img></td>
                        <td>{item.price.toLocaleString()} vnđ</td>
                        <td>
                          <SelectQuantity
                            quantity={item.quantity}
                            handleChangeQuantity={(flag) => handleChangeQuantity(item, flag)}
                          />
                        </td>
                        <td>{(+item.price * item.quantity).toLocaleString()} vnđ</td>
                        <td onClick={() => handleDeleteItemChecked(item.bookId)}><GoTrash /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
            <Col lg={3}>
              <div>
                <p>Giao tới:</p>
                <p>Tổng tiền:</p>
                <h3>{totalPrice.toLocaleString()} vnđ</h3>
                <Button variant='danger' onClick={handleOrder}>Mua hàng</Button>
              </div>
            </Col>
          </Row> :
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <img src={Cart} style={{ width: '20%' }} />
            <h3>giỏ hàng trống</h3>
            <ButtonComponent
              onClick={() => navigate('/')}
              styleButton={{ background: '#e54532', padding: '15px' }}
              textButton='Mua sắm ngay'
              styleTextButton={{ color: '#fff' }}
            />
          </div>
        }

      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Bạn chưa chọn sản phẩm để mua!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ok đã hiểu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CartDetail