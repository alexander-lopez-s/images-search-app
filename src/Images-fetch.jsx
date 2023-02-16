import React from "react";
import "./App.css";
import axios from "axios"; // method used to feth the images
import { useState } from "react";
import { FcPicture } from 'react-icons/fc';
import { AiFillHeart } from 'react-icons/ai';


const SearchImages = () => {
    const [image, setImage] = useState(""); // initial value in the search bar is an empty string
    const clientId = "psvrhREoE8Ri_8XHMUOQqWLpYD2e52MUBH6Y8q6s370"; // API key provided by Unsplash website
    const [result, setResult] = useState([]); // state to save the user's search 
    const [imgCounter, setImgCounter] = useState([]);
    const [resultsTxt, setResultsTxt] = useState("");

    // function to grab the user's input in the search bar
    const handleChange = (event) => {
     setImage(event.target.value);
    };
   
   // function to handle the submit when the search button is clicked
    const handleSubmit = () => {
    // concatenation of the API address and the API key    
    const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + clientId + "&orientation=landscape&per_page=24";
    // fectching the data that the user is searching for
    axios.get(url).then((response) => {
    setResult(response.data.results); // the 'response' which is an object, is being saved in the setResult
    setImgCounter(response.data.total);  
    setResultsTxt("images found");
  });
    };
    
    return (
     <div className="container">
       <h1 className="rainbow-text">Pics Finder <FcPicture /> </h1>
     <div className="search-section-container">
      <input onKeyPress={(e) => {if (e.key === "Enter") {handleSubmit()}}} onChange={handleChange} type="text" name="image-finder" onFocus={(e) => e.target.placeholder = ""} 
  onBlur={(e) => e.target.placeholder = "Type your search"} placeholder="Type your search"/>
     </div>
      <button onClick={handleSubmit} type="submit">Search</button>

      <div><p className="results-count">  {imgCounter} {resultsTxt} </p></div>


    <div className="results-container">
      {result.map((image) => (
        
      <>
       <div className="card" key={image.user.alt_description}>
        <img src={image.urls.small_s3} alt="searched-img"/>
         <p> Created by: {image.user.username}</p>
         <p> Likes: <AiFillHeart color="red"/>  {image.likes}  || <a href={image.urls.full}  rel="noreferrer" target="_blank">View full size</a></p>
       </div>
      </>
       ))}
    </div>
    </div>
    )
}

export default SearchImages;