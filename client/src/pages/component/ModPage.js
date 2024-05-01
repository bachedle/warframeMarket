import React, {useEffect, useState} from 'react'
import './subpage.css'
import axios from 'axios'

function ModPage() {
  const [postObject, setPostObject] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:2001/posts`).then((response) => {
            setPostObject(response.data)
        });
    }, [/*id*/])

    return (
        <div className="subPage">
          <div className='modImage'></div>
          <div className='productList'>
            {postObject.map((value,key)=> (
              <div className="productCapsule">
                  <div className="title">{value.title}</div>
                  <div className="postText">{value.postText}</div>
                  <div className="username">{value.username}</div>
                  {/* <div className="title">title</div>
                  <div className="postText">quantity</div>
                  <div className="username">price</div> */}
                  <br></br>
              </div>
                ))}
          </div>
        </div>
      )
    }

export default ModPage
