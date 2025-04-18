import React from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Login() {
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const formik = useFormik({
    initialValues: {email: "" , password: ""},
    validationSchema: yup.object({email:yup.string().email("").required("ایمیل ضروری است"),
        password:yup.string().min(6).required("رمز عبور ضروری است")
    }),
    onSubmit: (values) =>{
        const success = login(values.email, values.password);
        if(success){
            navigate("/dashboard")
        }else{
            alert("اطلاعات ورود اشتباه میباشد")
        }
    }
  })


    return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <form onSubmit={formik.handleSubmit}
        className='bg-white p-8 rounded shadow-md w-80'>
            <h2 className='text-xl font-bold mb-4'>ورود به پنل</h2>
            <input type='email' name='email' placeholder='email' value={formik.values.email} onChange={formik.handleChange}
            className='w-full border p-2 mb-2'/>
            <input type='password' name='password' placeholder='password' value={formik.values.password} onChange={formik.handleChange}
            className='w-full border p-2 mb-4'/>
            <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded'>
                ورود
            </button>
        </form>
    </div>
  )
}

export default Login