import React from 'react'
import notFoundImg from '../../images/error.svg'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return <>
            <Helmet>
      <title>404</title>
    </Helmet>
   <div><img className='w-100' src={notFoundImg} alt="NotFoundImg" /></div>
  </>
}
