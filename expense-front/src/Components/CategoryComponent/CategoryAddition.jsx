import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import {saveCategory,generateCategoryId} from "../../Services/CategoryService";

const CategoryAddition=()=>{
  const history = useNavigate();
  const [message, setMessage] = useState(""); 
    const[category,SetCategory]= useState({
        categoryId:0,
        categoryName:"",
        description:""
});

const[newId,setNewId]=useState(0);
 
let navigate=useNavigate();

const setCategoryId = () => {
    generateCategoryId().then((response) => {
        setNewId(response.data); // Ensure response.data has the expected value
    }).catch(error => console.error(error)); // Add error handling
};


useEffect(()=>{
    setCategoryId()
},[]);


    const  onChangeHandler = (event) =>{
         event.persist();
            const name = event.target.name;
            const value = event.target.value;
            SetCategory(values =>({...values, [name]: value }));
     };


    const categorySave=(event)=>{
        event.preventDefault();
        const { categoryName, description } = category;

    if (!categoryName || !description) {
        setMessage("Both Category Name and Description are required.");
        return;
    }
        category.categoryId=newId;
       saveCategory(category).then((response) => {
            
                alert("Category Added Successfully");
                navigate('/AdminMenu');
                
               
                    });
    }

    return(
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50">
          <h2 className="text-center mb-4 text-primary">Category Addition</h2>
          {message && <div className="alert alert-danger text-center">{message}</div>}

                  <form>
                 <div className = "form-group">
                   <label>Category Id: </label>
                   <input placeholder="Category Id" name="categoryId" className="form-control" value={newId} />
                 </div>
                 <div className = "form-group">
                    <label>Category Name: </label>
                    <input placeholder="Category Name" name="categoryName" className="form-control"
                                    value={category.categoryName} onChange={onChangeHandler}/>
                 </div>
                 <div className = "form-group">
                    <label>Category Description: </label>
                    <input placeholder="Category Description" name="description" className="form-control"
                                    value={category.description} onChange={onChangeHandler}/>
                 </div>
                <button className="btn btn-success" onClick={categorySave}>Save</button>
                <button type="button" className="btn btn-danger" onClick={() => history(-1)}>Return</button>
             </form>
             </div>
      </div>
    
 

    );
};
export default CategoryAddition;