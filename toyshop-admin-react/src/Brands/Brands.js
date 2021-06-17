import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import axios from 'axios'
import BrandsCrudPage from './BrandsCrudPage'

const Brands =()=> {
    const [brands, setBrands]= useState([])
    const [error, setError] = useState(false)

    const loadBrands = async () => {
        const brandsList = await (await axios.get("http://localhost:8080/brands")).data
        setBrands(brandsList)
        console.log(brandsList);
    }

    useEffect(() => {

        loadBrands();

    }, [])

    return (
        <Base>
            <BrandsCrudPage brands={brands} loadBrands={loadBrands} />
        </Base>
    )
}

export default Brands