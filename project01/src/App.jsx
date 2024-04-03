
import { useState } from 'react';

function App() {
const [color,setColor]= useState("gray")
  return (
      <div className="w-full h-screen" 
      style={{backgroundColor:color}}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 bg-white rounded-lg m-3 p-2 gap-3 ">
      <button className="outline-none px-4 py-1 rounded-3xl" onClick={()=>setColor("red")} style={{backgroundColor:"red"}}>Red</button>
      <button className="outline-none px-4 py-1 rounded-3xl" onClick={()=>setColor("green")} style={{backgroundColor:"green"}}>Green</button>
      <button className="outline-none px-4 py-1 rounded-3xl" onClick={()=>setColor("blue")} style={{backgroundColor:"blue"}}>Blue</button>
      <button className="outline-none px-4 py-1 rounded-3xl" onClick={()=>setColor("orange")} style={{backgroundColor:"orange"}}>Orange</button>
      <button className="outline-none px-4 py-1 rounded-3xl" onClick={()=>setColor("violet")} style={{backgroundColor:"violet"}}>Violet</button>
      </div>

      </div>
  )
}

export default App
