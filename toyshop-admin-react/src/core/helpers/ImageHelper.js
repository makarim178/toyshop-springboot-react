import React from 'react'

const ImageHelper = ({product, size}) => {
    const imageurl = product ? product.image : `https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif`

    return(
        <div className="rounded p-2">
            <img src={imageurl} 
                style={{ maxHeight: size, maxWidth: size }}
                className="card-img-top img-fluid"
            />
        </div>
    )
}

export default ImageHelper