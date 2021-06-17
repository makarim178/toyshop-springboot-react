export const addItemToCart = (item, next) => {
    let cart = []
    // let inCart = false;

    if(typeof window !== undefined) {
        
        // if local storage "cart is available"
        if(localStorage.getItem("cart")){   
            // then load cart from local storage
            cart = JSON.parse(localStorage.getItem("cart")) 
        }

        item.quantity = 1;
//         console.log("itemId", item.id);

        // Otherwise push an element into array "cart" with item provided

        let prodExists = false
        if(cart.length === 0) {
            cart.push({
                ...item
            })
        } else {
            // check if the product already in the list
            cart.forEach(element => {
                if(element.id === item.id) {
                    prodExists = true
                    // console.log("maxOrderQuantity", element.max_Order_qty)
                    if(element.quantity < parseInt(element.max_Order_qty) ) {
                        element.quantity ++
                    } else {
                        console.log("Exceeded maximum Order quantity!");
                    }
                } 
            });

            // if item is not in the list
            if(!prodExists) {
                cart.push({
                    ...item
                })
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = productId => {
    let cart = []
    if(typeof window!== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product, i) => {
            if(product.id === productId) {
                if(product.quantity > 1) {
                    product.quantity--;
                } else {
                    cart.splice(i, 1)
                }
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart
}

export const cartEmpty = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}