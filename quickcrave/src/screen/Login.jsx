import React,{useState} from 'react';
import { json, Link,useNavigate } from 'react-router-dom';

function Login() {
    const [credentials,setcredentials]=useState({email:"",password:""});
    let navigate=useNavigate();

    const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
    
    const response=await fetch('http://localhost:5000/api/loginuser',{
       method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
       body:JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const data=await response.json();
    console.log(data);
    
    if(!data.success){
    alert("Enter valid credentials");
    }
    if(data.success){
      let userEmail=credentials.email;
      localStorage.setItem("authToken",data.authToken);
      localStorage.setItem("userEmail",userEmail);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
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
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link className="m-3 btn btn-danger" to="/createuser">I am new User</Link>
        </form>
      </div>
      </>
  )
}

export default Login