import React from 'react'
import {ImSpinner10} from 'react-icons/im'

export const Loadingpage = () => {
  return (
    <div className='bg-white w-full '>
        <div className='text-3xl absolute top-1/2 left-1/2 animate-spin'>
        <ImSpinner10/>
        </div>
        
    </div>
  )
}
