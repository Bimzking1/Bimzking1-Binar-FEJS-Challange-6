import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import userSlice from '../store/user'
import jwtDecode from 'jwt-decode'
import { useForm } from 'react-hook-form'
import '../Style/login.css'

const Login = () => {

    const { register, handleSubmit, formState } = useForm()
    const [loginStatus, setLoginStatus] = useState({
        succes: false,
        message: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formSubmitHandler = (data) => {
        const postData = {
            email: data.user_email,
            password: data.user_password
        }
        axios.post('http://localhost:4000/login', postData)
        .then( res => {
            if (typeof res.data.accessToken !== 'undefined') {
                // Menyimpan token di localstorage
                localStorage.setItem('minishopAccessToken', res.data.accessToken)
                // Menyimpan redux di store
                const user = jwtDecode(res.data.accessToken)
                axios.get(`http://localhost:4000/users/${user.sub}`)
                .then( res => {
                    dispatch( userSlice.actions.addUser({ userData: res.data }));
                    if (res.data.isAdmin) {
                        navigate('/admin');
                    } else {
                        navigate('/user');
                    }
                })
            }
        }) .catch( err => {
            setLoginStatus({
                success: false,
                message: 'Sorry, something is wrong. Try again later.'
            })
        })
    }

  return (
    <section>
            {/* <div className="container py-8">
                <div className="max-w-[500px] mx-auto">
                    { ( !loginStatus.succes && loginStatus.message ) && <p className="text-sm text-red-500 italic">{loginStatus.message}</p>}
                    <form onSubmit={ handleSubmit(formSubmitHandler) }>
                        <div className="mb-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_email', {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_email?.type === 'required' && "Email is required"}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="user_password">Password</label>
                            <input type="password" name="user_password" id="user_password" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_password',  {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_password?.type === 'required' && "Password is required"}</p>
                        </div>
                        <div class="mb-8">
                            <button type="submit" className="bg-green-700 px-6 py-2 text-white">Login</button>
                        </div>
                        <p>Don't have an accout? <Link to="/register" className="text-blue-600">Register Now</Link></p>
                    </form>
                </div>
            </div> */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-7 col-lg-8 col-xl-8 column-left"></div>
                    <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-4 column-right">
                        <div className="column-right-inner">
                            <div className="grey-box"></div>
                            <div className="login-title">
                                Welcome, Admin BCR
                            </div>
                            <div className="form-group-container">
                                {/* <% if (messages.error) { %>
                                <p style="color: red; font-style: italic"><%= messages.error %></p>
                                <% } %> */}
                                { ( !loginStatus.succes && loginStatus.message ) && <p className="text-sm text-red-500 italic">{loginStatus.message}</p>}
                                <form onSubmit={ handleSubmit(formSubmitHandler) }>
                                    <div className="form-group">
                                        <label for="username">Username</label>
                                        <input type="email" name="email" id="email" className="form-control" {...register('user_email', {required: true})} autoComplete="true" />
                                        <p className="text-sm text-red-500 italic">{formState.errors.user_email?.type === 'required' && "Email is required"}</p>
                                    </div>
                                    <div className="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" name="user_password" id="user_password" className="form-control" {...register('user_password',  {required: true})} autoComplete="true" />
                                        <p className="text-sm text-red-500 italic">{formState.errors.user_password?.type === 'required' && "Password is required"}</p>
                                    </div>
                                    <button type="submit" className="btn button-signin">Sign In</button>
                                    <div className='confirmation'>
                                        <p>Don't have an account?<Link to="/register" className="text-blue-600"> Register</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Login