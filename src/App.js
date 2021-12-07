import { useState } from 'react';
import './Styles/App.modules.css';
import title from "./Assets/hacker-news.png";
import All from './Components/AllNews';
import Favorites from './Components/Favs';


function App() {
  const [render, setRender]= useState("All")

  const handleClick = (e)=>{
    if(e.target.value==="All"){
      setRender("All")
    }
    if(e.target.value==="My faves"){
      setRender("My faves")
    }
  }
  
  return (
    <div className="App">
      <div className={"header"}>
        <img className={"imgheader"} src={title} alt="error"/>
      </div>
      <div className={"bttncontainer"}>
        <button className={render==="All" ? "bttnsactive": "bttns"} onClick={handleClick} value="All">All</button>
        <button className={render==="My faves" ? "bttnsactive": "bttns"} onClick={handleClick} value="My faves">My faves</button>
      </div>
      <div>
        {render==="All" ? <All/> : null}
        {render==="My faves" ? <Favorites/> : null}
      </div>
    </div>
  );
}

export default App;
