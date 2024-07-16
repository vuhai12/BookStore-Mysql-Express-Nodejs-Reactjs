import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetOrderByIdToolkit } from '../../redux/slides/orderSlice'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/esm/Table'

const UserOrder = () => {
  const orderById = useSelector((state) => state.order.listOrderById)
  const dispatch = useDispatch()
  console.log('orderById', orderById)
  useEffect(() => {
    dispatch(fetchGetOrderByIdToolkit())
  }, [])
  return (
    <>
     
      <table className='w-full'>
          <thead>
            <tr style={{ width: '100%' }}>
            <th className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600">
                <span>No</span>
              </th>
            
              <th className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600">
                Phương thức thanh toán</th>
              <th onClick={() => handleSort('title')} className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600">
                <span>Số lượng</span>
              </th>
              <th onClick={() => handleSort('available')} className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600">
                <span>Thanh toán</span>
              </th>
              <th onClick={() => handleSort('category_code')} className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600">
                <span>Giao hàng</span>
              </th>
              <th onClick={() => handleSort('price')} className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600">
                <span>Tổng giá</span>
              </th>
              <th onClick={() => handleSort('description')} className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600">
                <span>Ngày mua</span>
              </th>
              {/* <th colSpan={3} className='text-center'>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orderById && orderById.length > 0 && orderById.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <td className='px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]'>{idx+1}</td>
                  <td className='px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]'>{item.paymentMethod}</td>
                  <td className='px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]'>{+item.qua}</td>
                  <td className='px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]'>{item.isPaid == false ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                  <td className='px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]'>{item.isDelivered == false ? 'Chưa giao hàng' : 'Đã giao hàng'}</td>
                  <td>{item.totalPrices.toLocaleString()} VND</td>
                  <td className='px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]'>{item.createdAt}</td>
                  {/* <td>
                                <ButtonComponent
                                    onClick={() => handleStartEdittingPostBook(item)}
                                    textButton='EDIT'
                                    styleButton={{ padding: '10px', background: 'green' }}
                                    styleTextButton={{ color: 'white' }}
                                />
                            </td>
                            <td>
                                <ButtonComponent
                                    onClick={() => handleDeleteBook(item.id)}
                                    textButton='DELETE'
                                    styleButton={{ padding: '10px', background: 'red' }}
                                    styleTextButton={{ color: 'white' }}
                                />
                            </td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* {isShowAddModel &&
            <Popup
                isShow={isShowAddModel}
                options={optionsAddPopup}
                onAction={handleAdd}
                onCancel={handleCancelAdd}
                actionText={'Save'}
                subActionText={'Close'}
            />
        }

        {isShowEditModel &&
            <Popup
                isShow={isShowEditModel}
                options={optionsEditPopup}
                onAction={handleEdit}
                onCancel={handleCancelEdit}
                actionText={'Save'}
                subActionText={'Close'}
            />
        } */}

    </>
  )
}

export default UserOrder