import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginToolkit } from '../../redux/slides/userSlice';
import { useTranslation } from 'react-i18next'
import Nav from 'react-bootstrap/Nav';
import { useNavigate, NavLink, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import { fetchGetCartToolkit } from '../../redux/slides/cartSlice';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let schema = yup
    .object({
      password: yup.string().min(6, 'Min length 6 character').required('you fill secction'),
      email: yup.string().email('Email invalid').required('you fill secction')

    })


  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [loginData, setLoginData] = useState({})
  const [errorForm, setErrorForm] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const { t } = useTranslation('translation')

  useEffect(() => {
    // dispatch(fetchGetCartToolkit())
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
        if (result.payload) {
          if (result.payload.error == 1) {
            setErrorForm({
              ...errorForm,
              password: result.payload.message,
            })
          }
          if (result.payload.error == 0) {
            toast.success('Login succes', { autoClose: 300 })
            if (result.payload.role_code == 'R1') {
              setTimeout(() => {
                navigate(`/system/admin/user`)
                setLoginData({})
              }, 1200)
            }
            if (result.payload.role_code == 'R2') {
              setTimeout(() => {
                navigate(`/user/info`)
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
  const handleLoginWithYub = ({ email, password }) => {
    dispatch(fetchLoginToolkit({ email, password })).then((result) => {
      if (result.payload) {
        if (result.payload.error == 1) {
          setError('email', {
            type: "server",
            message: result.payload.message,
          });
          // setErrorForm({
          //   ...errorForm,
          //   password: result.payload.message,
          // })
        }
        if (result.payload.error == 0) {
          toast.success('Login succes', { autoClose: 300 })
          if (result.payload.role_code == 'R1') {
            setTimeout(() => {
              navigate(`/system/admin/user`)
              setLoginData({})
            }, 1200)
          }
          if (result.payload.role_code == 'R2') {
            setTimeout(() => {
              navigate(`/user/info`)
              setLoginData({})
            }, 1200)
          }
        }
      }
    }
    ).catch((e) => console.log(e))
  }

  return (
    <>
      <form className='form-auth'>
        <h3>{t('auth.login')}</h3>
        <div className='group'>
          <label>Email address</label>
          <input
            type="email"
            name='email'
            value={loginData.email}
            placeholder="Enter email"
            onChange={(e) => handleOnchangeUserLogin(e)}
            // {...register("email", { required: true,pattern:/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/ })}
            {...register("email")}
          />
          {/* {errorForm.email && <p className='text-danger'>{errorForm.email}</p>} */}
          {/* {errors.email?.type === "required" && (
              <p style={{color:'red'}} role="alert">First email is required</p>
            )}
             {errors.email?.type === "pattern" && (
              <p style={{color:'red'}} role="alert">First email is invalid</p>
            )} */}
          <p className='text-red-600'>{errors.email?.message}</p>
        </div>
        <div className='group'>
          <label>Password</label>
          <input
            //  {...register("password", { required: true })}
            type="password"
            name='password'
            value={loginData.password}
            placeholder="Password"
            onChange={(e) => handleOnchangeUserLogin(e)}
            {...register("password")}
          />
          {/* {errorForm.password && <p className='text-danger'>{errorForm.password}</p>} */}
          {/* {errors.password?.type === "required" && (
              <p style={{color:'red'}} role="alert">First password is required</p>
            )} */}
          <p className='text-red-600'>{errors.password?.message}</p>
        </div>


        {/* <Button variant="primary" onKeyDown={handleLogin} onClick={handleLogin}> */}
        <button className='btn-auth' variant="primary" onKeyDown={handleLogin} onClick={handleSubmit(handleLoginWithYub)}>
          {t('login')}
        </button>

        <div className='group'>
          <span>Don't have an account? </span>
          <Link className='text-red-700 font-semibold' to='/register'>Register</Link>
        </div>
      </form>
    </>
  )
}

export default Login


