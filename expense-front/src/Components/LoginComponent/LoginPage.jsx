import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { ValidateUser } from '../../Services/LoginService';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
const checkLogin=(e)=>{
        e.preventDefault();
       
         ValidateUser(username,password).then((response)=>{
         let category=String(response.data);
         alert(category);
          if(category==="Admin")
              navigate('/AdminMenu');
        else if(category==="Customer")
             navigate(`/CustomerMenu`);
        else
           alert("Wrong Userid/Password");
        });
    }
 
const registerNewUser=(e)=>{
            navigate('/RegisterUser');
    }
       
  return  (
    <div className="login-background">
         <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4 w-50">
                <h2 className="text-center mb-4 text-primary">Login</h2>
        
 
                            <form  method="get">
                              <div className = "form-group">
                                   <label>User Name: </label>
                                  <input placeholder="Enter username" name="username" className="form-control"
                                      value={username} onChange={(e) => setUsername(e.target.value)} />
                              </div>
                              <div className = "form-group">
                                  <label>Password: </label>
                                  <input placeholder="Enter Password" type="password"   name="password" className="form-control"
                                      value={password} onChange={(e) => setPassword(e.target.value)}/>
                              </div>
                              <br/>
                              <button className='btn btn-primary' onClick={ (e) => checkLogin(e)}>Submit</button>
                          </form>
 
<div>
                          <h2 size="5" color='yellow'/>
                         <br/>
                       <button className='btn btn-info' onClick={ (e) => registerNewUser(e)}>Register New User</button>
                      </div>
                      </div>
                   </div>
              </div>
         )
 
 
};

export default LoginPage;
