import React from 'react';

function SellTrans() {
  const handleConfirm = () => {
    // Handle the confirm button click event
    console.log("Confirm button clicked");
  };

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
              {/* <label htmlFor="orderItemName">Item Name</label> */}
              <section className='item-input'>
                <input type='text' placeholder="Item" id="orderItemName" />
              </section>
            </div>
            <div className='misContainer'>
              <div className='rowCompact'>
                <div className='price'>
                  {/* <label htmlFor="orderItemPrice">Price per unit</label> */}
                  <section className='price-input'>
                    <input type='number' id="orderItemPrice" placeholder="e.g. 1000" />
                  </section>
                </div>
                <div className='quantity'>
                  {/* <label htmlFor="orderQuantity">Quantity</label> */}
                  <section className='quantity-input'>
                    <input type='number' id="orderQuantity" placeholder="e.g. 3" />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='modalAction'>
          <div className='buttonHolder'>
            <button className='button' tabIndex="0" type='button' onClick={handleConfirm}>
              <div>
                <span>Confirm</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellTrans;