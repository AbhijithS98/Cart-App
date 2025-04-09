import React from 'react'
import { PRODUCTS,THRESHOLD,FREE_GIFT } from '../data'
import {Card, Button} from 'react-bootstrap';
import { useState,useEffect } from 'react';

const Checkout = () => {
  const [cart, setCartItems] = useState([]);
  const [Total,setTotal] = useState(0);


  const addToCart = (prod)=>{
    console.log("prod:", prod);
    setCartItems((prevCart)=>{
      const itemExist = prevCart.some((item) => item.id === prod.id);
      if(itemExist){
        return prevCart;
      }else{
        return [...prevCart, {...prod,quantity:1}]
      }
    });
  }

  const increase = (id) => {
    setCartItems((prevCart) => 
    prevCart.map((item) => item.id === id ? {...item,quantity: item.quantity + 1} : item))
  };

  const decrease = (prod) => {
    if(prod.quantity===1){
      setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== prod.id))
    } else{
      setCartItems((prevCart) => 
      prevCart.map((item) => item.id === prod.id ? {...item,quantity: item.quantity - 1} : item))
    }
  };

  useEffect(()=>{
    if(cart.length){
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      console.log("total is :", total);
      setTotal(total);
    }
  },[cart])  

  useEffect(()=>{
    if(Total >= THRESHOLD){
      setCartItems((prevCart) => [...prevCart,{...FREE_GIFT,quantity:1}])
    } else if(Total < THRESHOLD){
      setCartItems((prevCart) => 
      prevCart.filter((item) => item.id !== FREE_GIFT.id))
    }
  },[Total])

  return (
    <div className='container-fluid bg-light py-3'>
      <h2 className='text-center text-primary'>Shopping cart</h2>

      <div className='row mx-3 mt-5 d-flex justify-content-between'>
       <h2 className='text-start text-secondary'>Products</h2>

       {PRODUCTS.map((prod)=>{
        return(
        <div className='col-lg-2 bg-white mx-1' key={prod.id}>
          <h4 className='text-start'>{prod.name}</h4>
          <h4 className='text-start'>₹{prod.price}</h4>
          <Button size='lg' onClick={()=>addToCart(prod)}>Add to cart</Button>
        </div>
        )
       })}
      </div>

      <div className='row mx-3 mt-5'>
       <h2 className='text-start text-secondary'>Cart Summary</h2>

       <div className='bg-white'>
        <div className='d-flex justify-content-between'>
          <h4 className='text-start'>Subtotal: </h4>
          <h4 className='text-end'>₹{Total}</h4>
        </div>

        <Card style={{ width: '100', backgroundColor: 'skyblue' }}>
          <Card.Body>
            <Card.Text className='text-start px-2'>
              {Total < THRESHOLD ? (`Add ₹ ${THRESHOLD-Total} more to get a FREE Wireless Mouse!`) :
              ('You got a free wireless Mouse !!!')}
            </Card.Text>
          </Card.Body>
        </Card>       
       </div>
      </div>


      <div className='row mx-3 mt-5'>
       
       {!cart.length && (
        <Card style={{ width: '100', backgroundColor: 'silver'}}>
          <Card.Title className='pt-5'>Your Cart is Empty</Card.Title>
          <Card.Text className='pb-5'>Add some products to see them here!</Card.Text>
        </Card>
       )}


       {cart.length ? <h3 className='text-start text-secondary'>Cart Items</h3> : '' }
       {cart.map((item)=>{
        return(
        <>
        
        <Card style={{ width: '100', backgroundColor: 'silver', marginBottom: '3px'}} >
          <div className='d-flex justify-content-between'>
           <Card.Title className='text-start mt-2'>{item.name}</Card.Title>
            <div className='d-flex justify-content-between'>
              {item.price===0 ? (<Button variant='info' size="sm" className='mt-2'>Free Gift</Button>) : (
               <>
               <Button onClick={()=>decrease(item)} className='mt-2' variant='danger' size="sm">-</Button>
               <h5 className='mt-2 mx-2'>{item.quantity}</h5>
               <Button onClick={()=>increase(item.id)} className='mt-2' variant='success' size="sm">+</Button>
               </>
              )}
              
            </div>
          </div>
          
          <Card.Text className='text-start'>₹{item.price}×{item.quantity}= ₹{item.quantity*item.price}</Card.Text>
              
        </Card>
        </>
        )
       })}
       
      </div>



    </div>
  )
}


export default Checkout
