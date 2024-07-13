import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetOrdersToolkit } from '../../redux/slides/orderSlice';

const AminOrder = () => {

    const listOrders = useSelector((state) => state.order.listOrders)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetOrdersToolkit())
    }, [])
    return (
        <>
            <div className='overflow-auto mt-[60px] p-[10px]'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">
                                <span>No</span>
                            </th>
                            <th className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">
                                <span>UserId</span>
                            </th>
                            <th className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">Phương thức thanh toán</th>
                            <th onClick={() => handleSort('title')} className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">
                                <span>Số lượng</span>
                            </th>
                            <th onClick={() => handleSort('available')} className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">
                                <span>Thanh toán</span>
                            </th>
                            <th className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  " onClick={() => handleSort('category_code')}>
                                <span>Giao hàng</span>
                            </th>
                            <th className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  " onClick={() => handleSort('price')}>
                                <span>Tổng giá</span>
                            </th>
                            <th className="px-[5px] border-x-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  " onClick={() => handleSort('description')}>
                                <span>Ngày mua</span>
                            </th>
                            {/* <th colSpan={3} className='text-center'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {listOrders.orderData && listOrders.orderData.length > 0 && listOrders.orderData.map((item, idx) => {
                            return (
                                <tr key={item.id}>
                                    <td className="px-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{item.id}</td>
                                    <td className="px-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]"> {item.userId}</td>
                                    <td className="px-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{item.paymentMethod}</td>
                                    <td className="px-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{item.quantity}</td>
                                    <td className="px-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{item.isPaid == false ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                    <td className="px-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{item.isDelivered == false ? 'Chưa giao hàng' : 'Đã giao hàng'}</td>
                                    {/* <td>{item.total.toLocaleString()} VND</td> */}
                                    <td className="px-[5px] border-x-[1px]  border-gray-200 bg-white text-[12px]">{item.createdAt}</td>
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
            </div>
        </>
    )
}

export default AminOrder