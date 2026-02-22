import { useState } from "react"
import { useNavigate,Link } from "react-router-dom";

import axios from "axios";


function Login(){
    let [email,setEmail]=useState("");
    let [pwd,setPwd]=useState("");
    const navigate=useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        
        
        
      axios.post("https://backend-zerodhaclone.onrender.com/login",{
            email:email,
            password:pwd
        },
{
    withCredentials: true
}).then((res)=>{
        //    console.log(res);
           
            if(res.data.success){
                navigate("/");
            }else{

                navigate("/signin");
            }
            

            
        }).catch((err)=>{
            navigate("/signin");
            // console.log(err);
            
        }
        )
        
    }
    function handleEmail(e){
       setEmail(e.target.value);
    }
    function handlePwd(e){
       setPwd(e.target.value);
    }
    return(
    <div className="loginContainer">
        <form onSubmit={handleSubmit} className="loginForm">

            <h2>Welcome Back</h2>
            <p className="subtitle">Login to your dashboard</p>

            <label>Email</label>
           <input type="text" placeholder="enter email" onChange={(e)=>handleEmail(e)} value={email} required/>

            <label>Password</label>
            <input type="text" placeholder="enter password" onChange={(e)=>handlePwd(e)} value={pwd} required/>

            <button className="loginBtn">Login</button>
            <p className="signupText">
    Don’t have an account? 
    <Link to="/signup" className="signupLink"> Sign up</Link>
</p>
        </form>
    </div>
)
}
export default Login;