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
    file: File | null
}

export const NewItemForm: React.FC = () => {
        
        const [formData, setFormData] = useState<MenuItemState>({
            id: '',
            name: '',
            price: 0.00,
            description: '',
            category: '',
            imgUrl: '',
            file: null,
        });

        const [errors, setErrors] = useState<MenuItemState>({
            id: '',
            name: '',
            price: 0.00,
            description: '',
            category: '',
            imgUrl: '',
            file: null,
        });

        


        const stateUserProfile = useSelector((state: any) => state.userProfile) as UserProfile;

        const handleNewItem = async (token:string) => {
            try {

                const customHeaders = {
                    'token': token,
                    "Content-Type": "multipart/form-data"
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

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                //setSelectedFile(event.target.files[0]);
                const { name } = event.target;
                setFormData({ ...formData, [name]: event.target.files[0] });
            }
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            if (validateForm()) {
            // Handle form submission (e.g., API call, save data, etc.)
            handleNewItem(stateUserProfile.webtoken);
            console.log('bodyFormData:', formData);
            // Clear the form after successful submission
            // setFormData({ id: '',name: '',price: ,description: '',category: '',imgUrl: '', });
            }
        };


        const validateForm = (): boolean => {
            let isValid = true;
            const { id, name, price, description, category, imgUrl, file } = formData;
            const newErrors: MenuItemState = { 
                id: '',
                name: '',
                price: 0.00,
                description: '',
                category: '',
                imgUrl: '', 
                file: null
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
            
            // if (!price.trim()) {
            //     newErrors.price = 'Price is required';
            //     isValid = false;
            // }

            if (!formData.file) {
                alert("Please select an image file!");
            }
        
            setErrors(newErrors);
            return isValid;
        
        }   
    
    return (
        <div className="mb-3">
            {/* <Link to="/kitchen" className=" w-50 text-black-50">Back to kitchen</Link> */}
            <Link to="/myaccount" className=" w-50 text-black-50">Back to My Account</Link>
            <div className="bg-white p-3 rounded w-50">
                <form action="" onSubmit={handleSubmit}>
                <h2>Menu Form</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"><strong>Item's Name:</strong></label>
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
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Price</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input 
                            type="number" 
                            id="orice" 
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}>
                            </input>   
                        </div>
                    </div>
                    <div className="m-3">
                        <label className="mx-3"> </label>
                        <input 
                            className="form-control" 
                            type="file" 
                            name="file" 
                            onChange={handleFileChange} />
                        {/* <button className="btn btn-outline-primary">Upload</button> */}
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">
                        Submit
                    </button>
                    
                </form>
            </div>
        </div>
    )
};