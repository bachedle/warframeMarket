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
        
        <span className='float-element'>
            <i className='material-icon'>Buy
            </i>
        </span>
        <span className='float-element'>
            <i className='material-icon'>Sell
            </i>
        </span>
      </div>
    </div>
  )
}

export default FloatingButton
