import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from 'react-js-loader';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../style/style.scss';
import { validate } from '../utils/validate';
// import { updateUserProfile } from '../store/loginSlice';

interface FormState {
    name: string;
    email: string;
    photo: string;
    phoneNumber: string;
    password: string;
}

const ProfileEdit = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        photo: '',
        phoneNumber: '',
        password: ''
    });

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [showValidation, setShowValidation] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fields = [
        { field: 'name', name: 'name', validate: 'required' },
        { field: 'email', name: 'email', validate: 'required' },
        { field: 'photo', name: 'photo', validate: '' }, // Optional validation
        { field: 'phoneNumber', name: 'phoneNumber', validate: 'required' },
        { field: 'password', name: 'password', validate: '' } // Optional validation
    ];

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
            const isValidate = await validate(fields, formData);
            if (isValidate) {
                setLoader(true);
                // const data = await updateUserProfile(formData, dispatch);
                
                // if (data?.statusCode === 200) {
                //     setLoader(false);
                //     toast.success(data.message, { autoClose: 1000 });
                //     navigate('/profile'); // Redirect to the profile page
                // }
            }
        } catch (error: any) {
            setLoader(false);
            setErrors(error);
            console.log(error, "ProfileUpdateError==>>");
            if (error?.data?.message) {
                toast.error(error?.data?.message, {
                    autoClose: 2000
                });
            }
        }
    };

    return (
        <div className="profile-edit-page">
            <div className="profile-edit-wrapper">
                <div className="center">
                    <div className="profile-edit-content">
                        <form
                            onSubmit={handleSubmit}
                            className="profile-edit-form"
                            action="#"
                        >
                            <div className="profile-edit-field">
                                <label>Name</label>
                                <InputField
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                    title={formData.name}
                                    type="text"
                                    id="name"
                                    name="name"
                                />
                                {errors.name && <span className='error'>{errors.name}</span>}
                            </div>

                            <div className="profile-edit-field">
                                <label>Email</label>
                                <InputField
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    title={formData.email}
                                    type="email"
                                    id="email"
                                    name="email"
                                />
                                {errors.email && <span className='error'>{errors.email}</span>}
                            </div>

                            <div className="profile-edit-field">
                                <label>Phone Number</label>
                                <InputField
                                    placeholder="Enter your phone number"
                                    onChange={handleChange}
                                    title={formData.phoneNumber}
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                />
                                {errors.phoneNumber && <span className='error'>{errors.phoneNumber}</span>}
                            </div>

                            <div className="profile-edit-field">
                                <label>Set New Password</label>
                                <InputField
                                    placeholder="Enter a new password"
                                    onChange={handleChange}
                                    title={formData.password}
                                    type="password"
                                    id="password"
                                    name="password"
                                />
                                {errors.password && <span className='error'>{errors.password}</span>}
                            </div>

                            <div className="profile-edit-field">
                                <label>Profile Photo</label>
                                <input
                                    type="file"
                                    onChange={(e: any) => setFormData({
                                        ...formData,
                                        photo: e.target.files[0],
                                    })}
                                    id="photo"
                                    name="photo"
                                />
                                {errors.photo && <span className='error'>{errors.photo}</span>}
                            </div>

                            {
                                loader ?
                                    <Loader type="box-up" bgColor={'#00003E'} color={'yellow'} size={100} />
                                    :
                                    <div className="submit-button">
                                        <button className="form-submit-button" type="submit">Save Changes</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;

interface InputFieldProps {
    id?: string;
    type?: string;
    title?: string;
    placeholder?: string;
    name?: string;
    disable?: boolean;
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
            onClick={onClick}
            id={id}
            name={name}
        />
    );
};
