import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';





export default function Login(props) {
    const [creds, setCreds] = useState({email: "", password: ""});
    let history = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/authentication/login";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email: creds.email, password: creds.password})
        });
        const json_res = await response.json();
        console.log({message: json_res});

        if (json_res.success)
        {
            localStorage.setItem('token', json_res.auth_token);
            localStorage.setItem('role', json_res.type);
            props.setIsAdmin(true);
            history("/home");
            props.showAlert("Successfully logged in", "success");

        }
        else
        {
            props.showAlert("INnvalid creds","danger")
        }
    }


    const handleChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }



  return (
    <div className='container mt-4 text-light'>
        <h1 className='my-5' style={{color: '#d11717'}}>Netflix</h1>
        <h3 className='my-3'>Login</h3>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input style={{backgroundColor: '#636262'}} type="email" className="form-control text-light" value={creds.email} onChange={handleChange} id="email" name="email"/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input style={{backgroundColor: '#636262'}} type="password" className="form-control text-light" value={creds.password} onChange={handleChange} id="password" name="password"/>
            </div>
            <button type="submit" className="btn text-light mb-3" style={{backgroundColor: '#a31212'}}>Submit</button>
        </form>

    </div>
  )
}