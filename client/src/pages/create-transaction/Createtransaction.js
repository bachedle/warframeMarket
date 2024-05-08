import React from 'react'

function Createtransaction() {
  function openForm() {
    document.getElementById("formWindow").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("formWindow").style.display = "none";
  }
  return (
    <div className='floating-window' id='formWindow'>
      <div className='form-content'>
        <form>
          <input type="text" name="name" placeholder="Name" required></input>
          <input type="email" name="email" placeholder="Email" required></input>
          <textarea name="message" placeholder="Message"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="close-button" onclick="closeForm()">Close</div>
    </div>
    
  )
}

export default Createtransaction
