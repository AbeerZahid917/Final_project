import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';



export default function Signup(props) {
    const [creds, setCreds] = useState({name: "", email: "", password: "", cpassword: "", role: "viewer"});
    let history = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/authentication/createuser";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name: creds.name, email: creds.email, password: creds.password, cpassword: creds.cpassword, role: creds.role})
        });
        const json_res = await response.json();
        console.log(json_res);
        
        if (json_res.success)
        {
            localStorage.setItem('token', json_res.auth_token);
            localStorage.setItem('role', json_res.type);
            props.setIsAdmin(true);
            history("/login");
            props.showAlert("Successfully signed up", "success")
        }
        else
        {
            props.showAlert("invalid creds", "danger");
        }
    }




    const handleChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }


    return (
        <div className='container mt-3 text-light'>
            <h2 className='my-2'>Signup</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input style={{backgroundColor: '#636262'}} type="name" className="form-control text-light" id="name" name="name" onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input style={{backgroundColor: '#636262'}} type="email" className="form-control text-light" id="email" name="email" onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input style={{backgroundColor: '#636262'}} type="password" className="form-control text-light" id="password" name="password" onChange={handleChange}/>
            </div>

            
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input style={{backgroundColor: '#636262'}} type="password" className="form-control text-light" id="cpassword" name="cpassword" onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <input style={{backgroundColor: '#636262'}} type="role" className="form-control text-light" id="role" name="role" onChange={handleChange}/>
            </div>

            <button type="submit" className="btn text-light mb-4" style={{backgroundColor: '#a31212'}}>Submit</button>
            </form>
        </div>
    )
}