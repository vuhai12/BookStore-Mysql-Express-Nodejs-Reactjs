import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { fetchRegisterToolkit } from '../../redux/slides/userSlice';
import { useNavigate, NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


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
            <div style={{ background: '#fff', padding: '30px', margin: '50px auto', width: '30%', borderRadius: '10px' }}>
                <h3 >Register</h3>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' value={dataRegister.email} placeholder="Email" onChange={(e) => handleOnchangeUserLogin(e)} />
                        {errorMessage.email && <p className='text-danger'>{errorMessage.email}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={dataRegister.password} placeholder="Password" onChange={(e) => handleOnchangeUserLogin(e)} />
                        {errorMessage.password && <p className='text-danger'>{errorMessage.password}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name='confirmPassword' value={dataRegister.confirmPassword} placeholder="Confirm Password" onChange={(e) => handleOnchangeUserLogin(e)} />
                        {errorMessage.confirmPassword && <p className='text-danger'>{errorMessage.confirmPassword}</p>}
                    </Form.Group>
                    <Button variant="primary" onClick={handleRegister}>
                        Register
                    </Button>
                </Form>
                <Nav>
                    <Navbar.Text className='nav-link px-0' to='/register'>Already have an account? </Navbar.Text>
                    <NavLink className='nav-link px-2 mx-2 bg-success rounded mb-0 text-white' to='/login'>Login</NavLink>
                </Nav>
            </div>

        </>
    )
}

export default Register