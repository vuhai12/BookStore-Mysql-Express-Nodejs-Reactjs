import React, { useCallback, useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetBookByIdToolkit } from '../../redux/slides/bookSlice';
import { useParams, useLocation,Navigate,useNavigate  } from 'react-router-dom';
import { blobToBase64 } from '../../ultils/blobToBase64';
import SelectQuantity from '../../components/SelectQuantity/SelectQuantity';
import { decrementItem, incrementItem, addToCart } from '../../redux/slides/cartSlice';
import { jwtDecode } from 'jwt-decode'

const BookDetail = () => {
    const bookId = useParams()
    const dispatch = useDispatch()
    // const bookDataById = useSelector((state) => state.user.bookDataById)
    // const quantityBook = useSelector((state) => state.cart.quantity)
    const location = useLocation();
    let navigate = useNavigate(); 
   
    // useEffect(() => {
    //     dispatch(fetchGetBookByIdToolkit(bookId.id))
    // }, [])

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
        if(token){
            const { role_code } = jwtDecode(token)
            if((role_code == 'R1' || role_code == 'R2')){
                dispatch(addToCart({ bookId: location.state.props.id, quantity, price: location.state.props.price, image: location.state.props.image }))
            }else{
                navigate('/login')
            }
        }else{
            navigate('/login')
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col lg={5}>
                        <div style={{ width: '30%' }}>
                            <img
                                src={location.state.props.image}
                                // src={bookDataById.length>0 ? blobToBase64(bookDataById?.image):<></>}
                                style={{ objectFit: 'cover', width: '50%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }} >
                            <Button
                                onClick={handleAddCart}
                                variant="link"
                                style={{ border: '2px solid red', textDecoration: 'none', marginRight: '10px' }}>
                                Thêm giỏ hàng
                            </Button>
                            <Button variant="danger">Mua ngay</Button>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <h3>{location.state.props.title}</h3>
                        <h3 style={{ color: 'black', fontSize: '45px' }}>{location.state.props?.price} VNĐ</h3>
                        <h5>Số lượng</h5>
                        <SelectQuantity
                            quantity={quantity}
                            handleQuantity={handleQuantity}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                    </Col>
                </Row>
            </Container>
        </>


    )
}

export default BookDetail