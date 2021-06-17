import React, {useState, useEffect, Fragment} from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import ImageHelper from '../core/helpers/ImageHelper';

const ProductTable =({product, actionProduct}) => {
    const [category, setCategory] = useState("")
    const [brands, setBrands] = useState("");

    const loadCategory = async () => {
        await axios.get(`http://localhost:8080/category/${product.category}`).then(response => {
            setCategory(response.data.name)
        });
    }

    const loadBrands = async () => {
        await axios.get(`http://localhost:8080/brands/${product.brands}`).then(response => {
            setBrands(response.data.name)
        })
    }

    const showDetailProduct = (product) => {
        return(
          <Link to={
            {pathname : "/productDetails",
            state: product}
          }
          className="fas fa-eye text-primary border-0 rounded"
          />
        )
      }

      const updateProduct = (product) => {
        return(
          <Link to={
            {pathname : "/updateProduct",
            state: product}
          }
          className="fas fa-edit text-success border-0 rounded"
          />
        )
      }

    useEffect(() => {
        loadBrands();
        loadCategory();
    }, [])

    return (     
        <Fragment key={product.id}>
            <tr key={product.id}>
                <th scope="row"><ImageHelper product = {product} size = {80}></ImageHelper></th>
                <td>{product.name}</td>
                <td>category</td>
                <td>brands</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                    {showDetailProduct(product)}
                    {updateProduct(product)}
                    <button onClick={() => actionProduct("remove", product)} class="fas fa-trash-alt text-danger border-0 rounded" ></button>
                </td>
            </tr>
        </Fragment>
        
    )
}

export default ProductTable;
