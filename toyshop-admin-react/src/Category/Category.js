import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import axios from 'axios'
import CategoryCrudPage from './CategoryCrudPage'


const Category =()=> {
    const [categories, setCategories]= useState([])
    const [error, setError] = useState(false)

    const loadCategories = async () => {
        const categoryList = await (await axios.get("http://localhost:8080/category")).data
        setCategories(categoryList)
        console.log(categoryList);
    }

    useEffect(() => {

        loadCategories();

    }, [])

    return (
        <Base>
            <CategoryCrudPage categories={categories} loadCategories={loadCategories} />
        </Base>
    )
}

export default Category