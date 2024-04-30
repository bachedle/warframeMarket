import React from 'react'
import './PlaceOrder.css'
function PlaceOrder() {
  return (
    <div className="orderContainer">
      <div className='orderInput'>
        <div className ="kiteerText">
            What are you looking for?
        </div>
        <div>
            {/* <input type="text">Name</input>
            <input type="text">quantity</input>
            <input type="text">price</input> */}
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
