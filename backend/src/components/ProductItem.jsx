import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import {Link} from 'react-router-dom';


// getting the destructuring arguments from props
const ProductItem = ({id, image, name, price}) => {

    // get the currency from the shopContext using useContext hook
    const {currency} = useContext(ShopContext);

  return (
    // the 'to' path redirect to 'product/:id' route path
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            {/* display image from index 0 */}
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
