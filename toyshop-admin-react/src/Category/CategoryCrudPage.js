import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import AddCategory from './AddCategory';
import CategoryTable from './CategoryTable';

const CategoryCrudPage = ({categories, loadCategories}) => {

    const [loadAddCateogires, setloadCategories] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const getARedirect = redirect => {
        if(redirect) {
            return <Redirect to="/category" />
        }
    }

    const refreshPage = () => { window.location.reload(false) }

    const removeCategories = async (category) => {

        const response = await axios.delete(`http://localhost:8080/category/${category.id}`)
        setRedirect(true);
        refreshPage();
    }

    const actionCategory = (action, category) => {
        switch(action) {
            case "add": 
                setloadCategories(!loadAddCateogires);
                //console.log(loadAddProd);
                break;
            case "remove": console.log("clicked remove");
                        removeCategories(category);
                        break;
            default: setloadCategories(false);
        }
    }

    return (
        <div>
            {getARedirect()}
            <div className = "container-fluid">
                <h3 className="text-primary text-left">Category Page</h3>        


                <div className="list-group">
                    <AddCategory actionCategory={actionCategory} loadCategories={loadCategories}/>
                </div>
            </div>

            <br />

            <div className="col-6">
                <h5>Category List</h5>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category, index) => {
 
                        return (<CategoryTable category={category} actionCategory={actionCategory} />)})
                    }
                </tbody>
                </table>
            </div>


        </div>
    )
}

export default CategoryCrudPage;
