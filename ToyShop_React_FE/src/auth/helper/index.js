import {API} from '../../backend'
import { cartEmpty } from '../../core/helper/cartHelper'

export const signup = (user) => {
    return fetch(`${API}user/`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                })
                .then((response) => {
                    // console.log("response: " + response)
                    return response.json()
                })
                .catch(err => console.log(err))
}

export const signin = user => {
    return fetch(`${API}user/login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(user)
    }).then((response) => {
        //console.log("response: " + response.json());
        return response.json();
    }).catch(err => console.log(err))
}

// export const signin = user => {
//     const formData = new FormData()

//     for(const name in user){
//         console.log(name);
//         console.log(user[name]);
//         formData.append(name, user[name])
//     }

//     return fetch(`${API}user/login/`, {
//         method: "POST",
//         body: formData
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(err => console.log(err))
// }


export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window == undefined) {
        return false
    }

    //console.log("I am here to authenticate! ");

    if(localStorage.getItem("jwt")) {
        //console.log(JSON.parse(localStorage.getItem("jwt")))
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}

export const signout = next => {
    const userid = isAuthenticated() && isAuthenticated().id
    console.log("userid:",userid);
    if (typeof window !== undefined){
        localStorage.removeItem("jwt")
        cartEmpty(() => {})

        return fetch(`${API}user/logout/${userid}/`, {
            method: "GET"
        }).then(response => {
            console.log('Successfully logged out!');
            next()
        }).catch(err => console.log(err))
    }
}