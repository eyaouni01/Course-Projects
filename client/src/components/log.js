
import React, { useState, useEffect } from 'react';
import Header from './header.js';
import axios from 'axios';
import '../log.css';
import evey from '../evey.jpg';
import google from '../google.png';
function Log(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState('');
    const register=()=>{
        axios.post('http://localhost:5000/users/user',{
          name:username,
          password:password,
          email:email
        })
          .then(response => {
           console.log(response);
          })
          .catch(error => {
            console.log(error,12);
          });
    }
    return(
        <section>
       <Header/>
      <div className='containerlog'>
       <div className='signup-box'>
        <div className='col-1'>
            <img src={evey}/>
        </div>
        <div className='col-2'>
            <h2>Welcome to Evey Podcast</h2>
            <span >Don't have an account ? <a href='#'id="log">Sign Up now</a></span>
            < a href="" className='google-link'>
                <img src={google}/> Continue with Google 
            </a>
            <h4>Or</h4>
            <form>
                <label>Username</label>
                <input type="text" placeholder='enter your name' className='input-field' onChange={e=>{setUsername(e.target.value)}}/>
                <label>Email Adress</label>
                <input type="email" placeholder='enter your email' className='input-field' onChange={e=>{setEmail(e.target.value)}}/>
                <label>Password</label>
                <input type="password" placeholder='enter your password' className='input-field'onChange={e=>{setPassword(e.target.value)}}/>
                <div className='row'>
                    <input type="radio" checked/>
                    <span> <a href='#'>Forgot my password? </a></span>
                </div>
                <button type="submit"onClick={register}>Register Now</button>
            </form>
        </div>
       </div>
      </div>
       </section>

    )
}
export default Log;