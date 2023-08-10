import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { UserProfile } from "../redux/actions/profileAction";


export type KitchenState = {
    id: string
    name: string
    address: string
    contact: string
    cuisineType: string
    imgUrl: string
    file: File | null
}

export const NewKitchenForm: React.FC = () => {
    const [formData, setFormData] = useState<KitchenState>({
        id: '',
        name: '',
        address: '',
        contact: '',
        cuisineType: '',
        imgUrl: '',
        file: null
    });

    const [errors, setErrors] = useState<KitchenState>({
        id: '',
        name: '',
        address: '',
        contact: '',
        cuisineType: '',
        imgUrl: '',
        file: null,
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
        const { id, name, address, contact, cuisineType, imgUrl, file} = formData;
        const newErrors: KitchenState = {
            id: '',
            name: '',
            address: '',
            contact: '',
            cuisineType: '',
            imgUrl: '',
            file: null
        };

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
    
        if (!address.trim()) {
            newErrors.address = 'Address is required';
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
                    <label htmlFor="address" className="form-label"><strong>Kitchen's Address:</strong></label>
                    <input 
                        type="text" 
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
   