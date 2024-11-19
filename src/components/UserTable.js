import React, { useState, useEffect } from "react";
import UpdateUserForm from "./UpdateUserForm";

export default function UserTable() {
  const [users, setUsers] = useState([{
    id:1, Name: "Hari", Email:"hari@gmail.com", Phone:"8902675890"
  }]);

  // const[isFormVisible, setIsFormVisible] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });

  const[editUser, setEditUser] =useState(null);

  // const toggleForm=() => {
  //     setIsFormVisible(!isFormVisible);
  // }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users"); // Replace with your API endpoint
        const result = await response.json();
        console.log(result);
        const formattedData = result.data.map(user => ({
          id: user.id,        // Ensure the field names match your API's response
          Name: user.fullname,
          Email: user.email,
          Phone: user.mobile,
        }));
        setUsers(formattedData); // Update the `users` state with fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleInputChnage = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const uid =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const addUserToBackEnd = async (userToAdd) => {
    try{
      const response = await fetch("http://localhost:3000/user", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userToAdd)
      });

      if(!response.ok){
        console.log("Error adding user");
      }

      const addedUser = await response.json();
      const formattedUser = {
        id: addedUser.id, // Match backend's response
        Name: addedUser.fullname, // Match backend field `fullname`
        Email: addedUser.email,
        Phone: addedUser.mobile,
      };
      console.log("user added successfully",formattedUser);

      setUsers((prevUser) => [...prevUser, formattedUser]);
    }
    catch(error){
      console.log("error occured making the api call",error);
    }
  }

  const addUser = () => {
    const userToAdd = {
      fullname: newUser.name,
      email: newUser.email,
      mobile: newUser.phone,
    };

    // setUsers([...users, userToAdd]);

    addUserToBackEnd(userToAdd);
    setNewUser({ name: "", email: "", phone: "" });
    // toggleForm(false);
    setShowForm(false);
  };

  const handleEditUser =(user) => {
    setEditUser(user);
    setShowForm(false);
  }

  return (
    <div className="conatiner mt-5">
      {showForm ? (
        <div className="mt-3">
          <h3>Add new user</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Enter the name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChnage}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChnage}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Enter Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChnage}
              />
            </div>

            <button className="btn btn-primary" onClick={addUser}>
              Add
            </button>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : editUser ? (
        <UpdateUserForm user={editUser} setUsers={setUsers} users={users} setEditUser={setEditUser} />
      ) : (
        
        <div>
          <h2>User data</h2>
          {users.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Phone}</td>
                    <td><div className="action-buttons">
                      <button type="button" className="btn btn-sm btn-success m-1" onClick={() => handleEditUser(user)}>Update</button>
                      <button type="button" className="btn btn-sm btn-danger m-1">Delete</button>
                      </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Users yet </p>
          )}
          {/* <button className='btn btn-primary mb-3' onClick={toggleForm}>{isFormVisible ? 'close' : 'Add User'} </button> */}
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(true)}
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}
