// import React, { useState } from "react";
// import Button from "../ui/Button.jsx";
// import InputField from "../ui/InputField.jsx";

// export default function UserManagement() {
//   const [form, setForm] = useState({
//     firstName: "JOHN",
//     lastName: "HADER",
//     phone: "+1800-000-561",
//     email: "johnhader@gmail.com",
//     postcode: "",
//     city: "",
//     state: "",
//     country: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//       {/* Profile Card */}
//       <div className="col-span-1 p-6 shadow-lg bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
//         <div className="flex flex-col items-center text-center">
//           <div className="relative w-24 h-24 mb-4 overflow-hidden bg-gray-100 border-4 border-green-500 rounded-full">
//             <img
//               src="https://via.placeholder.com/100"
//               alt="Profile"
//               className="object-cover w-full h-full"
//             />
//             <Button 
//               variant="ghost" 
//               size="small"
//               className="absolute inset-0 w-full h-full transition-opacity opacity-0 hover:opacity-100"
//             >
//               Change
//             </Button>
//           </div>
//           <h2 className="text-xl font-semibold text-green-800">
//             {form.firstName} {form.lastName}
//           </h2>
//           <p className="text-sm text-green-600">Software Engineer</p>
//           <p className="mt-2 text-sm text-gray-600">
//             15 Bartholomew Row, Birmingham B5 5JU, United Kingdom
//           </p>
//           <span className="px-2 py-1 mt-3 text-xs font-semibold text-green-700 bg-green-200 rounded-full">
//             Active
//           </span>
//           <p className="mt-2 text-blue-600">{form.email}</p>
//           <Button variant="secondary" className="w-full mt-4">
//             View Public Profile
//           </Button>
//         </div>
//       </div>

//       {/* Editable Form */}
//       <div className="col-span-2 p-6 bg-white shadow-lg rounded-xl">
//         <h3 className="mb-6 text-xl font-bold text-green-700">
//           Personal Information
//         </h3>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <InputField
//             label="First Name"
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="Enter your first name"
//             required
//           />
//           <InputField
//             label="Last Name"
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Enter your last name"
//             required
//           />
//           <InputField
//             label="Phone Number"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Enter your phone number"
//             required
//           />
//           <InputField
//             label="Email Address"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />
//           <InputField
//             label="City"
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//             placeholder="Enter your city"
//           />
//           <InputField
//             label="State/Country"
//             name="state"
//             value={form.state}
//             onChange={handleChange}
//             placeholder="Enter your state or country"
//           />
//           <InputField
//             label="Postcode"
//             name="postcode"
//             value={form.postcode}
//             onChange={handleChange}
//             placeholder="Enter your postcode"
//           />
//           <InputField
//             label="Country"
//             name="country"
//             value={form.country}
//             onChange={handleChange}
//             placeholder="Enter your country"
//           />
//         </div>
//         <div className="flex justify-end mt-6">
//           <Button 
//             variant="primary" 
//             size="medium"
//             className="text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
//           >
//             Update Profile
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Button from "../ui/Button.jsx";
// import InputField from "../ui/InputField.jsx";
// import axios from "axios";

// export default function UserManagement() {
//   const [form, setForm] = useState({
//     firstName: "JOHN",
//     lastName: "HADER",
//     phone: "+1800-000-561",
//     email: "johnhader@gmail.com",
//     address: "15 Bartholomew Row, Birmingham B5 5JU",
//     postcode: "",
//     city: "Birmingham",
//     state: "",
//     country: "United Kingdom",
//     profileImage: "https://via.placeholder.com/100"
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [originalForm, setOriginalForm] = useState({});

//   useEffect(() => {
//     // Fetch user data from backend when component mounts
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/user/profile');
//         setForm(response.data);
//         setOriginalForm(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       // Upload to Cloudinary
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'your_upload_preset');

//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
//         formData
//       );

//       // Update profile image in state and backend
//       const imageUrl = response.data.secure_url;
//       setForm({ ...form, profileImage: imageUrl });
      
//       await axios.patch('/api/user/profile', { profileImage: imageUrl });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch('/api/user/profile', form);
//       setOriginalForm(form);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleCancel = () => {
//     setForm(originalForm);
//     setIsEditing(false);
//   };

//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//       {/* Profile Card */}
//       <div className="col-span-1 p-6 shadow-lg bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
//         <div className="flex flex-col items-center text-center">
//           <div className="relative w-24 h-24 mb-4 overflow-hidden bg-gray-100 border-4 border-green-500 rounded-full">
//             <img
//               src={form.profileImage}
//               alt="Profile"
//               className="object-cover w-full h-full"
//             />
//             <label className="absolute inset-0 w-full h-full transition-opacity opacity-0 cursor-pointer hover:opacity-100">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//               <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
//                 <span className="text-xs text-white">Change</span>
//               </div>
//             </label>
//           </div>
//           <h2 className="text-xl font-semibold text-green-800">
//             {form.firstName} {form.lastName}
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {form.address}
//             {form.postcode && `, ${form.postcode}`}
//             {form.city && `, ${form.city}`}
//             {form.country && `, ${form.country}`}
//           </p>
//           <span className="px-2 py-1 mt-3 text-xs font-semibold text-green-700 bg-green-200 rounded-full">
//             Active
//           </span>
//           <p className="mt-2 text-blue-600">{form.email}</p>
//           <Button 
//             variant="secondary" 
//             className="w-full mt-4 text-gray-800 bg-yellow-400 hover:bg-yellow-500"
//           >
//             View Public Profile
//           </Button>
//         </div>
//       </div>

//       {/* Editable Form */}
//       <div className="col-span-2 p-6 bg-white shadow-lg rounded-xl">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-bold text-green-700">
//             Personal Information
//           </h3>
//           {!isEditing ? (
//             <Button 
//               variant="primary"
//               onClick={() => setIsEditing(true)}
//               className="text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
//             >
//               Edit Profile
//             </Button>
//           ) : (
//             <div className="flex gap-2">
//               <Button 
//                 variant="ghost"
//                 onClick={handleCancel}
//                 className="border border-gray-300 hover:bg-gray-100"
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 variant="primary"
//                 onClick={handleSubmit}
//                 className="text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
//               >
//                 Save Changes
//               </Button>
//             </div>
//           )}
//         </div>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <InputField
//             label="First Name"
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="Enter your first name"
//             required
//             disabled={!isEditing}
//           />
//           <InputField
//             label="Last Name"
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Enter your last name"
//             required
//             disabled={!isEditing}
//           />
//           <InputField
//             label="Phone Number"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Enter your phone number"
//             required
//             disabled={!isEditing}
//           />
//           <InputField
//             label="Email Address"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//             disabled={!isEditing}
//           />
//           <InputField
//             label="Address"
//             name="address"
//             value={form.address}
//             onChange={handleChange}
//             placeholder="Enter your address"
//             disabled={!isEditing}
//           />
//           <InputField
//             label="City"
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//             placeholder="Enter your city"
//             disabled={!isEditing}
//           />
//           <InputField
//             label="Postcode"
//             name="postcode"
//             value={form.postcode}
//             onChange={handleChange}
//             placeholder="Enter your postcode"
//             disabled={!isEditing}
//           />
//           <InputField
//             label="Country"
//             name="country"
//             value={form.country}
//             onChange={handleChange}
//             placeholder="Enter your country"
//             disabled={!isEditing}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Button from "../ui/Button.jsx";
// import InputField from "../ui/InputField.jsx";
// import axios from "axios";

// export default function UserManagement() {
//   const [form, setForm] = useState({
//     firstName: "", lastName: "", phone: "", email: "",
//     address: "", postcode: "", city: "", state: "", country: "",
//     profileImage: "https://via.placeholder.com/100",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [originalForm, setOriginalForm] = useState({});
//   const [tempImage, setTempImage] = useState(null); // temporary image buffer

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const { data } = await axios.get('/api/user/profile');
//         setForm(data);
//         setOriginalForm(data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     try {
//       const base64String = await fileToBase64(file);
//       setTempImage(base64String); // save to temporary buffer
//       setForm(prevForm => ({ ...prevForm, profileImage: base64String }));
//     } catch (error) {
//       console.error("Error processing image:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let cloudinaryUrl = form.profileImage;

//       if (tempImage && tempImage.startsWith("data:")) {
//         const uploadRes = await axios.post('/api/user/profile/image', { image: tempImage });
//         cloudinaryUrl = uploadRes.data.profileImage;
//       }

//       await axios.put('/api/user/profile', { ...form, profileImage: cloudinaryUrl });

//       setOriginalForm({ ...form, profileImage: cloudinaryUrl });
//       setTempImage(null); // clear temp buffer after successful save
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleCancel = () => {
//     setForm(originalForm);
//     setTempImage(null);
//     setIsEditing(false);
//   };

//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//       <div className="col-span-1 p-6 shadow-lg bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
//         <div className="flex flex-col items-center text-center">
//           <div className="relative w-48 h-48 mb-4 overflow-hidden border-4 border-green-500 rounded-full">
//             <img src={form.profileImage} alt="Profile" className="object-cover w-full h-full" />
//             <label className="absolute inset-0 cursor-pointer">
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//               <div className="flex items-center justify-center w-full h-full transition-opacity duration-200 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
//                 <span className="text-xs text-white">Change</span>
//               </div>
//             </label>
//           </div>
//           <h2 className="text-xl font-semibold text-green-800">{form.firstName} {form.lastName}</h2>
//           <span className="mt-2 text-blue-600">{form.email}</span>
//           <span className="px-2 py-1 mt-3 text-xs font-semibold text-green-700 bg-green-200 rounded-full">Active</span>
//         </div>
//       </div>

//       <div className="col-span-2 p-6 bg-white shadow-lg rounded-xl">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-bold text-green-700">Personal Information</h3>
//           {!isEditing ? (
//             <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
//           ) : (
//             <div className="flex gap-2">
//               <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
//               <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           {['firstName', 'lastName', 'phone', 'email', 'address', 'city', 'postcode', 'state', 'country'].map(field => (
//             <InputField
//               key={field}
//               label={field.charAt(0).toUpperCase() + field.slice(1)}
//               name={field}
//               value={form[field] || ''}
//               onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
//               placeholder={`Enter your ${field}`}
//               disabled={!isEditing}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Button from "../ui/Button.jsx";
import InputField from "../ui/InputField.jsx";
import axios from "axios";

export default function UserManagement() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    address: "", postcode: "", city: "", state: "", country: "",
    profileImage: "https://via.placeholder.com/100",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalForm, setOriginalForm] = useState({});
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/user/profile');
        setForm(data);
        setOriginalForm(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64String = await fileToBase64(file);
      setForm(prevForm => ({ ...prevForm, profileImage: base64String }));
      setTempImage(base64String);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let cloudinaryUrl = form.profileImage;

      if (tempImage && tempImage.startsWith("data:")) {
      const uploadRes = await axios.post('/api/user/profile/image', { image: tempImage },{
        headers: {
          'Content-Type': 'application/json'
        },
      });
      cloudinaryUrl = uploadRes.data.profileImage;
      }

      await axios.put('/api/user/profile', { ...form, profileImage: cloudinaryUrl });

      setOriginalForm({ ...form, profileImage: cloudinaryUrl });
      setTempImage(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setForm(originalForm);
    setTempImage(null);
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="col-span-1 p-6 shadow-lg bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-48 h-48 mb-4 overflow-hidden border-4 border-green-500 rounded-full">
            <img src={form.profileImage} alt="Profile" className="object-cover w-full h-full" />
            <label className="absolute inset-0 cursor-pointer">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div className="flex items-center justify-center w-full h-full transition-opacity duration-200 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                <span className="text-xs text-white">Change</span>
              </div>
            </label>
          </div>
          <h2 className="text-xl font-semibold text-green-800">{form.firstName} {form.lastName}</h2>
          <span className="mt-2 text-blue-600">{form.email}</span>
          <span className="px-2 py-1 mt-3 text-xs font-semibold text-green-700 bg-green-200 rounded-full">Active</span>
        </div>
      </div>

      <div className="col-span-2 p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-green-700">Personal Information</h3>
          {!isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {['firstName', 'lastName', 'phone', 'email', 'address', 'city', 'postcode', 'state', 'country'].map(field => (
            <InputField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={form[field] || ''}
              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder={`Enter your ${field}`}
              disabled={!isEditing}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
