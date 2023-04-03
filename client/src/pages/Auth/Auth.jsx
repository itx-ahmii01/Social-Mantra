import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch , useSelector} from 'react-redux'
import { signUp } from "../../actions/AuthAction.js";
import { logIn } from "../../actions/AuthAction.js";

const Auth = () => {

  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [IsSignUp, setIsSignUp] = useState(true)
  console.log(loading)
  const [data, setData] = useState({firstname: "", lastname: "", password:"", confirmpass:"", username:""})
 
  const[confirmpass, setConfirmPass] = useState(true)


 const handleChange = (e)=> {

  setData({...data, [e.target.name]: e.target.value})

 }

 const handleSubmit = (e)=>{

  e.preventDefault();

  if(IsSignUp)
  {
    data.password === data.confirmpass? dispatch(signUp(data)) : setConfirmPass(false);
    
  }
  else
  {
    dispatch(logIn(data))
  }
 }

  // Reset Form
  const resetForm = () => {

    setConfirmPass(true);
    setData({
      firstname: "", lastname: "", password:"", confirmpass:"", username:""
    });
    
  };


  return (
    <div className="Auth">

      {/* LeftSide */}

      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Mantra</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

    {/* RightSide */}

      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{IsSignUp ? "Sign up":"Log In"}</h3>

        
        {IsSignUp && 

        <div>

        <input
        type="text"
        placeholder="First Name"
        className="infoInput"
        name="firstname"
        onChange={handleChange}
        value = {data.firstname}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="infoInput"
        name="lastname"
        onChange={handleChange}
        value = {data.lastname}
      />
    </div>}
          

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
            onChange={handleChange}
            value = {data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value = {data.password}
          />
           {IsSignUp && 
           <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
            onChange={handleChange}
            value = {data.confirmpass}
          />}
          
        </div>

        <span style={{display: confirmpass? "none":"block", color: 'red', fontSize: '12px', alignSelf: "flex-end", marginRight:"5px" }}>

           *confirmpass is not same

        </span>

        <div>
            <span style={{fontSize: '12px'}} onClick= {()=>{setIsSignUp((prev)=>!prev); resetForm()}}> {IsSignUp ? "Already have an account. Login!" : "Dont have an account. Sign Up! "}</span>
        </div>
        <button className="button infoButton" type="submit" disabled = {loading}>{ loading? "Loading..." : IsSignUp ? "Signup":"Log In"}</button>
      </form>
    </div>
      
    </div>
  );
};


export default Auth;
