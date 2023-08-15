import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { UserProfile } from "../redux/actions/profileAction";


export type KitchenState = {
    id: string
    name: string
    address1: string
    address2: string
    city: string
    state: string
    country:string
    zipcode: string
    contact: string
    cuisineType: string
    imgUrl: string
    file: File | null
}

export const NewKitchenForm: React.FC = () => {
    const [formData, setFormData] = useState<KitchenState>({
        id: '',
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country:'',
        zipcode: '',
        contact: '',
        cuisineType: '',
        imgUrl: '',
        file: null
    });

    const [errors, setErrors] = useState<KitchenState>({
        id: '',
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country:'',
        zipcode: '',
        contact: '',
        cuisineType: '',
        imgUrl: '',
        file: null
    });

    const stateUserProfile = useSelector((state: any) => state.userProfile) as UserProfile;
    
    const handleNewKitchen = async (token: string) => {
        try {

        const customHeaders = {
            'token': token,
            "Content-Type": "multipart/form-data"
        };

        const response = await axios.post(
            "http://localhost:5000/kitchen",
            formData,
            { headers: customHeaders }
        );
        console.log(formData)
        // console.log('Successful registered. Response:', response.data);
        if (response.status === 200) {
            console.log(" New kitchen is successfully created!")
        }
        else {
            console.log("Kitchen is failed to create.")
        }
        //   setErrors(null); // Clear any previous errors if login succeeds
        } catch (err) {
            console.error('Submision is failed:', errors);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            //setSelectedFile(event.target.files[0]);
            const { name } = event.target;
            setFormData({ ...formData, [name]: event.target.files[0] });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // console.log("handle change " + name + " " + value)
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
        // Handle form submission (e.g., API call, save data, etc.)
        handleNewKitchen(stateUserProfile.webtoken);
        console.log('Form data:', formData);
        // Clear the form after successful submission
        // setFormData({ id: '',name: '',address: '',contact: '',cuisineType: '',});
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const { id, name, address1, address2, city, state, country, zipcode, contact, cuisineType, imgUrl, file} = formData;
        const newErrors: KitchenState = {
            id: '',
            name: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            country:'',
            zipcode: '',
            contact: '',
            cuisineType: '',
            imgUrl: '',
            file: null
        };

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
    
        if (!address1.trim()) {
            newErrors.address1 = 'Address is required';
            isValid = false;
        }
    
        if (!contact.trim()) {
            newErrors.contact = 'Contact is required';
            isValid = false;
        } else if (contact.length === 9) {
            newErrors.contact = 'Contact must be 9 characters long';
            isValid = false;
        }
        
        if (!cuisineType.trim()) {
            newErrors.cuisineType = 'Cuisine Type is required';
            isValid = false;
        }

        if (!formData.file) {
            alert("Please select an image file!");
        }
    
        setErrors(newErrors);
        return isValid;
    
    } 

    return (
        <div className="mb-3">
        <Link to="/myaccount" className=" w-50 text-black-50">Back to My Account</Link>
        <div className="bg-white p-3 rounded w-50">
            <form action="" onSubmit={handleSubmit}>
            <h2>Kitchen Form</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Kitchen's Name:</strong></label>
                    <input 
                        type="text"
                        className="form-control" 
                        id="name"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                </div>
                
                <div className="mb-3">
                    <label htmlFor="address1" className="form-label"><strong>Kitchen's Address1:</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address1"
                        placeholder="Enter address"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                    />
                    {errors.address1 && <span className="text-danger">{errors.address1}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address2" className="form-label"><strong>Address2:</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address2"
                        placeholder="apt,..."
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                    {/* {errors.address1 && <span className="text-danger">{errors.address1}</span>} */}
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label"><strong>City:</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="city"
                        placeholder="Enter city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    {/* {errors.address1 && <span className="text-danger">{errors.address1}</span>} */}
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label"><strong>State:</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="state"
                        placeholder="Enter state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                    {/* {errors.address1 && <span className="text-danger">{errors.address1}</span>} */}
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label"><strong>Country:</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="country"
                        placeholder="Enter country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    {/* {errors.address1 && <span className="text-danger">{errors.address1}</span>} */}
                </div>
                <div className="mb-3">
                    <label htmlFor="zipcode" className="form-label"><strong>Zip Code:</strong></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="zipcode"
                        placeholder="Enter zipcode"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                    />
                    {/* {errors.address1 && <span className="text-danger">{errors.address1}</span>} */}
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label"><strong>Contact:</strong></label>
                    <input 
                        type="number"
                        className="form-control" 
                        id="contact"
                        placeholder="Enter contact number"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                    />
                    {errors.contact && <span className="text-danger">{errors.contact}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cuisineType" className="form-label"><strong>Cuisine Type:</strong></label>
                    <input
                        className="form-control" 
                        id="cuisineType"
                        placeholder="Example: Europe, Asian...etc"
                        name="cuisineType"
                        value={formData.cuisineType}
                        onChange={handleChange}
                    />
                    {errors.cuisineType && <span className="text-danger">{errors.cuisineType}</span>}
                </div>
                <div className="m-3">
                        <label className="mx-3"><strong>Choose a file:</strong> </label>
                        <input 
                            className="form-control"
                            name="file" 
                            type="file" 
                            onChange={handleFileChange} />
                        {/* <button className="btn btn-outline-primary">Upload</button> */}
                    </div>
                <button type="submit" className="btn btn-primary mb-2">
                    Save
                </button>
                
            </form>
        </div>
    </div>
    )
};
   