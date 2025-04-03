import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../LoginView.css";
import { updateCategory, displayCategoryById } from "../../Services/CategoryService";

const CategoryUpdate = () => {
  const [category, setCategory] = useState({
    categoryId: 0,
    categoryName: "",
    description: ""
  });

  let navigate = useNavigate();
  let { id } = useParams(); 

  useEffect(() => {
    if (id) {
      displayCategoryById(id)
        .then((response) => {
          setCategory(response.data); 
        })
        .catch((error) => console.error("Error fetching category:", error));
    }
  }, [id]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const categoryUpdate = (event) => {
    event.preventDefault();
    updateCategory(category)
      .then(() => {
        alert("Category Updated Successfully");
        navigate("/category-list");
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4 text-primary">Update Category</h2>

              <form>
                <div className="form-group">
                  <label>Category Id: </label>
                  <input name="categoryId" className="form-control" value={category.categoryId} readOnly />
                </div>
                <div className="form-group">
                  <label>Category Name: </label>
                  <input
                    placeholder="Category Name"
                    name="categoryName"
                    className="form-control"
                    value={category.categoryName}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Category Description: </label>
                  <input
                    placeholder="Category Description"
                    name="description"
                    className="form-control"
                    value={category.description}
                    onChange={onChangeHandler}
                  />
                </div>
                <button className="btn btn-success" onClick={categoryUpdate}>
                  Update
                </button>
              </form>
            </div>
          </div>
       
  );
};

export default CategoryUpdate;
