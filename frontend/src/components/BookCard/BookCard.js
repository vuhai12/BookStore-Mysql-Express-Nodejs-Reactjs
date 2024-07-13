import React from 'react'
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
      <div className='h-[150px]' >
        <img src={props.image} className='w-100 w-full h-full object-cover rounded-[5px]' />
      </div>
      <h5 className='mt-3'>{props.price.toLocaleString()} VNĐ</h5>
      <p className='mt-3'>{props.title}</p>
      <div className='text-center mt-3'>
        <button className='mt-[3px] bg-sky-800 p-[8px] rounded-[5px] text-white text-[15px]'  onClick={() => handleViewDetail(props.id)}>VIEW</button>
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