import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetUserByIdToolkit, fetchUpdateNewUserToolkit } from '../../redux/slides/userSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ImageDefault from '../../assets/image_default.jpg'

const UserInfo = () => {
  const dispatch = useDispatch()
  const userDataUpdate = [
    {
      id: 1,
      inputType: 'input',
      lable: 'avatar',
      type: 'file',
      value: '',
      file: '',
      name: 'avatar',
      error: ''
    },
    {
      id: 2,
      inputType: 'input',
      lable: 'name',
      type: 'text',
      value: '',
      name: 'name',
      error: ''
    },
    {
      id: 3,
      inputType: 'input',
      lable: 'email',
      type: 'text',
      value: '',
      name: 'email',
      error: ''
    },
    {
      id: 4,
      inputType: 'input',
      lable: 'address',
      type: 'text',
      value: '',
      name: 'address',
      error: ''
    },
    {
      id: 5,
      inputType: 'input',
      lable: 'password',
      type: 'text',
      value: '',
      name: 'password',
      error: ''
    },
  ]
  const [items, setItems] = useState(userDataUpdate)

  useEffect(() => {
    dispatch(fetchGetUserByIdToolkit()).then((result) => {
      if (result.payload.userData) {
        items[0].value = result.payload.userData.avatar
        items[1].value = result.payload.userData.name
        items[2].value = result.payload.userData.email
        items[3].value = result.payload.userData.address
        items[4].value = result.payload.userData.password
        setItems([...items])
      }
    })
  }, [])

  const handleUpdateUserData = (item, e) => {
    if (item.type == 'text') {
      item.value = e.target.value
      if (item.value.trim()) {
        item.error = ''
      }
    }
    if (item.type == 'file') {
      item.value = URL.createObjectURL(e.target.files[0])
      item.file = e.target.files[0]
    }
    setItems([...items])
  }

  const validate = () => {
    let isValid = 0
    items.map((item) => {
      if (!item.value && item.name != 'avatar' && item.name != 'password') {
        item.error = 'Mising' + item.name
        isValid++
      }
    })
    setItems([...items])
    return isValid
  }

  const handleUpdate = () => {
    if (!validate()) {
      const formData = new FormData()
      if (items[0].file) {
        formData.append('avatar', items[0].file)
      }
      if (items[4].value) {
        formData.append('password', items[4].value)
      }
      formData.append('name', items[1].value)
      formData.append('email', items[2].value)
      formData.append('address', items[3].value)

      dispatch(fetchUpdateNewUserToolkit(formData)).then(() => {
        dispatch(fetchGetUserByIdToolkit()).then((result) => {
          if (result.payload.userData) {
            items[0].value = result.payload.userData.avatar
            items[1].value = result.payload.userData.name
            items[2].value = result.payload.userData.email
            items[3].value = result.payload.userData.address
            items[4].value = ''
            setItems([...items])
            toast.success('update ok', { autoClose: 500 })
          }
        })
      })
    }
  }

  return (
    <>
      <h5 className='mt-[70px] ml-[10px]'>Cập nhật Thông tin cá nhân</h5>
      <div className='flex flex-col sm:flex-row mt-[60px] items-center'>
        <div  className='sm:p-[20px] sm:basis-[30%] sm:text-center'>
          {items.map((item) => {
            if (item.type == 'file') {
              return (
                <div >
                  {
                    <div>
                      <label htmlFor='avatar'>
                        <img src={!item.value ? ImageDefault : item.value} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                      </label>
                      <input hidden="true" type='file' name={item.lable} id='avatar' onChange={(e) => handleUpdateUserData(item, e)} />
                    </div>
                  }
                </div>
              )
            }
          })}
        </div>
        <div className='p-[20px] w-full sm:basis-[70%]'>
          {items.map((item) => {
            if (item.type == 'text') {
              return (
                <>
                  <div className='flex w-full my-[10px]' >
                    <label style={{ width: '30%' }}>{item.lable}</label>
                    <div className='w-full'>
                      <input className='border-[1px] rounded-[5px] border-solid border-gray-600 p-[5px] w-full' value={item.value} name={item.lable} onChange={(e) => handleUpdateUserData(item, e)} />
                      <p style={{ color: 'red' }}>{item.error}</p>
                    </div>

                  </div>
                </>

              )
            }
          })}
        </div>
      </div>
      <div className='text-center'>
        <button style={{ width: '100px', lineHeight: '30px', height: '30px', border: '1px solid blue', borderRadius: '5px', }} onClick={handleUpdate}>Lưu</button>
      </div>
    </>
  )
}

export default UserInfo