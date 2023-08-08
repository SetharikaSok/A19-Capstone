import { useState } from "react";
import { Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { UserProfile, setUserProfile } from "../redux/actions/profileAction";


interface FormState {
    email: string;
    password: string;
  }

export const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormState>({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleLogin = async () => {
        try {
          const response = await axios.post<UserProfile>(
            "http://localhost:5000/auth/login",
            formData
          );
          
          console.log(formData)
          // debugger;
          if (response.status === 200) {

            console.log(response.data);
            
            dispatch(setUserProfile(response.data));
            console.log("Logged In success")
            navigate('/');
          }

          // console.log('Login successful. Response:', response.data);
          
          // Handle successful login (e.g., redirect to dashboard)
        //   setErrors(null); // Clear any previous errors if login succeeds
        } catch (err) {
            console.error('Login failed:', err);
            alert("Please enter a correct email or password.")
        }
      };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //   const { name, value } = e.target;
    //   setFormData({ ...formData, [name]: value });
      
    // };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
          // Handle form submission (e.g., API call, save data, etc.)
          console.log('Form data:', formData);
          handleLogin()
          // Clear the form after successful submission
          // setFormData({ email: '', password: '' });
        }
      };
    
      const validateForm = (): boolean => {
        let isValid = true;
        const { email, password } = formData;
        const newErrors: FormState = { email: '', password: ''};
    
        if (!email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!isValidEmail(email)) {
          newErrors.email = 'Invalid email address';
          isValid = false;
        }
    
        if (!password.trim()) {
          newErrors.password = 'Password is required';
          isValid = false;
        } else if (password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters long';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };
    
      const isValidEmail = (email: string): boolean => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">  
            <div className="bg-white p-3 rounded w-25">
                <form action="" onSubmit={handleSubmit}>
                <h2>Welcome Back!</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                      {/* <div className="alert alert-danger">
                        Please enter a correct email or password.
                      </div> */}
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label"><strong>Password:</strong></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    {/* <div className="mb-3">
                      <label>
                        Log In as:
                        <select 
                          name="usertype"
                          value={formData.usertype}
                          onChange={handleSelect}>
                          <option value="User">User</option>
                          <option value="Chef">Chef</option>
                        </select>
                      </label>
                    </div> */}
                    {/* <div className="form-check mb-3">
                        <label className="form-check-label">
                            <input  
                                className="form-check-input" 
                                type="checkbox"
                                name="remember">
                                    Remember me
                            </input>
                        </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary mb-2">
                        Log In
                    </button>
                    <p>New User?</p>
                    <Link to="/register" className="btn btn-defual border w-100 bg-light">
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    )
};
