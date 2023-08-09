import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserProfile } from "../redux/actions/profileAction";

export type MenuItemState = {
    id: string
    name: string
    price: number 
    description: string
    category: string
    imgUrl: string
}

export const NewItemForm: React.FC = () => {
        const [formData, setFormData] = useState<MenuItemState>({
            id: '',
            name: '',
            price: 0.00,
            description: '',
            category: '',
            imgUrl: '',
        });

        const [errors, setErrors] = useState<MenuItemState>({
            id: '',
            name: '',
            price: 0,
            description: '',
            category: '',
            imgUrl: '',
        });

        const stateUserProfile = useSelector((state: any) => state.userProfile) as UserProfile;

        const handleNewItem = async (token:string) => {
            try {

            const customHeaders = {
                'token': token,
            };
        
            const response = await axios.post(
                "http://localhost:5000/menuItem",
                formData,
                { headers: customHeaders }
            );
            console.log(formData)
            // console.log('Successful registered. Response:', response.data);
            if (response.status === 200) {
                console.log(" New item is successfully created!")
            }
            else {
                console.log("Item is failed to create.")
            }
            //   setErrors(null); // Clear any previous errors if login succeeds
            } catch (err) {
                console.error('Submision is failed:', errors);
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (validateForm()) {
            // Handle form submission (e.g., API call, save data, etc.)
            handleNewItem(stateUserProfile.webtoken);
            console.log('Form data:', formData);
            // Clear the form after successful submission
            // setFormData({ id: '',name: '',price: 0,description: '',category: '',imgUrl: '', });
            }
        };


        const validateForm = (): boolean => {
            let isValid = true;
            const { id, name, price, description, category, imgUrl } = formData;
            const newErrors: MenuItemState = { 
                id: '',
                name: '',
                price: 0,
                description: '',
                category: '',
                imgUrl: '', 
            };


            if (!name.trim()) {
                newErrors.name = 'Name is required';
                isValid = false;
            }
        
            if (!description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
            // } else if (!isValidEmail(description)) {
            //   newErrors.description = 'Invalid email address';
            //   isValid = false;
            }
        
            if (!category.trim()) {
            newErrors.category = 'Category is required';
            isValid = false;
            } 
            // else if (category.length < 6) {
            // newErrors.category = 'Category must be at least 6 characters long';
            // isValid = false;
            // }
            
            // if (!price.()) {
            //     newErrors.price = 'Price is required';
            //     isValid = false;
            // }
        
            setErrors(newErrors);
            return isValid;
        
        }   
    
    return (
        <div className="mb-3">
            <Link to="/kitchen" className=" w-50 text-black-50">Back to kitchen</Link>
            <div className="bg-white p-3 rounded w-50">
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"><strong>Name:</strong></label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="Name"
                            placeholder="Enter name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"><strong>Description:</strong></label>
                        <textarea
                            className="form-control" 
                            id="description"
                            placeholder="Enter description"
                            name="description"
                            value={formData.description}
                            onChange={handleDescription}
                        />
                        {errors.description && <span className="text-danger">{errors.description}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label"><strong>Category:</strong></label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="category"
                            placeholder="Example: Dessert, Drink...etc"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                        {errors.category && <span className="text-danger">{errors.category}</span>}
                    </div>
                    <div className="input-group-text">
                        <label htmlFor="price" className="form-label"><strong>Price:</strong></label>
                        <span className="input-group-text">$</span>
                        <input 
                            type="number"
                            className="form-control" 
                            id="price"
                            placeholder="USD"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <span className="text-danger">{errors.price}</span>}
                    </div>
                    <div className="m-3">
                        <label className="mx-3"><strong>Choose a file:</strong>: </label>
                        <input className="d-none" type="file" />
                        <button className="btn btn-outline-primary">Upload</button>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">
                        Save
                    </button>
                    
                </form>
            </div>
        </div>
    )
};