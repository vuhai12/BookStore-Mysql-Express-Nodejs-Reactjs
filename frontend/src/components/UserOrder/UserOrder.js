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
      <Container>
        <Table striped bordered hover className='mt-3'>
          <thead>
            <tr style={{ width: '100%' }}>
              <th style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>No</span>
              </th>
              <th >
                <span>UserId</span>
              </th>
              <th>Phương thức thanh toán</th>
              <th onClick={() => handleSort('title')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '10%' }}>
                <span>Số lượng</span>
              </th>
              <th onClick={() => handleSort('available')}>
                <span>Thanh toán</span>
              </th>
              <th onClick={() => handleSort('category_code')}>
                <span>Giao hàng</span>
              </th>
              <th onClick={() => handleSort('price')}>
                <span>Tổng giá</span>
              </th>
              <th onClick={() => handleSort('description')}>
                <span>Ngày mua</span>
              </th>
              {/* <th colSpan={3} className='text-center'>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orderById && orderById.length > 0 && orderById.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userId}</td>
                  <td>{item.paymentMethod}</td>
                  <td>{item.quantity}</td>
                  <td>{item.isPaid == false ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                  <td>{item.isDelivered == false ? 'Chưa giao hàng' : 'Đã giao hàng'}</td>
                  {/* <td>{item.total.toLocaleString()} VND</td> */}
                  <td>{item.createdAt}</td>
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
        </Table>
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
      </Container>
    </>
  )
}

export default UserOrder