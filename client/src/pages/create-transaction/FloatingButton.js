import React from 'react'
import '../create-transaction/FloatingButton.css'
// import addBtn from '../../assets/add.png'
function FloatingButton() {
  return (
    <div className='floating-container'>
      <div className='floating-button'>
        +
      </div>
      <div className="element-container">
        <a href='/Buy' className='float-element'>
            <i className='material-icon'>Buy</i>
        </a>
        <a href='Sell' className='float-element'>
            <i className='material-icon'>Sell
            </i>
        </a>
      </div>
    </div>
  )
}

export default FloatingButton
