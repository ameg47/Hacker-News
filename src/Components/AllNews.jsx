import React, { useEffect, useState } from "react";
import New from "./New";
import '../Styles/AllNews.modules.css';
import angular from "../Assets/image-138.png"
import reactjs from "../Assets/image-140.png" 
import vuejs from "../Assets/image-141.png" 
import Select, { components } from 'react-select'

export default function All (){
    const [data, setData]=useState()
    const [page, setPage]=useState(1)
    const [category, setCategory]= useState("angular")
    const [error, setError]= useState()

    useEffect(() => {
        getData(category,page)
        const catStored= localStorage.getItem("category")
        if(catStored){
            setCategory(catStored)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function getData(category){
        try{
            await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${category}&page=0`)
                .then(r=>r.json())
                .then(json=>(setData(json.hits)))
        }
        catch(e){
            console.log(e)
            setError("Failed to load the news. Please reload the website.")
        }
    }
    
    const handleChange= (e)=>{
        setCategory(e.value)
        localStorage.setItem("category", e.value)
        getData(category, page)
    }

    async function getMore(category, page){
        try{
            await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${category}&page=${page}`)
                .then(r=>r.json())
                .then(json=>(setData(data=>[...data, ...json.hits])))
        }
        catch(e){
            console.log(e)
        }    
    }
    const more = async () => {
        await getMore(category, page)
        setPage(page => page + 1)
    }

    const options = [
        { value: 'angular', label: 'Angular', icon: angular },
        { value: 'reactjs', label: 'React', icon: reactjs },
        { value: 'vuejs', label: 'Vuejs', icon: vuejs }
      ]

    const { Option } = components;
    const IconOption = props => (
    <Option {...props}>
        <img
        src={props.data.icon}
        style={{ width: 18 }}
        alt={props.data.label}
        />
        {props.data.label}
    </Option>
    );
    
    
    return(
        <div>
            <div >
                {/* <select onChange={handleChange} value={category}>
                    <option>Select your news</option>
                    <option value="angular">Angular</option>
                    <option value="reactjs">React</option>
                    <option value="vuejs">Vuejs</option>
                </select> */}
                <Select options={options}
                    defaultValue={category}
                    onChange={handleChange}
                    components={{ Option: IconOption }}
                    className={"select"}
                />
            </div>
            {error ? <p className={"error"}>{error}</p>:
            <div>
                <ul className={"newslist"}>
                    {data ? data.map(elem=>{
                        if(elem.author && elem.created_at && elem.story_title && elem.story_url){
                            return (
                                <li key={elem.created_at}>
                                    <New author={elem.author} created_at={elem.created_at} story_title={elem.story_title} 
                                    story_url={elem.story_url}/>
                                </li>)
                        }
                        else return null
                    }): <p className={"load"}>Loading...</p>}
                </ul>
            </div>}
            <button className={"bttnload"} onClick={more}>
                Load more news
            </button>
        </div>
    )
}