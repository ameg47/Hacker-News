import React, { useEffect, useState } from "react";

export default function All (){
    const [data, setData]=useState()
    const [page, setPage]=useState(1)
    const [category, setCategory]= useState("reactjs")

    useEffect(() => {getData(category,page)},[category, page])

    function getData(category, page){
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${category}&page=${page-1}`)
            .then(r=>r.json())
            .then(json=>(setData(json.hits))
    )}
    
    const handleChange= (e)=>{
        let {value}= e.target
        setCategory(value)
    }

    return(
        <div>
            <div>
                <select onChange={handleChange}>
                    <option value="angular">Angular</option>
                    <option value="reactjs">React</option>
                    <option value="vuejs">Vuejs</option>
                </select>
            </div>
            <div>
                <ul>
                    {data.map(elem=>{
                        if(elem.author && elem.created_at && elem.story_title && elem.story_url){
                            return <li>
                                {elem.author}
                            </li>
                        }
                    })}
                </ul>
            </div>
        </div>
    )
}