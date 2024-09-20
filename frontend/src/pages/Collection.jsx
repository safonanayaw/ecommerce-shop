import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
// useContext to get all products
const {products} = useContext(ShopContext);
// useState to display and block filter box
const [showFilter, setShowFilter] = useState(false);
// filter product useState
const [filterProducts, setFilterProducts] = useState([]);
//sortype useSate
const [sortType, setSortType] = useState('relavant');

// filter products useEffect state
// useEffect(()=>{
//     setFilterProducts(products);
// }, []);

// useState for Category
const [category, setCategory] = useState([]);

// useState for subCategory
const [subCategory, setSubCategory] = useState([]);

// function check if target value exist in category state array then delete else add.
const toggleCategory = (e) =>{
    // check if event target is already in category Array, if true delete from array
    if(category.includes(e.target.value)){
        setCategory((prev)=> prev.filter(item => item !== e.target.value ));
    }
    else{
        // if not true add to prev array content
        setCategory((prev) => [...prev, e.target.value]);
    }
}

// useEffect to console.log the array of category and subCategory
useEffect(()=>{
    console.log(category);
    console.log(subCategory);
}, [category, subCategory]);


// function check if target value exist in subCategory state array then delete else add.
const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
        setSubCategory((prev)=> prev.filter(item=> item !== e.target.value));
    }else{
        setSubCategory((prev)=> [...prev, e.target.value]);
    }
}

// fxn to apply selected state array to display sorting. 
const applyFilter = () => {
    //create product copy
    let productsCopy = products.slice();
    //if category state array is not empty then filter productsCopy array to includes category array
    if(category.length > 0){
        productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    //if subCategory state array is not empty then filter productsCopy array to includes subCategory array
    if(subCategory.length > 0){
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);

    console.log(productsCopy);
}


//fxn to sort filterproduct state array base on price using sort
//arrayname.sort(a,b) => return a-b; if result is - then a first, if + then b first or if 0 then both equal 
const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch(sortType) {
        case 'low-high':
            setFilterProducts(fpCopy.sort((a,b)=> (a.price - b.price)));
            break;

        case 'high-low':
            setFilterProducts(fpCopy.sort((a,b)=> (b.price - a.price)));
            break;

        default:
            applyFilter();
            break;
    }
}

useEffect(()=> {
    applyFilter();
}, [category, subCategory])

useEffect(()=>{
    sortProducts();
},[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter options left*/}
      <div className='min-w-60'>
        {/* dropdown of filter box in small screen. */}
        <p onClick={()=>{setShowFilter(!showFilter)}} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category filter */}
        {/* display filter box when in small screen using useState */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 font-light text-gray-700'>
                <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
                </p>
                <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
                </p>
                <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
                </p>
            </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 font-light text-gray-700'>
                <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>TopWear
                </p>
                <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>BottomWear
                </p>
                <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>WinterWear
                </p>
            </div>
        </div>
      </div>

    {/* Right Side */}
    <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl md-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/* Product Sort */}
            {/* onChange fxn to grab select target value */}
            <select onChange = {(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                <option value="low-high" >Sort by: Low to High</option>
                <option value="relavant" >Sort by: Relavant</option>
                <option value="high-low" >Sort by: High to Low</option>
            </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
                filterProducts.map((item, index)=>(
                    <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                ))
            }
        </div>
    </div>
    </div>
  )
}

export default Collection
