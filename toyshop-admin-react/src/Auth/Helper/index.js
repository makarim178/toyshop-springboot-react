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

    console.log("I am here to authenticate! ");

    if(localStorage.getItem("jwt")) {
        console.log(JSON.parse(localStorage.getItem("jwt")))
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
        //cartEmpty(() => {})

        return fetch(`http://localhost:8080/user/logout/${userid}/`, {
            method: "GET"
        }).then(response => {
            console.log('Successfully logged out!');
            next()
        }).catch(err => console.log(err))
    }
}