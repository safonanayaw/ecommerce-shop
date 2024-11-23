import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    // calling products from ShopContext components using destructuring by the use of useContext
    const {products} = useContext(ShopContext);

    // using useState to store the latest latestProducts but initializing with empty string
    const [latestProducts, setLatestProducts] = useState([]);

    // before the state value latestProducts loads, execute the annonymous function in the useEffect hook
    useEffect(()=>{
        // using the setLatestProducts state of the useState to set the latestProducts arrays with the products objects ans slicing to 10 index
        setLatestProducts(products.slice(0,10));
    }, [])

  return (
    <div classNamwe='my-10'>
      <div className='text-center py-8 text-3xl'>
        {/* passing the props into the Title component  */}
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quis qui reiciendis, exercitationem non iste saepe veritatis id.
        </p>
      </div>

      {/* Rendering products */}
      {/* accessing the useState latestProducts array and mapping the array object value pairs and giving it to the ProductItem component props */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
        latestProducts.map((item, index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
