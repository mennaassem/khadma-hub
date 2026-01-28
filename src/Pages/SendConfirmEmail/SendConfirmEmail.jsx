import React, { useState } from 'react'
import logoPhoto from '../../assets/Images/Logo.png'
import * as yup from 'yup'
import { useFormik } from 'formik'
 
import { sendDataToConfirmEmail } from '../../Services/auth-services'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 

export default function SendConfirmEmail() {
    const navigate=useNavigate();

    
        const  validationSchema= yup.object({
     
           email: yup.string().email("Invalid email address").required("Email is required"),
           
           
        })
     async function handleConfirmEmail(values){
      

     try {
          const response= await sendDataToConfirmEmail(values)
      if(response.isSuccess){
          toast(response.message)
                        setTimeout(()=>{
                            navigate('/login')
                        },3000)

      }
        
     } catch (error) {
        throw error
        
     }

    }
const formik=useFormik({
     initialValues:{
            email: '',
        },
        validationSchema,
        onSubmit:handleConfirmEmail
    

})
  return (
     <div className="container items-center justify-between gap-16 grid lg:grid-cols-2">
         {/* Left side: Login*/}
         <div className=' p-8 bg-white shadow-lg space-y-2'>
            <h1 className='text-2xl font-bold text-center'>Confirm Your Email</h1>
            <form className='space-y-4'  onSubmit={formik.handleSubmit}>
            <div className='space-y-4'>
                     <p className='text-sm'> Enter your email to receive a confirmation link. Please check your inbox after submitting.</p>
                  
                             <div className='relative w-full'>
                            <span className='absolute left-4 -top-3 bg-white px-2 text-sm text-gray-500'>Email</span>
                            <input type='email' className='form-control' name='email' value={formik.values.email}  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                             

                        
                           </div>
            </div>
            
<button
  type="submit"
  className="btn text-white"
>
  Send Confirmation Email
</button>
                            
                         
            </form>
         </div>
         {/* Right side: Illustration image for the login page */}
        <div>
            <img src={logoPhoto} alt="Sign in" />
        </div>
     </div>
  )
}
