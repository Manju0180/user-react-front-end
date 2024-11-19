import React, { useEffect, useState } from 'react';

export default function UpdateUserForm({user, setUsers, users, setEditUser}){

    const[formData, setFormData] = useState({
        Name:"",
        Email:"",
        Phone:""
    });

    useEffect(() => {
        if(user){
            setFormData({
                Name:user.Name,
                Email:user.Email,
                Phone:user.Phone
            })
        }

    },[user])

    const handleInputChange =(e) => {
        const{name, value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSave =() => {
        const updatedUsers = users.map((u) => u.id === user.id ? { ...u, ...formData } : u);
        setUsers(updatedUsers);
        setEditUser(null);
    }

    return(
        <div className='conatiner m-3'>
            <h3 >Update User</h3>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='mb-3'>
                <label htmlFor="name" className='form-label'>Enter Name</label>
                <input 
                type="text" 
                className='form-control'
                id='name'
                name='Name'
                value={formData.Name}
                onChange={handleInputChange}
                />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" classNameame='form-label'>Enter Email</label>
                    <input 
                    type="text" 
                    className='form-control'
                    id='email'
                    name='Email'
                    value={formData.Email}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className='form-lable'>Enter Phone</label>
                    <input 
                    type="text"
                    className='form-control'
                    id='phone'
                    name='Phone'
                    value={formData.Phone}
                    onChange={handleInputChange}
                     />
                </div>

                <button type='button' className='btn btn-success' onClick={handleSave}>Update</button>
                <button type='button' className='btn btn-danger' onClick={() => setEditUser(null)}>Close</button>
                
            </form>
        </div>
    )
}