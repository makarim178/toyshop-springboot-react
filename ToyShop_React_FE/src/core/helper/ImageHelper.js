import React from 'react'

const ImageHelper = ({product, size}) => {
    const imageurl = product ? product.image : `https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif`

    const allsize = size ? size : "100%"

    return(
        <div className="rounded p-2">
            <img src={imageurl} 
                style={{ maxHeight: allsize, maxWidth: allsize }}
                className="card-img-top img-fluid"
            />
        </div>
    )
}

export default ImageHelper