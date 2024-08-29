import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import logo from '../../assests/logo.png'
import logo2 from '../../assests/draw2.webp'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Loader from "react-js-loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/style.scss'
import { validate } from '../utils/validate';
import { FaFacebook } from "react-icons/fa";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGooglePlus } from "react-icons/fa6";
import { userLogin } from '../store/loginSlice'


interface formState {
    userName: string,
    password: string
}
const Login = () => {
    const [formData, setFormData] = useState<formState>({
        userName: '',
        password: ''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false);
    const [showValidation, setShowValidation] = useState(false);


    const from = location.state?.from?.pathname || '/';
    console.log('before path is ', from, location.state?.from?.pathname);
    const fields = [
        { field: 'userName', name: 'userName', validate: 'required' },
        { field: 'password', name: 'password', validate: 'required' },
    ]


    const handleChange = (e: any) => {
        setShowValidation(true);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const isValidate = await validate(fields, formData)
            if (isValidate) {
                setLoader(true);
                const data = await userLogin(formData, dispatch);
                
                if (data?.statusCode === 200) {
                  setLoader(false);
                  toast.success(data.message, {autoClose: 1000})
                  navigate('/check-screen'); // Redirect to the previous page or home
                }
            }
        } catch (error: any) {
            setLoader(false);
            setErrors(error)
            console.log(error, "signUpError==>>");
            if (error?.data?.message) {
                toast.error(error?.data?.message, {
                    autoClose: 2000
                });
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
                    <div className="center">
                        {/* <span>Welcome to Maya Support</span> */}
                        <div className="login-content">
                            <form
                                onSubmit={handleSubmit}
                                className="login-form" action="#">
                                <div className="login-username">
                                    <label >UserName</label>

                                    <InputField
                                        placeholder="Enter a valid User Name"
                                        onChange={handleChange}
                                        title={formData.userName}
                                        type="text"
                                        id="userName"
                                        name="userName"
                                    />
                                    {errors.userName && <span className='error'>{errors.userName}</span>}
                                </div>

                                <div className="login-password">
                                    <label htmlFor='password'>Password</label>
                                    <InputField
                                        placeholder="Enter password"
                                        onChange={handleChange}
                                        title={formData.password}
                                        type="password"
                                        id="password"
                                        name="password"
                                    />  
                                    {errors.password && <span className='error'>{errors.password}</span>}

                                </div>
                                <div className="login-password remember_me">
                                 <input type="checkbox"  id='remember'/>
                                    <label htmlFor='remember'>Remember me</label>
                                </div>
                                

                                {
                                    loader ?
                                        <Loader type="box-up" bgColor={'#00003E'} color={'yello'} size={100} />
                                        :
                                        <div className="submit-button">

                                            <button className="form-submit-button" type="submit">Login</button>
                                        </div>


                                }
                            </form>
                        </div>
                        <div className="bottom">
                            <div className="create-acc">
                                <p>Sign In With</p>

                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <span>or</span>
                        <div className="social-links">
                            <FaFacebook/>
                            <AiFillTwitterCircle />
                            <TiSocialLinkedinCircular />
                        </div>
                    </div>
                </div>
                <div className='copy_right_content'>
                    <p>Copyright © 2020. All rights reserved.</p>
                    <div >
                        <FaFacebook  className='social-links-icons'/>
                        <AiFillTwitterCircle   className='social-links-icons'/>
                        <FaGooglePlus   className='social-links-icons'/>
                        <TiSocialLinkedinCircular  className='social-links-icons' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login



interface InputFieldProps {
    id?: string
    type?: string;
    title?: string;
    placeholder?: string;
    name?: string;
    disable?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    type = 'text',
    title = '',
    placeholder = '',
    onChange,
    onClick,
    id,
    name
}) => {

    return (
        <input
            type={type}
            value={title}
            placeholder={placeholder}
            onChange={onChange}
            onClick={onClick} // Ensure onChange is correctly passed down
            id={id}
            name={name}
        />
    );
};