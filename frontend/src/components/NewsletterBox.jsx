import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        // the preventDefault prevent the page from reloading when submit button is clicked
        event.preventDefault();
    }

  return (
    <div className='text-center'>
      <p className='text-xl font-sm text-gray-800'>Subcribe now & get 20% off </p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui laudantium est voluptas explicabo aut eos neque beatae.
      </p>
    <form className='w-full sm:-1/2 flex items-center gap-3 my-5 border pl-3'>
      <input className='w-full sm:flex-1 outline-none' text='email' placeholder='Please enter your email' required />
      <button onSubmit={onSubmitHandler} type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
    </form>

    </div>
  )
}

export default NewsletterBox
