import { useState } from 'react';
import './App.css';
import title from "./Assets/hacker-news.png";
import All from './Components/AllNews';


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
      <div>
        <img src={title} alt="error"/>
      </div>
      <div>
        <button onClick={handleClick} value="All">All</button>
        <button onClick={handleClick} value="My faves">My faves</button>
      </div>
      <div>
        {render==="All" ? <All/> : null}
      </div>
    </div>
  );
}

export default App;
