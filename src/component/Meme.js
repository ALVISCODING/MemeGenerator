import React , { useEffect }from 'react';




export default function Meme(){

    //meme object
    const [memeRelatedData , setMemeRelatedData] = React.useState({
         topText:"",
         bottomText:"", 
         randomImage:"http://i.imgflip.com/1bij.jpg"})

    
    //to store all the images from the api
    const[allMemeImages, setAllMemeImages] = React.useState([]);


    
    
    // data of all the import meme image
    // store in the state arrat
    useEffect( ()=>
     {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))

    },[])      
    
 

    /**
     * it random selet the image from the allMemeImages array
     */
    function randomImg(){
       
        // random generate the index of the meemsARRAY
        const randomNum = Math.floor(Math.random()* allMemeImages.length)

        const url = allMemeImages[randomNum].url
        setMemeRelatedData(oldMeme=> ({
            ...oldMeme, 
            randomImage: url
        })) 

    }


    /**
     * when the input is updated it will trigger this function to update the state
     * @param {*} event 
     */
    function handleChange(event){
        const{name, value} = event.target

         setMemeRelatedData(preMeme => {
             return {
                ...preMeme,
               [name]: value
             };
           });

        
           
    }
    


    return (

        <main className='main'>
            <form className='memeForm'> 
                <input 
                type="text"
                 className='formInput' 
                 name="topText" 
                 placeholder="Top text"
                 onChange={handleChange}
                 value = {memeRelatedData.topText}>

                </input>

                <input type="text" 
                className='formInput' 
                name="bottomText" 
                placeholder="Bottom text"
                onChange={handleChange}
                value = {memeRelatedData.bottomText}>

                </input>

                <button type="button" 
                onClick={randomImg} 
                className='searchBtn'> 
                Get a new meme image  🖼
                </button> 

            </form>
            <div class="meme">
            <img src={memeRelatedData.randomImage} alt='memeImage' className='memeImage'/>
            <h2 className="memeTextTop">{memeRelatedData.topText}</h2>
            <h2 className="memeTextBottom">{memeRelatedData.bottomText}</h2>
            

            </div>
            

        </main>

        


         )
    }
