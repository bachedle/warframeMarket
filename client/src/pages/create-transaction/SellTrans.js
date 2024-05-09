import React from 'react'

function SellTrans() {
  return (
    <div>
      <div className='modalContent'>
        <div className='modalHeader'>
          <div className='headerContent'>
            <h2>Selling Something?</h2>
          </div>
        </div>

        <div className='modalBody'>
          <div className='bodyContent'>
            <div className='itemContainer'>
              <label for="orderItemName">Item Name</label>
              <section className='itemInput'>
                <input type ='text' placeholder ="Item"></input>
              </section>
            </div>
            <div className='misContainer'>
              <div className='rowCompact'>
                <div className='price'>
                  <label for="orderItemPrice">Price per unit</label>
                  <section className='input'>
                    <input type ='number' id="orderItemPrice" placeholder ="e.g. 1000" ></input>
                  </section>
                </div>
                <div className='quantity'>
                  <label for="orderQuantity">Quantity</label>
                  <section className='input'>
                    <input type ='number' id="orderQuantity" placeholder ="e.g. 3" ></input>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='modalAction'>
          <div className='buttonHolder'>
            <button className='button' tabindex ="0" type='button'>
              <div>
                <span>Confirm</span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SellTrans
