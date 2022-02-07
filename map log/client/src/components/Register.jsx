import "./register.css"
import React,{useState ,useRef} from 'react';
import RoomIcon from '@mui/icons-material/Room';
import axios from "axios";
import { Cancel } from "@material-ui/icons";

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef =useRef();
    const emailRef =useRef();
    const passwordRef =useRef();
const handleSubmit = async(e) => {
    e.preventDefault();
    const newUser ={
        username:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,
    };
    try {
         await axios.post(process.env.REACT_APP_REGISTER , newUser)
           setError(false);
           setSuccess(true);
    } catch (error) {
       setError(true); 
    }
}
  return (
      <div className="registerContainer">
          <div className="logo">
           <RoomIcon/> 
            Register
          </div>
   <form onSubmit={handleSubmit}>
       <input type="text" placeholder="username"  ref={nameRef}/>
       <input type="email" placeholder="email" ref={emailRef} />
       <input type="password" placeholder="password" ref={passwordRef} />

   <button className="registerbutton">Register</button>
   {success && <span className="success">successfully registered</span>}
   {error && <span className="failure">Please Fill in the Form Correctly</span>}
   </form>
   <Cancel className="registerCancel" onClick={() => setShowRegister(false)}/>
         
      </div>
  );
}