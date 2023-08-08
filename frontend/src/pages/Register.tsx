import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface FormState {
    fname: string;
    lname: string;
    address: string
    email: string;
    password: string;
  }
  
export const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        fname: '',
        lname: '',
        address: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormState>({
        fname: '',
        lname: '',
        address: '',
        email: '',
        password: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //   const { name, value } = e.target;
    //   setFormData({ ...formData, [name]: value });
      
    // };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
          // Handle form submission (e.g., API call, save data, etc.)
          handleRegister()
          console.log('Form data:', formData);
          // Clear the form after successful submission
          // setFormData({ fname: '',lname: '', address: '',email: '', password: '' });
        }
      };
      
      const handleRegister = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth",
            formData
          );
          console.log(formData)
          // console.log('Successful registered. Response:', response.data);
          if (response.status === 200) {
            console.log("Register is success!")
          }
          else {
            console.log("Register is failed")
          }
        //   setErrors(null); // Clear any previous errors if login succeeds
        } catch (err) {
            console.error('Register failed:', errors);
        }
      };
    
      const validateForm = (): boolean => {
        let isValid = true;
        const { fname, lname, address, email, password } = formData;
        const newErrors: FormState = { fname: '',lname: '', address: '',email: '', password: '' };


        if (!fname.trim()) {
            newErrors.fname = 'First name is required';
            isValid = false;
        }
        if (!lname.trim()) {
            newErrors.lname = 'Last name is required';
            isValid = false;
        }
        if (!address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }
    
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
                <div className="mb-3">
                        <label htmlFor="fname" className="form-label"><strong>Fist Name:</strong></label>
                        <input 
                            type="fname" 
                            className="form-control" 
                            id="fname"
                            placeholder="Enter fist name"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                        />
                        {errors.fname && <span className="text-danger">{errors.fname}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lname" className="form-label"><strong>Last Name:</strong></label>
                        <input 
                            type="lname" 
                            className="form-control" 
                            id="lname"
                            placeholder="Enter last name"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                        />
                        {errors.lname && <span className="text-danger">{errors.lname}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label"><strong>Address:</strong></label>
                        <input 
                            type="address" 
                            className="form-control" 
                            id="address"
                            placeholder="Enter address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <span className="text-danger">{errors.address}</span>}
                    </div>
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
                        Register as:
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
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    <p>Already a users?</p>
                    <Link to="/login" className="btn btn-defual border w-100 bg-light">
                        Login
                    </Link>
                </form>
            </div>
        </div>
    )
};
