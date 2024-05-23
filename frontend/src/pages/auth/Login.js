import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginToolkit } from '../../redux/slides/userSlice';
import { useTranslation } from 'react-i18next'
import Nav from 'react-bootstrap/Nav';
import { useNavigate, NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({})
  const [errorForm, setErrorForm] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const { t } = useTranslation('translation')

  useEffect(() => {
    if (isSubmit) {
      validate()
    }
  }, [loginData])

  const handleOnchangeUserLogin = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    let isValidate = true
    const error = {}

    if (loginData.email == '' || loginData.email == undefined) {
      error.email = 'Please enter email'
    } else {
      let valid = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/.test(loginData.email)
      if (!valid) {
        error.email = 'Email is not valid'
      }
    }

    if (loginData.password == '' || loginData.password == undefined) {
      error.password = 'Please enter password'
    } else if (loginData.password.length < 6) {
      error.password = 'password must be at least 6 characters long'
    }

    if (Object.keys(error).length > 0) {
      setErrorForm(error)
      isValidate = false
    } else {
      setErrorForm({})
    }
    return isValidate
  }

  const handleLogin = async () => {
    let isValid = validate()
    if (isValid) {
      dispatch(fetchLoginToolkit({ email: loginData.email, password: loginData.password })).then((result) => {
        console.log('result', result)
        if (result.payload) {
          if (result.payload.error == 1) {
            setErrorForm({
              ...errorForm,
              password: result.payload.message,

            })

            // setTimeout(() => {
            //   setErrorForm({})
            // }, 1000)
          }
          if (result.payload.error == 0) {
            localStorage.setItem('role_code', result.payload.role_code)

            toast.success('Login succes', { autoClose: 300 })
            if (result.payload.role_code == 'R1') {
              setTimeout(() => {
                navigate(`/system/admin`)
                setLoginData({})
              }, 1200)
            }

          }
        }
      }
      ).catch((e) => console.log(e))
    }
    setIsSubmit(true)
  }

  return (
    <>
      <div style={{ background: '#fff', padding: '30px', margin: '50px auto', width: '30%', borderRadius: '10px' }}>
        <h3 >{t('auth.login')}</h3>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' value={loginData.email} placeholder="Enter email" onChange={(e) => handleOnchangeUserLogin(e)} />
            {errorForm.email && <p className='text-danger'>{errorForm.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' value={loginData.password} placeholder="Password" onChange={(e) => handleOnchangeUserLogin(e)} />
            {errorForm.password && <p className='text-danger'>{errorForm.password}</p>}
          </Form.Group>
          <Button variant="primary" onKeyDown={handleLogin} onClick={handleLogin}>
            {t('login')}
          </Button>
        </Form>
        <Nav>
          <Navbar.Text className='nav-link px-0' to='/register'>Don't have an account? </Navbar.Text>
          <NavLink className='nav-link px-2 mx-2 bg-success rounded mb-0 text-white' to='/register'>Register</NavLink>
        </Nav>

      </div>

    </>
  )
}

export default Login


