import React from "react";
import "./App.css";
import axios from "axios"; // method used to feth the images
import { useState } from "react";
import { FcPicture } from 'react-icons/fc';


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
    const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + clientId + "&orientation=landscape&per_page=24";
    // fectching the data that the user is searching for
    axios.get(url).then((response) => {
    console.log(response);
    setResult(response.data.results); // the 'response' which is an object, is being saved in the setResult
    });
    };
    
    return (
     <div className="container">
       <h1 className="rainbow-text">Pics Finder <FcPicture /> </h1>
     <div className="search-section-container">
      <input onChange={handleChange} type="text" name="image-finder" onFocus={(e) => e.target.placeholder = ""} 
  onBlur={(e) => e.target.placeholder = "Type your search"} placeholder="Type your search"/>
     </div>
      <button onClick={handleSubmit} type="submit">Search</button>
    <div className="results-container">
      {result.map((image) => (
      <>
       <div className="card">
        <img src={image.urls.small_s3} alt="searched-img" key={image.user.id}/>
       </div>
      </>
       ))}
    </div>
    </div>
    )
}

export default SearchImages;