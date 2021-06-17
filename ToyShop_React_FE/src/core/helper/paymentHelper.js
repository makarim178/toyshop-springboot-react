import { API } from '../../backend'

// export const getmeToken = (userId, token) => {
//     return fetch(`${API}payment/gettoken/${userId}/${token}/`,{
//         method: "GET",
//     }).then(response => {
//         return response.json()
//     }).catch(e => console.log(e))
// }

export const getmeToken = () => {
    return fetch(`${API}payment/gettoken/`,{
        method: "GET",
    }).then(response => {
        return response.json()
    })
}

export const processPayment = (paymentInfo) => {
    // const formData = new FormData()
    // for(const name in paymentInfo) {
    //     formData.append(name, paymentInfo[name])
    //     console.log(`name: ${name}`);
    //     console.log(`payInfoVal: ${paymentInfo[name]}`);
    // }

    const paynonce = {
        paymentMethodNonce: paymentInfo.paymentMethodNonce,
        amount: paymentInfo.amount
    }

    return fetch(`http://localhost:8080/payment`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paynonce)
    }).then (response => {
        //console.log("payment process: ", response);
        return response.json()
    })


    // return fetch(`${API}payment/process/`, {
    //     method: "POST",
    //     body: formData
    // }).then(response => {
    //     console.log("payment_process: ", response)
    //     return response.json()
    // })
}


// export const processPayment = (userId, token, paymentInfo) => {
//     const formData = new FormData()
//     for(const name in paymentInfo) {
//         formData.append(name, paymentInfo[name])
//     }

//     return fetch(`${API}payment/process/${userId}/${token}/`, {
//         method: "POST",
//         body: formData
//     }).then(response => {
//         return response.json()
//     }).catch(e => console.log(e))
// }