import React from 'react'
import { PRODUCTS } from '../data'
import {Card} from 'react-bootstrap';

const checkout = () => {
  return (
    <div className='container-fluid bg-light py-3'>
      <h2 className='text-center'>Shopping cart</h2>

      <div className='row mx-3 mt-5'>
       <h2 className='text-start'>Products</h2>

       {PRODUCTS.map((prod,index)=>{
        return(
        <div className='col-lg-2 bg-white mx-1'>
          <h4 className='text-start'>{prod.name}</h4>
          <h4 className='text-start'>{prod.price}</h4>
          <button className='btn btn-primary '>Add to cart</button>
        </div>
        )
       })}
      </div>

      <div className='row mx-3 mt-5'>
       <h2 className='text-start'>Cart Summary</h2>

       <div className='bg-white'>
        <div className='d-flex'>
          <h4 className='text-start'>Subtotal: </h4>
          <h4 className='text-end'>0 </h4>
        </div>

        <Card style={{ width: '100', backgroundColor: 'skyblue' }}>
          <Card.Body>
            <Card.Text className='text-start px-2'>
              Add 1000 rupees more to get a FREE Wireless Mouse!
            </Card.Text>
          </Card.Body>
        </Card>       
       </div>
      </div>

      

    </div>
  )
}


export default checkout
