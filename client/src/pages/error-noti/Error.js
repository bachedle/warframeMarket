import React from 'react'
import '../error-noti/Error.css'
function Error() {
    let errorMessage;
    let errorTitle;
    let errorCode;
    if (errorCode === 404) {
        errorTitle = "404 - Page Not Found";
        errorMessage = "Sorry Tenno, we have not found what you are looking for";
    } else if (errorCode === 500) {
        errorTitle = "500 - Internal Server Error";
        errorMessage = "The Grineer has broken into the server ...again";
    } else {
        errorTitle = "Something happened";
        errorMessage = "Wait here Tenno, I will fix it quick.";
    }

  return (
    <div className='error-body'>
        <div class="error-container">
            {/* test */}
            {/* <h1 id="error-code">con cac</h1>
            <p id="error-message">caidai</p> */}
            {/* real */}
            <h1 className="error-title">{errorTitle}</h1>
            <p className="error-message">{errorMessage}</p>
            <a href="/" class="home-link">Go to Homepage</a>
        </div>
    </div>
  )
}

export default Error
