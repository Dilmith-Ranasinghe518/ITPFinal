//import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import {useNavigate} from 'react-router'
import React, { useState, useEffect } from 'react';



function UpdateUser() {

     const [inputs,setInputs] = useState({});
     const history = useNavigate();
     const id = useParams().id;

     useEffect(()=>{
        const fetchHandler = async () => {
            await axios
            .get(`/api/users/${id}`)
            .then((res)=> res.data)
            .then((data) => setInputs(data.user));
        };
        fetchHandler();
        }, [id]);

        const sendRequest = async () => {
            await axios 
            .put(`/api/users/${id}`, {

                name:String (inputs.name),
                gmail:String (inputs.gmail),
                age:Number (inputs.age),
                address:String (inputs.address),
            } )
            .then((res) => res.data)
        };

        const handleChange = (e) => {
            setInputs((prevState) => ({...prevState, [e.target.name]: e.target.value}));
          };
          const handleSubmit = (e) => {
            e.preventDefault();
            console.log(inputs);
            sendRequest().then(()=> history("/userdetails"));
          };


     

  return (
    <div>
      <h1>Update User</h1>
      <form  onSubmit={handleSubmit}>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" onChange={handleChange} value={inputs.name} placeholder="Enter your name" required />
    </div>

    <div>
      <label for="gmail">Gmail:</label>
      <input type="email" id="gmail" name="gmail" onChange={handleChange} value={inputs.gmail}  placeholder="Enter your Gmail" required />
    </div>

    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" name="age" onChange={handleChange} value={inputs.age} placeholder="Enter your age" required />
    </div>

    <div>
      <label for="address">Address:</label>
      <input type="text" id="address" name="address" onChange={handleChange} value={inputs.address} placeholder="Enter your address" rows="4" required></input>
    </div>

    <button type="submit">Submit</button>
  </form>




    </div>
  )
}

export default UpdateUser
