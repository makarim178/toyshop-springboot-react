import { API } from '../../backend'

export const getProducts = () => {
    return fetch(`${API}product/`, {method: "GET"}).then( response => {
        //console.log(response);
        return response.json()
    }).catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}category/`, {method: "GET"}).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getBrands = () => {
    return fetch(`${API}brands/`, {method: "GET"}).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getBrandName = (brand) => {
    // console.log("brands link: ", brand);
    return fetch(`${API}brands/${brand}`, {method: "GET"}).then(response => {
        return response.json()
    }).catch(e => console.log(e))
}




