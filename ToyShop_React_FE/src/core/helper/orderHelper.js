import { API } from '../../backend'

export const createOrder = (orderData) => {

    return fetch(`${API}order/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const createOrderDetails = (orderDetail)  => {
    return fetch(`${API}orderdetails/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetail)
    }).then(response => {
        return response.json()
    })
}