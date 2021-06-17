import React, { useState, useEffect } from 'react'
import { getBrands, getProducts, getCategories } from './helper/coreapicalls'
import axios from 'axios'

import Base from './Base'
import "../styles.css";
import Card from './Card'

export default function Home() {
    const [products, setProducts] = useState([])    
    const [error, setError] = useState(false)
    const [categorties, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    const [values, setValues] = useState({
        catVal: "0",
        brandsVal: "0",
        ageRange: "0",
        priceRange: "0",
        searchProdName: "",
    })

    const {catVal, brandsVal, ageRange, priceRange, searchProdName} = values


    const handleChange = (name) => (event) => {
        //console.log(name);
        //console.log(event.target.value);
        setValues({...values, error: false, [name]: event.target.value})
    }

    const filterProducts = () => {
        let filteredCat = []
        let reset = false
        getProducts().then(data => {
            if (data.error) {
                setError(true)
            } 
            else{
                let catId = ""
                if (catVal !== "0") {
                    catId = catVal.toString();
                }
        
                let brandsId = ""
                if(brandsVal !== "0") {
                    brandsId = brandsVal.toString();
                }
        
                let minPrice = 0, maxPrice = 0, minAge = 0, maxAge = 0
        
                switch (ageRange) {
                    case "1":
                        minAge = 0
                        maxAge = 2
                        break
                    case "2":
                        minAge = 3
                        maxAge = 5
                        break
                    case "3": 
                        minAge = 6 
                        maxAge = 9
                        break
                    case "4": 
                        minAge = 10
                        maxAge = 19
                        break
                    case "5":
                        minAge = 20
                        maxAge = 24
                        break
                    default: break
                }
        
                switch (priceRange) {
                    case "1":
                        minPrice = 1
                        maxPrice = 50
                        break
                    case "2":
                        minPrice = 51
                        maxPrice = 100
                        break
                    case "3": 
                        minPrice = 101
                        maxPrice = 200
                        break
                    case "4": 
                        minPrice = 201
                        maxPrice = 500
                        break
                    case "5":
                        minPrice = 501
                        maxPrice = 501
                        break
                    default: break
                }
        
                
                
                data.forEach(item => {   

                    //console.log(`Category: ${item.category}`)
                    //console.log(`catId: ${catId}`);

                    if (catId !== "") {
                        reset = true
                        
                        if(item.category.toString() === catId.toString()) {
                                filteredCat.push(item)
                        }
                    } else {
                        filteredCat.push(item);
                    }
                })


                if(brandsId.toString() !== "") {
                    // console.log("Am I here?");
                    reset = true
                    if(filteredCat.length > 0) {
                        // TODO: filter from filteredat
                        let filterBrands = []
                        // console.log(filteredCat);
                        filteredCat.forEach(item => {
                            //console.log(`BrandsId: ${brandsId}`);
                            //console.log(`Item Brands Id: ${item.brands}`);
                            if(item.brands.toString() === brandsId.toString()){
                                //console.log("item", item);
                                filterBrands.push(item)
                            }
                        })

                        filteredCat = []

                        filterBrands.forEach(item => {
                            filteredCat.push(item)
                        })
                    } else{
                        data.forEach(item => {
                            if(item.brands === brandsId){
                                filteredCat.push(item)
                            }
                        })
                    }                            
                }

                if(maxAge > 0) {
                    reset = true
                    if(filteredCat.length > 0) {
                        // TODO: filter filteredCat list
                        let filterAge = []
                        filteredCat.forEach(item => {
                            if (parseInt(item.age_target)  >  minAge && parseInt(item.age_target) < maxAge){
                                filterAge.push(item)
                            }
                        })

                        filteredCat = []
                        filterAge.forEach(item => {
                            filteredCat.push(item)
                        })

                    } else {
                        data.forEach(item => {
                            if (parseInt(item.age_target)  >  minAge && parseInt(item.age_target) < maxAge){
                                filteredCat.push(item)
                            }
                        })
                    }
                }


                if (minPrice !== 0 && maxPrice !== 0){
                    reset = true

                    if(filteredCat.length > 0) {
                        // TODO: filter from filteredCat
                        let filterPrice = []

                        filteredCat.forEach(item => {
                            if (minPrice <= 500) {
                                if(parseFloat(item.price) > minPrice &&  parseFloat(item.price) <= maxPrice){
                                    filterPrice.push(item)
                                }
                            }else {
                                if(parseFloat(item.price) > minPrice){
                                    filterPrice.push(item)
                                }
                            }
                        })

                        filteredCat = []

                        filterPrice.forEach(item => {
                            if (minPrice <= 500) {
                                if(parseFloat(item.price) > minPrice &&  parseFloat(item.price) <= maxPrice){
                                    filteredCat.push(item)
                                }
                            }else {
                                if(parseFloat(item.price) > minPrice){
                                    filteredCat.push(item)
                                }
                            }
                        })
                    } else{ 
                        data.forEach(item => {  
                            if (minPrice <= 500) {
                                if(parseFloat(item.price) > minPrice &&  parseFloat(item.price) <= maxPrice){
                                    filteredCat.push(item)
                                }
                            }else {
                                if(parseFloat(item.price) > minPrice){
                                    filteredCat.push(item)
                                }
                            }
                        })

                    }
                }
        
                // console.log("filtered category ", filteredCat);
                reset ? setProducts(filteredCat) : setProducts(data)
            }
        })
    }

    const showSearch = () => (
        <div className="row">
            <div className="col col-md-12 text-center border border-primary rounded">
                <br />
                {/* <form> */}
                    <select className="form-control ddlPos" name="ddl_category" id="ddl_category" onChange={handleChange("catVal")}>
                        <option value="0">All Categorties</option>
                        {categorties.map((category, index) => {
                            return (
                            <option key={category.id} value={category.id} >{category.name}</option>
                            )
                        })}
                    </select>

                    <select className="form-control ddlPos" name="ddl_brands" id="ddl_brands" onChange={handleChange("brandsVal")}>
                        <option value="0">All brands</option>
                        {brands.map((brand, index) => {
                            return (
                            <option key={brand.id} value={brand.id} >{brand.name}</option>
                            )
                        })}
                    </select>

                    <select className="form-control ddlPos" name="ddl_brands" id="ddl_brands" onChange={handleChange("ageRange")}>
                        <option value="0">All ages</option>
                        <option value="1">Baby / Toddler (0-2 Years)</option>
                        <option value="2">Young Children (3-5 Years)</option>
                        <option value="3">Older Children (6-9 Years)</option>
                        <option value="4">Teen (10-19 Years)</option>
                        <option value="5">Post Teen Adults (20-24 Years)</option>
                    </select>

                    <select className="form-control ddlPos" name="ddl_brands" id="ddl_brands" onChange={handleChange("priceRange")}>
                        <option value="0">No Price Range</option>
                        <option value="1">0 - 50 CAD</option>
                        <option value="2">51 - 100 CAD</option>
                        <option value="3">101 - 200 CAD</option>
                        <option value="4">201 - 500 CAD</option>
                        <option value="5">More than 501 CAD</option>
                    </select>
                    
                    <br/>

                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary filterSubmitBtn" onClick={() => {filterProducts()}}>Search</button>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col">
                            <button type="reset" className="btn btn-secondary filterSubmitBtn" >Reset</button>
                        </div>
                    </div> */}
                
                    {/* <p>{JSON.stringify(values)}</p> */}

                        <br/>

                {/* </form> */}
                <br/>
            </div>

            <div className="col col-md-12 text-center border border-primary rounded mt-3">
            <div className="input-group mb-2 mt-2">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Name Search" 
                    aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" 
                    value={searchProdName}
                    onChange={handleChange("searchProdName")}
                />
                <div className="input-group-append">
                    <button className="btn text-success fas fa-search" onClick={() => {searchByName()}} type="button"></button>
                </div>
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-dark btn-block" onClick={()=>{resetBtnPressed()}}>Reset</button>
            </div>
            </div>
        </div>

    )

    const searchByName = async () => {
        if(searchByName.toString() != ""){
            const res = await axios.get(`http://localhost:8080/product/name/${searchProdName}`)
                .then((response) => {
                    setProducts(response.data);
                })
        }
    }

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(true)
            } else {
                setCategories(data)
            }
        })
    }


    const loadBrands = () => {
        getBrands().then( data => {
            if(data.error) {
                setError(true)
            } else {
                setBrands(data)
            }
        })
    }

    const loadAllProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(true)
            } 
            else{
                setProducts(data)
            }
        })
    }

    const resetBtnPressed =() => {
        loadAllProducts();
    }

    


    useEffect(() => {
        loadAllProducts()
        loadCategories()
        loadBrands()
    }, [])

    return (
        <Base title="Home Page" description="Welcome to ToyStore">
            
            <div className="row">
                <div className="col-md-3 mb-2">
                    {showSearch()}
                </div>
                <div className="col-md-9 mb-2">
                    <div className="row">
                        {products.map((product, index) => {
                        return (
                            <div key={product.id} className="col-3 mb-1">
                            <Card product={product} />
                            </div>
                        );
                        })}
                    </div>
                </div>
            </div>
        </Base>
    )
}


