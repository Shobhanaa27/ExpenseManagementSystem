import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import {registerNewUser} from "../../Services/LoginService";
const RegisterUser=()=>{
    const[expenseUser,setExpenseUser]=useState({
        username:"",
        password:"",
        email:"",
        category:"",
    });
    const [message, setMessage] = useState("");
    const[password2,setPassword2]=useState("");
   
    let navigate = useNavigate();



    const saveNewUser = (event) => {
        event.preventDefault();

        // Check for empty fields
       if (!expenseUser.username || !expenseUser.password || !password2 || !expenseUser.email || !expenseUser.category) {

        

        setMessage("Please fill in all the fields.");
      return;
    }

     // Password length validation
    if (expenseUser.password.length < 5 || expenseUser.password.length > 10) {
      setMessage("Password must be between 5 to 10 characters long.");
    return;
  }

      // Password match check
      if (expenseUser.password !== password2) {
        setMessage("Passwords do not match.");
       return;
      }

      setMessage("");
       if(expenseUser.password===password2){
        registerNewUser(expenseUser)
        .then((response) => {
          alert("User is registered successfully... Go for login");
          navigate("/LoginPage");
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          alert("Registration failed. Please try again.");
        });
      
       }
        else{
             alert("Passwords are not matched");
            return;
        }
      };
      const  onChangeHandler = (event) =>{
        event.persist();
        const name = event.target.name;
            const value = event.target.value;
           setExpenseUser(values =>({...values, [name]: value }));
         };
        console.log("RegisterUser component is rendering!");

    return(
      <div className="register-background">    
       <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4 w-50">
                <h2 className="text-center mb-4 text-primary">New User Registration</h2>
                {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}
        
                        <form  method="post">
                            <div className = "form-group">
                                 <label>User Name: </label>
                                <input placeholder="username" name="username" className="form-control"
                                    value={expenseUser.username} onChange={(event) => onChangeHandler(event)} />
                            </div>
                            <div className = "form-group">
                                <label>Password: </label>
                                <input type="password"   name="password" className="form-control"
                                    value={expenseUser.password} onChange={(event) => onChangeHandler(event)}/>
                            </div>
                            <div className = "form-group">
                                <label>Retype/Confirm Password: </label>
                                <input type="password"   name="password2" className="form-control"
                                    value={password2} onChange={(event) =>setPassword2(event.target.value)}/>
                            </div>
                            <div className = "form-group">
                                 <label>User Email: </label>
                                <input placeholder="email" name="email" className="form-control"
                                    value={expenseUser.email} onChange={(event) => onChangeHandler(event)} />
                            </div>
                            <div className = "form-group">
                               <label>Select Category : </label>
                                <input list="types"  name="category" className="form-control"
                                    value={expenseUser.category} onChange={(event) => onChangeHandler(event)} />
                                    <datalist id="types">
                                      <option value="Customer"/>
                                    <option value="Admin"/>
                                   </datalist>
                             </div>
                             <br/>
                            <button className='btn btn-primary' onClick={ (e) => saveNewUser(e)}>Submit</button>
                        </form>
 
                      </div>
                 </div>
            </div>
      
    );
}
export default RegisterUser;
