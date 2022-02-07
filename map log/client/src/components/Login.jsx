import "./Logins.css";
import React,{useState ,useRef} from 'react';
import RoomIcon from '@mui/icons-material/Room';
import axios from "axios";
import { Cancel } from "@material-ui/icons";

export default function Login({setShowLogin,myStorage, setCurrentUser}) {
  
    const [error, setError] = useState(false);
    const nameRef =useRef();
    const passwordRef =useRef();
const handleSubmit = async(e) => {
    e.preventDefault();
    const user ={
        username:nameRef.current.value,
        password:passwordRef.current.value,
    };
    try {
        const res = await axios.post(process.env.REACT_APP_LOGIN , user);
        myStorage.setItem('user',res.data.username);
        console.log(res.data.username);
         setCurrentUser(res.data.username);
         setShowLogin(false);
           setError(false); 
    } catch (error) {
       setError(true); 
    }
}
  return (
      <div className="loginContainer">
          <div className="logo">
           <RoomIcon/> 
            Login
          </div>
   <form onSubmit={handleSubmit}>
       <input type="text" placeholder="username"  ref={nameRef}/>
       <input type="password" placeholder="password" ref={passwordRef} />

   <button className="loginbutton">Login</button>
   {error && <span className="failure">something went Wrong</span>}
   </form>
   <Cancel className="loginCancel" onClick={() => setShowLogin(false)}/>
         
      </div>
  );
}