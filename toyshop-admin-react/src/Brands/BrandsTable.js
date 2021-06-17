import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const BrandsTable = ({brand, actionBrands}) => {

    const updateBrand = (brand) => {
        return(
          <Link to={
            {pathname : "/updateBrands",
            state: brand}
          }
          className="fas fa-edit text-success border-0 rounded"
          />
        )
      }

    return (
        <Fragment key={brand.id}>
            <tr key={brand.id}>
                <td>{brand.name}</td>
                <td>
                    {updateBrand(brand)}
                    <button onClick={() => actionBrands("remove", brand)} class="fas fa-trash-alt text-danger border-0 rounded" ></button>
                </td>
            </tr>
        </Fragment>
    )
}


export default BrandsTable