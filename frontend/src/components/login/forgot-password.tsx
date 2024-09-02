import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Loader from "react-js-loader";
import '../style/style.scss'
import { validate } from '../utils/validate'
import logo from '../../assests/logo.png'
import logo2 from '../../assests/draw2.webp'
<<<<<<< HEAD
import { getForgotPassword } from '../store/loginSlice'
import { Form, Button, Spinner } from 'react-bootstrap';
=======
>>>>>>> be79a9ffd1186b334765e630085192ce33851ecf


interface formState {
    email: string,
    password: string,
    confirmPassword: string
}
const ForgotPassword = () => {
    const [loader , setLoader] = useState(false)
    const navigate = useNavigate()

const dispatch = useDispatch()
    const [formData, setFormData] = useState <formState>({
        email:'',
        password:'',
        confirmPassword :''
    })
    const [errors ,setErrors] = useState<any>({})
    
    const [isFormValid, setIsFormValid] = useState(false);
    const[showValidation , setShowValidation] = useState(false)

    const fields = [
        { field: 'email', name: 'email', validate: 'required' },
        { field: 'password', name: 'password', validate: 'required' },
        { field: 'confirmPassword', name: 'confirmPassword', validate: 'required' },
    ]
    
    
    const handleChange = (e : any) => {
        setShowValidation(true)
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e : any) => {
        e.preventDefault()
        setShowValidation(true)
    
         try {
            const isValidate = await validate(fields, formData)
             if (isValidate) {
        setLoader(true)
             const data =  await getForgotPassword(formData,dispatch)
             console.log('res login data', data);
                navigate('/home')
                if (data?.statusCode == 200) {
                    toast.success(data.message, {autoClose:2000})
                    setLoader(false)
                    navigate('/')
                }
             }
         } catch (error : any) {
            setErrors(error)
            setLoader(false)
             console.log(error, "signUpError==>>")
    
             if (error?.data?.message) {
                 toast.error(error?.data?.message, {
                    autoClose:2000
                 })
             }
             
         }
    
    
     };
    

        return (
            <div className="sign-in-page">
            <div className="signin-wrapper">
                <div className="left-content">
                <div>
                    <img src={logo} alt="" />
                    </div>
                    <div>
                    <img src={logo2} alt="" />
                    </div>
                </div>
                <div className="right-content">
                
                    <div className="c-small-img">
                        <img  src={logo} alt=""/>
                    </div>
                    <div className="center">
                      
                        <div className="login-content">
                            <form 
                            onSubmit={handleSubmit}
                            className="login-form" action="#">
                                <div className="login-username">
                                    <label >Email</label>
                                    <input
                                    onChange={handleChange}
                                    value={formData.email}
                                     type="text" name="email" id="name"/>
                                </div>
                                {
                                    errors.email ?
                                    <span className='error'>{errors.email}</span> :
                                    null
                                }
                                <div className="login-password">
                                    <label >New Password</label>
                                    <input
                                    onChange={handleChange}
                                    value={formData.password}
                                     type="password" name="password" id="name" />
                                </div>
                                {
                                    errors.password ?
                                    <span className='error'>{errors.password}</span> :
                                    null
                                }
                                <div className="login-password">
                                    <label >Confirm Password</label>
                                    <input 
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    type="password" name="confirmPassword" id="name" />
                                </div> {
                                    errors.confirmPassword ?
                                    <span className='error'>{errors.confirmPassword}</span> :
                                    null
                                }
                           
                                {
                                        loader ?
                                <Loader type="box-up" bgColor={'red'} color={'yello'} size={100} />
 : 
 <div className="submit-button">

 <button className="form-submit-button" type="submit">Update Password</button>
 </div>


                                    }
                               
                            </form>
                        </div>
                        <div className="bottom">
                            <div className="create-acc">
                            <p>Existing user?</p>
                                <Link className='select_link' to='/'>
                                Login
                                </Link>
                            </div>
                        </div>
                    </div>
                
                </div>
                <div className='copy_right_content'>
                                    <p>Copyright © 2020. All rights reserved.</p>
                                    <div>
                                        
                                    </div>
                </div>
            </div>
        </div>
        )
}

export default ForgotPassword