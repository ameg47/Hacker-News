import React, {useEffect, useState} from "react";
import moment from "moment";
import heartAdd from "../Assets/iconmonstr-favorite-2_4@3x.png"
import heartAdded from "../Assets/iconmonstr-favorite-3@3x.png"
import icontimer from "../Assets/iconmonstr-time-2.png"
import '../Styles/New.modules.css';

export default function New ({id, author, created_at, story_title, story_url}){
    const [isFavorite, setFavorite] = useState()

    let hour = moment(created_at).fromNow()
    let info= {author:author, created_at:created_at, story_title:story_title, story_url:story_url}
    
    useEffect(()=>{
        const stored=localStorage.getItem(created_at)
        if(stored){
            setFavorite(true)
        }
    },[])

    const handleRedirects= ()=>{
        window.open(story_url)
    }

    const handleClickFav= ()=>{
        setFavorite(!isFavorite)
        if(!isFavorite){
            localStorage.setItem(created_at, JSON.stringify(info))
            const favStored= JSON.parse(localStorage.getItem("favorites"))
            if(favStored) localStorage.setItem("favorites", JSON.stringify([...favStored, created_at]))
            else localStorage.setItem("favorites", JSON.stringify([created_at]))
        }
        if(isFavorite){
            localStorage.removeItem(created_at)
            const favstored=JSON.parse(localStorage.getItem("favorites"))
            const newfavs= favstored.filter(e=>e!==created_at)
            localStorage.setItem("favorites", JSON.stringify(newfavs))
        }
    }

    return(
        <div className={"rowcont"}>
            <div className={"info"} onClick={handleRedirects}>
                <div className={"timecont"}>
                    <img className={"icontimer"} src={icontimer} alt=""/>
                    <p className={"time"}>{hour} by {author}</p>
                </div>
                <p className={"title"}>{story_title}</p>
            </div>
            <div className={"like"}>
            {isFavorite ? 
                <img className={"heart"} src={heartAdded} alt="" onClick={handleClickFav}></img>
                    : 
                <img className={"heart"} src={heartAdd} alt="" onClick={handleClickFav}></img>}
            </div>
        </div>
    )
}