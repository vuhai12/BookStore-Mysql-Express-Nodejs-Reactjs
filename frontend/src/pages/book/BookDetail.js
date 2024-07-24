import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { blobToBase64 } from '../../ultils/blobToBase64';
import SelectQuantity from '../../components/SelectQuantity/SelectQuantity';
import { decrementItem, incrementItem, addToCart, fetchAddCartToolkit, fetchGetCartToolkit } from '../../redux/slides/cartSlice';
import { jwtDecode } from 'jwt-decode'

const BookDetail = () => {
    const bookId = useParams()
    const dispatch = useDispatch()
    // const bookDataById = useSelector((state) => state.user.bookDataById)
    // const quantityBook = useSelector((state) => state.cart.quantity)
    const location = useLocation();
    let navigate = useNavigate();
    const listCart = useSelector((state) => state.cart.listCart)
    // useEffect(() => {
    //     // dispatch(fetchGetBookByIdToolkit(bookId.id))
    //     dispatch(fetchGetCartToolkit())
    // }, [listCart])

    const [quantity, setQuantity] = useState(1)
    const handleQuantity = useCallback(() => {
    }, [quantity])

    const handleChangeQuantity = useCallback((flag) => {
        if (flag == 'minus' && quantity == 1) return
        if (flag == 'minus') {
            setQuantity(quantity - 1)
        }
        if (flag == 'plus') {
            setQuantity(quantity + 1)
        }
    }, [quantity])

    const token = localStorage.getItem("access_token");

    const handleAddCart = () => {
        if (token) {
            const { role_code } = jwtDecode(token)
            if ((role_code == 'R1' || role_code == 'R2')) {
                // dispatch(addToCart({ bookId: location.state.props.id, quantity, price: location.state.props.price, image: location.state.props.image }))
                dispatch(fetchAddCartToolkit(
                    {
                        image: location.state.props.image,
                        bid: String(location.state.props.id),
                        quantity,
                        totalPrices: (+location.state.props.price) * (+quantity),
                        isChecked: '0'
                    })).then(() => {
                        dispatch(fetchGetCartToolkit())
                    })
            } else {
                navigate('/login')
            }
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            <div>
                <div className='p-[20px] w-full mt-[60px] flex flex-col sm:flex-row sm:relative'>
                    <div style={{ width: '100%' }}>
                        <img
                            src={location.state.props.image}
                            // src={bookDataById.length>0 ? blobToBase64(bookDataById?.image):<></>}
                            style={{ objectFit: 'cover', width: '100%', height: '350px' }}
                        />
                    </div>
                    <div style={{ width: '100%', padding: '20px' }}>
                        <h3 className='font-bold sm:text-[30px]'>{location.state.props.title}</h3>
                        <h3 style={{ color: 'red', fontSize: '20px' }}>{location.state.props?.price.toLocaleString()} VNĐ</h3>
                        <p className=''>Số lượng</p>
                        <SelectQuantity
                            quantity={quantity}
                            handleQuantity={handleQuantity}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                        <button
                            onClick={handleAddCart}
                            className='sm:w-full sm:p-[10px] sm:bg-blue-900 sm:text-white sm:rounded-[5px] sm:my-[10px]'
                        >
                            Thêm giỏ hàng
                        </button>
                        <button
                            className='sm:w-full sm:p-[10px] sm:bg-red-600 sm:text-white sm:rounded-[5px] sm:my-[10px]'
                        >
                            Mua ngay
                        </button>
                    </div>
                    {/* <div className='flex fixed bottom-0 z-50 bg-gray-300 w-full h-[60px] sm:w-[30%] sm:absolute sm:bottom-[-60px] ' >
                        <button
                            onClick={handleAddCart}
                            className='basis-1 grow '
                        >
                            Thêm giỏ hàng
                        </button>
                        <button
                            className='basis-1 grow bg-red-500 text-white '
                        >
                            Mua ngay
                        </button>
                    </div> */}
                    {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }} >
                            <Button
                                onClick={handleAddCart}
                                variant="link"
                                style={{ border: '2px solid red', textDecoration: 'none', marginRight: '10px' }}>
                                Thêm giỏ hàng
                            </Button>
                            <Button variant="danger">Mua ngay</Button>
                        </div> */}
                </div>
                {/* <div style={{width:'50%',padding:'20px'}}>
                        <h3>{location.state.props.title}</h3>
                        <h3 style={{ color: 'red', fontSize: '45px' }}>{location.state.props?.price.toLocaleString()} VNĐ</h3>
                        <h5>Số lượng</h5>
                        <SelectQuantity
                            quantity={quantity}
                            handleQuantity={handleQuantity}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                    </div> */}
            </div>
        </>
    )
}

export default BookDetail