import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [listOfPosts,setListOfPosts] = useState([]);
  let navigate = useNavigate();
  //logic GET request render
  useEffect(() => {
    axios.get("http://localhost:2001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      <div className="listOfProd">
        {listOfPosts.map((value, key) => {
          return (
            <div className='post' onClick={() => {navigate(`/Post/${value.id}`)}} >
              <br></br>
              <div className='title'> {value.title}</div>
              <div className='body'> {value.postText}</div>
              <div className='footer'> {value.username}</div>
            </div>
          );
        })}
      </div>
      
    </div>
  )
}

export default Home
