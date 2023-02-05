import React from "react";
import "./App.css";
import axios from "axios"; // method used to feth the images
import { useState } from "react";

const SearchImages = () => {

    const [image, setImage] = useState(""); // initial value in the search bar is an empty string
    const clientId = "psvrhREoE8Ri_8XHMUOQqWLpYD2e52MUBH6Y8q6s370"; // API key provided by Unsplash website
    const [result, setResult] = useState([]); // state to save the user's search 

    // function to grab the user's input in the search bar
    const handleChange = (event) => {
     setImage(event.target.value);
    };
   
   // function to handle the submit when the search button is clicked
    const handleSubmit = () => {
    // concatenation of the API address and the API key    
    const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + clientId;
    // fectching the data that the user is searching for
    axios.get(url).then((response) => {
    console.log(response);
    setResult(response.data.results); // the 'response' which is an object, is being saved in the setResult
    });
    };
    
    return (
     <div className="container">
       <h1>Images Search App </h1>
     <div className="input">
      <input onChange={handleChange} type="text" name="image-finder" placeholder="Type your search"/>
     </div>
      <button onClick={handleSubmit} type="submit">Search</button>
    <div className="result">
      {result.map((image) => (
      <>
       <div className="card" key={image.user.id}>
        <img src={image.urls.thumb} alt="searched-img"/>
        <p className="username"> Photo by {image.user.name}</p>
        <p className="like">👍 {image.likes}</p>
       </div>
      </>
       ))}
    </div>
    </div>
    )
}

export default SearchImages;