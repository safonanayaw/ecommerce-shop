import React from 'react'
import { Route, Route } from 'react-router-dom'
import Home from './pages/home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'



const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]'>
      {/* Creating react router dom for the route page path */}
      <Routes>
        {/* Creating individual route path */}
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        {/* adding :productId to the paty route to search for product id, lesson in express */}
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='orders' element={<Orders />} />
      </Routes>
    </div>
  )
}

export default App
