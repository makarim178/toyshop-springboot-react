import React, {useState, useEffect} from 'react';
import Product from '../Products/Product';
import Base from './Base'
import Axios from 'axios';


export default function Home() {
    const [products, setProducts] = useState([])    
    const [error, setError] = useState(false)
    const loadProducts = async () => {
        setProducts(await (await Axios.get("http://localhost:8080/product")).data);
    }

    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <Base title="Home Page" description="Welcome to ToyShop Admin">
            <Product products = {products} loadProducts={loadProducts} />
        </Base>
    )
}
