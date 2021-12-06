import React, { useEffect, useState } from "react";
import New from "./New";

export default function All (){
    const [data, setData]=useState()
    const [page, setPage]=useState(1)
    const [category, setCategory]= useState("angular")

    useEffect(() => {
        getData(category,page)
        const catStored= localStorage.getItem("category")
        if(catStored){
            setCategory(catStored)
        }
    },[])

    function getData(category, page){
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${category}&page=${page-1}`)
            .then(r=>r.json())
            .then(json=>(setData(json.hits))
    )}
    
    const handleChange= (e)=>{
        let {value}= e.target
        setCategory(value)
        localStorage.setItem("category", value)
        getData(category, page)
    }

    return(
        <div>
            <div>
                <select onChange={handleChange} value={category}>
                    <option value="angular">Angular</option>
                    <option value="reactjs">React</option>
                    <option value="vuejs">Vuejs</option>
                </select>
            </div>
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
                    }): <p>Loading...</p>}
                </ul>
            </div>
        </div>
    )
}