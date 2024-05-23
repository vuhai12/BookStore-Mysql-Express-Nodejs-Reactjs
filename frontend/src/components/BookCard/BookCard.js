import React from 'react'
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { WrapperBookItem } from './style'

const BookCard = ({ props }) => {
  const role_code = localStorage.getItem("role_code");
  const navigate = useNavigate()
  const handleViewDetail = (id) => {
    navigate(`/book/${id}`, { state: { props } })
  }


  return (
    <WrapperBookItem>
      <div style={{ height: '250px' }}>
        <img src={props.image} className='w-100' style={{ objectFit: 'cover', borderRadius: '5px', height: '100%' }} />
      </div>
      <h5 className='mt-3'>{props.price.toLocaleString()} VNĐ</h5>
      <p className='mt-3'>{props.title}</p>
      <div className='text-center mt-3'>
        <Button variant="success" style={{ margin: '3px' }} onClick={() => handleViewDetail(props.id)}>VIEW</Button>
        {/* {role_code && role_code == 'R1'
          ?
          <>
            <Button variant="success" style={{ margin: '3px' }} onClick={() => handleViewDetail(id)}>VIEW</Button>
          </>
          :
          <Button variant="success" style={{ margin: '3px' }} onClick={() => handleViewDetail(id)}>VIEW</Button>
        } */}
      </div>
    </WrapperBookItem>
  )
}

export default BookCard