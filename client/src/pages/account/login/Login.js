import React, { useState } from 'react'
import '../login/Login.css'
function Login() {

    const[action,setAction] = useState("Sign up");
    
    return (
        <div className='biggerContainer'>
            <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action ==="Login"?<div></div>:
                    <div className='input'>
                        <input type="text" placeholder='Name'></input>
                    </div>
                }
                
                <div className='input'>
                    <input type="email" placeholder='Email'></input>
                </div>
                <div className='input'>
                    <input type="password" placeholder='Password'></input>
                </div>
            </div> 
            {action==="Sign up"?<div></div>:
                <div className='forgot-password'>forgot password</div>
            }
            
            <div className='submit-container'>
                <div className={action==="Login"?'submit gray':'submit'} onClick={()=>{setAction("Sign up")}}>sign up</div>
                <div className={action==="Sign up"?'submit gray':'submit'} onClick={()=>{setAction("Login")}}>login</div>

            </div>
        </div>
        </div>
    )
}

export default Login
