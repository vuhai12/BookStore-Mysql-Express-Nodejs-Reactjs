import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { fetchRegisterToolkit } from '../../redux/slides/userSlice';
import { useNavigate, NavLink, Link } from 'react-router-dom'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dataRegister, setDataRegister] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { t } = useTranslation('translation')
    const [errorMessage, setErrorMessage] = useState({})

    useEffect(() => {
        if (isSubmit) {
            isValidForm()
        }
    }, [dataRegister])

    const isValidForm = () => {
        let isValid = true
        const error = {}

        if (dataRegister.email == '' || dataRegister.email == undefined) {
            error.email = 'Please enter email'
        } else {
            let valid = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/.test(dataRegister.email)
            if (!valid) {
                error.email = 'Email is not invalid'
            }
        }
        if (dataRegister.password == '' || dataRegister.password == undefined) {
            error.password = 'Please enter password'
        }
        if (dataRegister.password?.length < 6) {
            error.password = 'password must be at least 6 characters long'
        }
        if (dataRegister.confirmPassword != dataRegister.password) {
            error.confirmPassword = 'Passwword is not match'
        }
        if (Object.keys(error).length > 0) {
            setErrorMessage(error)
            isValid = false
        } else {
            setErrorMessage({})
        }
        return isValid
    }

    const handleRegister = async () => {
        let isValid = isValidForm()
        if (isValid) {
            dispatch(fetchRegisterToolkit({ email: dataRegister.email, password: dataRegister.password })).then((result) => {

                if (result.payload) {
                    if (result.payload.error == 1) {
                        setErrorMessage({
                            ...errorMessage,
                            email: result.payload.message
                        })
                    }
                    if (result.payload.error == 0) {
                        setTimeout(() => {
                            navigate(`/login`)
                            setDataRegister({})
                        }, 2000)
                        toast.success('Register User succes', { autoClose: 1000 })
                    }
                }
            }).catch((e) => console.log(e))
        }
        setIsSubmit(true)
    }

    const handleOnchangeUserLogin = (e) => {
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <form className='form-auth'>
                <h3>Register</h3>
                <div className='group'>
                    <label>Email address</label>
                    <input type="email" name='email' value={dataRegister.email} placeholder="Email" onChange={(e) => handleOnchangeUserLogin(e)} />
                    {errorMessage.email && <p className='text-red-600'>{errorMessage.email}</p>}
                </div>
                <div className='group'>
                    <label>Password</label>
                    <input type="password" name='password' value={dataRegister.password} placeholder="Password" onChange={(e) => handleOnchangeUserLogin(e)} />
                    {errorMessage.password && <p className='text-red-600'>{errorMessage.password}</p>}
                </div>
                <div className='group'>
                    <label>Confirm Password</label>
                    <input type="password" name='confirmPassword' value={dataRegister.confirmPassword} placeholder="Confirm Password" onChange={(e) => handleOnchangeUserLogin(e)} />
                    {errorMessage.confirmPassword && <p className='text-red-600'>{errorMessage.confirmPassword}</p>}
                </div>
                <button className='btn-auth' onClick={handleRegister}>
                    Register
                </button>
                <div className='group'>
                    <span>Already have an account? </span>
                    <Link className='text-red-700 font-semibold' to='/login'>Login</Link>
                </div>
            </form>
        </>
    )
}

export default Register