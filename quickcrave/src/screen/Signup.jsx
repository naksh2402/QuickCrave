import React, { useState } from "react";
import {json, Link,useNavigate} from 'react-router-dom';
function Signup() {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""});
  let navigate=useNavigate();
const handleSubmit=async(e)=>{
e.preventDefault();
console.log(JSON.stringify({name:credentials.name,email:credentials.email,location:credentials.geolocation,password:credentials.password}));
const response=await fetch('http://localhost:5000/api/createuser',{
   method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
   body:JSON.stringify({name:credentials.name,email:credentials.email,location:credentials.geolocation,password:credentials.password})
})
const data=await response.json();
console.log(data);

if(!data.success){
alert("Enter valid credentials");
}
if(data.success){
  navigate('/login');
}
}

const onchange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value});
}

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onchange} />
            <div id="emailHelp" className="form-text mb-3">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password} onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" id="address" name="geolocation" value={credentials.geolocation} onChange={onchange}/>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link className="m-3 btn btn-danger" to="/login">Already a User?</Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
