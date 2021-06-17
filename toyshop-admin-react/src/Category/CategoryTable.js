import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const CategoryTable = ({category, actionCategory}) => {

    const updateCategory = (category) => {
        return(
          <Link to={
            {pathname : "/updateCategory",
            state: category}
          }
          className="fas fa-edit text-success border-0 rounded"
          />
        )
      }

    return (
        <Fragment key={category.id}>
            <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                    {updateCategory(category)}
                    <button onClick={() => actionCategory("remove", category)} class="fas fa-trash-alt text-danger border-0 rounded" ></button>
                </td>
            </tr>
        </Fragment>
    )
}


export default CategoryTable