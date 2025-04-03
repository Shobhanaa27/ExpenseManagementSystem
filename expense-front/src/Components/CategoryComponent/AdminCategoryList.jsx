import React, {useState,useEffect} from "react";
import { useNavigate,Link } from 'react-router-dom';
import '../../LoginView.css';
import {displayAllCategories,deleteCategoryById} from "../../Services/CategoryService";


const AdminCategoryList=()=>{

    const[categories,setCategories]=useState([]);
    let navigate=useNavigate();

    const setCategoryData = () => {
        displayAllCategories()
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => console.error("Error fetching categories:", error));
      };

    useEffect(()=>{
        setCategoryData();
    },[]);
  
    const returnBack=()=>{
        navigate('/AdminMenu');
    }
    
    const removeCategory=(id)=>{
      deleteCategoryById(id).then( res => {
          let reaminCategory=categories.filter((category)=> (category.categoryId !== id));
          setCategories(reaminCategory);
      });
      alert("Deleted Successfully");
      navigate("/admin-category-list");
      
    }

    return(

        <div className="text-center">
        <div>
            <h2 className="text-center">Admin Category List</h2>
             <hr style={{height: "3px", borderWidth:0, color:"yellow", backgroundColor:"red"}}/>
              <div className = "row">
              <table className = "table table-striped table-bordered">
               <thead>
               <tr>
                 <th> Category Id</th>
                 <th> Category Name</th>
                 <th> Description </th>
                 <th>Update Category</th>
                 <th>Delete Category</th>
              </tr>
              </thead>
              <tbody>
                 {
                    categories.map((category, index) => (
                      <tr key = {category.categoryId}>
                      <td>{category.categoryId}</td>
                      <td>{category.categoryName}</td>
                      <td>{category.description}</td>
                      <td><Link to={`/update-category/${category.categoryId}`}><button style={{marginLeft: "10px"}}  className="btn btn-info">Update </button></Link></td>
                      <td><button style={{marginLeft: "10px"}} onClick={()=>removeCategory(category.categoryId)} className="btn btn-danger">Delete</button></td>
                      </tr>
                  ) )
               }                        
         </tbody>
        </table>
        <br/>
         <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>    
       </div>
     </div>
    </div>

    );

}


export default AdminCategoryList;