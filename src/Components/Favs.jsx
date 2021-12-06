import React, {useEffect, useState} from "react";
import New from "./New";

export default function Favorites (){
    const [data, setData]=useState()

    useEffect(()=>{
        const favStored= JSON.parse(localStorage.getItem("favorites"))
        var favorites= []
        for(let i=0; i<favStored.length;i++){
            const favorite= JSON.parse(localStorage.getItem(favStored[i]))
            favorites.push(favorite)
        }
        setData(favorites)
    },[])
    
    

    return(
        <div>
             <ul>
                {data ? data.map(elem=>{
                    if(elem.author && elem.created_at && elem.story_title && elem.story_url){
                        return (
                            <li key={elem.created_at}>
                                <New author={elem.author} created_at={elem.created_at} story_title={elem.story_title} 
                                story_url={elem.story_url}/>
                            </li>)
                    }
                    else return null
                }): <p>No favorites saved</p>}
            </ul>
        </div>
    )
}