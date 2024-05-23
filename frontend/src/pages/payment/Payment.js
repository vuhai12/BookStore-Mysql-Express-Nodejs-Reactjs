import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { blobToBase64 } from '../../ultils/blobToBase64';
// import Paypal from '../../components/paypal';
import { PayPalButton } from "react-paypal-button-v2";
import { removeItemCarts } from '../../redux/slides/cartSlice';
import { useDispatch } from 'react-redux';
import { fetchCreatNewOrderToolkit } from '../../redux/slides/orderSlice';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
console.log('location',location)
  const payments = [
    {
      id: 1,
      name: 'Giao hàng trực tiếp',
      value: 'COD'
    },
    {
      id: 2,
      name: 'Thanh toán qua paypal',
      value: 'PAYPAL'
    }
  ]

  const [isChecked, setIsChecked] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('Giao hàng trực tiếp')
  const [address, setAddress] = useState('')
  const handleOrder = () => {
    if (address != '') {
      dispatch(fetchCreatNewOrderToolkit({
        quantity: location.state.cartToTalBook,
        total: location.state.totalPrice,
        paymentMethod,
        isDelivered: "0",
        isPaid: "0",
        carts: location.state.cartsChecked
      }))
      .then(() => {
        dispatch(removeItemCarts())
        navigate('/order-success', {
          state: {
            totalPrice: location.state.totalPrice,
            cartToTalBook: location.state.cartToTalBook,
            paymentMethod,
            cartsChecked: location.state.cartsChecked,
            address,
          }
        })
      }).catch((e) => {
        console.log(e)
      })
    } else {
alert('nhap dia chi')
    }
  }
  const handleAdress = (e) => {
    setAddress(e.target.value)
  }

  return (
    <>
      <Container>
        <h3>Thanh toán</h3>
        <Row>
          <Col lg={9}>
            <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {location.state.cartsChecked?.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      {/* <td><img style={{ width: '50px', height: '50px' }} src={blobToBase64(item.image)}></img></td> */}
                      <td><img style={{ width: '50px', height: '50px' }} src={(item.image)}></img></td>
                      <th>{item.price.toLocaleString()} vnđ</th>
                      <th>x {item.quantity}</th>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <h3>Hình thức thanh toán</h3>
            {payments.map((item) => {
              return (
                <div key={item.id}>
                  <div>
                    <input
                      type='radio'
                      checked={isChecked == item.id}
                      style={{ marginRight: '10px' }}
                      onChange={() => {
                        setIsChecked(item.id)
                        setPaymentMethod(item.name)
                      }}
                      id={item.name}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                </div>
              )
            })}
          </Col>
          <Col lg={3}>
            <div>
              <p>Địa chỉ</p>
              <input
                style={{ width: '100%', borderRadius: '5px', border: 'none', height: '35px', padding: '10px', marginBottom: '10px' }}
                placeholder='Nhap dia chi giao hang'
                onChange={(e) => handleAdress(e)}
              />
            </div>
            <div>
              <p>Tổng tiền</p>
              <h3>{location.state.totalPrice.toLocaleString()} vnđ</h3>
              {isChecked == 2 ?
                <div style={{ width: '100%', marginTop: '10px' }}>
                  <PayPalButton
                    amount="0.01"
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                      alert("Transaction completed by " + details.payer.name.given_name);

                      // OPTIONAL: Call your server to save the transaction
                      return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                          orderID: data.orderID
                        })
                      });
                    }}
                  />
                </div> : <Button style={{ width: '100%' }} variant='danger' onClick={handleOrder}>Đặt hàng</Button>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Payment