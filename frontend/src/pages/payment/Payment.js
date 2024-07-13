import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { blobToBase64 } from '../../ultils/blobToBase64';
// import Paypal from '../../components/paypal';
import { PayPalButton } from "react-paypal-button-v2";
import { fetchGetBookInCartChecked, fetchGetCartToolkit, removeItemCarts } from '../../redux/slides/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreatNewOrderToolkit, fetchCreateOrderToolkit } from '../../redux/slides/orderSlice';
import { fetchGetProfileUserToolkit } from '../../redux/slides/profileUserSlice';
import { fetchGetUserByIdToolkit } from '../../redux/slides/userSlice';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(1)
  const [methodPayment, setMethodPayment] = useState("Giao hàng trực tiếp")

  const listBookInCartChecked = useSelector((state) => state.cart.listBookInCartChecked)
  const address = useSelector((state) => state.user.userData.address)

  const listPriceCheckedInCart = listBookInCartChecked?.map((item) => {
    return item.books.price * item.books.quantity
  })



  const totalPriceCheckedInCart = listPriceCheckedInCart?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)




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

  useEffect(() => {
    dispatch(fetchGetProfileUserToolkit())
    dispatch(fetchGetBookInCartChecked())
    dispatch(fetchGetUserByIdToolkit())
  }, [])

  const handleOrder = () => {
    dispatch(fetchCreateOrderToolkit({
      listBookInCartChecked,
      address,
      methodPayment
    })).then(() => {
      alert('đặt hàng thành công')
      dispatch(fetchGetBookInCartChecked())
      dispatch(fetchGetCartToolkit())

    })
  }

  return (
    <>
      <div className='mt-[60px] p-[10px]'>
        <h3>Thanh toán</h3>
        {(listBookInCartChecked && listBookInCartChecked.length > 0) ?
          <div >
            <div className='overflow-auto my-[10px]'>
              <table className='w-[600px] sm:w-full'>
                <thead>
                  <tr>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Sản phẩm</th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Số lượng</th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Đơn giá</th>
                    <th className="p-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {listBookInCartChecked?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        {/* <td><img style={{ width: '50px', height: '50px' }} src={blobToBase64(item.image)}></img></td> */}
                        <td><img style={{ width: '50px', height: '50px' }} src={(item.books.image)}></img></td>
                        <th>x {item.books.quantity}</th>
                        <th>{item.books.price?.toLocaleString()} vnđ</th>
                        <th>{(+item.books.price * +item.books.quantity)?.toLocaleString()} vnđ</th>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <h3 className='font-bold'>Hình thức thanh toán</h3>
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
                        setMethodPayment(item.name)
                      }}
                      id={item.name}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                </div>
              )
            })}


            <div>
              <p><span className='font-bold'>Giao tới:</span> <span>{address ? address : ''}</span></p>
              <p><span className='font-bold'>Tạm tính: </span> <span>{totalPriceCheckedInCart.toLocaleString()} VNĐ</span></p>
              <p><span className='font-bold'>Tổng tiền: </span> <span>{totalPriceCheckedInCart.toLocaleString()} VNĐ</span></p>

            </div>
            <div>
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
                </div> : <button className='bg-red-500 text-white p-[10px] rounded-[5px] mt-[10px]' onClick={handleOrder}>Đặt hàng</button>
              }
            </div>
          </div>
          : <>Không có đơn hàng</>
        }

      </div>
    </>
  )
}

export default Payment