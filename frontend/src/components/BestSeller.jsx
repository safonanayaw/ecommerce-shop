import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    // access the product object with the useContext from ShopContext
    const {products} = useContext(ShopContext);

    // state to store the bestseller array when filter
    const [bestSeller, setBestSeller] = useState([]);
    // run the useEffect fxn when the state change, filter product object key bestproduct value if it's true and save to bestProducts
    useEffect(()=>{
        const bestProducts = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProducts.slice(0,5)); 
    }, [products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            {/* insert Title component and passing props */}
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:test-base text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam odio voluptatum quasi quam labore non vitae facere laborum nostrum.
            </p>
        </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {/* display BEST SELLERS through ProductItem component props by mapping bestSeller array. bestSeller array only contain true products object bestseller key with value bool true*/}
        {
            bestSeller.map((item, index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image}  price={item.price}  />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
