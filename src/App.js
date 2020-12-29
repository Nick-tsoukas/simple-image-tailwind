import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import freckles from  './freckles.jpeg';

function App() {
  // This is the state and we need it. Currently on line 7 the value of images is and empty array -- no images yet 
  const [images, setImages ] = useState([]);
  /* We must use the useEffect hook. This is where we will make an api request and then set the images to the state
     and map through them
  */
//  Adding loading just to use conditional 
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRedheads = async () => {
      return await fetch("https://esits.org/tumblr-json.php?url=https://beautiful-redheads.tumblr.com", {method: 'GET'})
        .then(res => res.json())
        .then(res => res.posts
          .filter(post => post.type ==='photo')
          .map(photo => {
            return {
              img: photo["photo-url-1280"],
              imgThumb: photo["photo-url-1280"]
            }
          })
        )
        .catch(error => console.log('WTF!', error))
    }
    
    getRedheads()
      .then((redheads) => setImages(() => [...redheads]))
      .then(() => setLoading(false))

},[]);

  {
    if(loading) {
      return (
        <div>
          <div style={{backgroundImage: `url(${freckles})`}} className="h-96 bg-black bg-center w-screen bg-cover"></div>
          <div className="mason_container">
                 {/* The curly braces are needed to use javascript jsx */}
                 {
               images.map((image, index) => {
                       return (
                         <div>
                             <img src={image.img} key={index} className="mason_image shadow-lg hover:shadow-2xl" />
                         </div>
                         )
                     })
                 }   
     
             </div>
        </div>
       );
    } else {
      return(
        <div>
           <div style={{backgroundImage: `url(${freckles})`}} className="h-96 bg-black bg-center w-screen bg-cover"></div>
           <h1>The Images are loading right now ...</h1>
        </div>
      )
    }
  }
}

export default App;
