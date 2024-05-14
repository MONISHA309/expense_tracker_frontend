// if needed replace this file in App.jsx
import { useEffect, useState } from 'react'
import './App.css'

function App() {
//<--   select all ctrl + /
  // let [count,setCount] = useState(0)  
  // function add(){
  //   //setCount(count + 1)         // here count is directly send to setCount so console.log will print only count value not count + 1. if this is used console print from 0
  //   count = count + 1
  //   setCount(count)         // if this is used console will print from 1 since count is assigned in count
  //   console.log(count)          
  // }
  // function subtract(){
  //   //setCount(count - 1)
  //   count = count - 1
  //   setCount(count)
  //   console.log(count)
  // }

  // -->


  const [resource,setResource] = useState("posts")
  const [items,setItems] = useState([])
  useEffect(()=> {
    console.log("Rendered")
    fetch(`https://jsonplaceholder.typicode.com/todos/1/${resource}`)
      .then(response => response.json())
      .then(json => setItems(json))
  },[resource])

  return (
    <>
      {/* <h1>Count : {count}</h1>
      <button onClick={add}>start</button>
      <button onClick={subtract}>stop</button>
      <p>count is : {count}</p> */}


      <button onClick={setResource("posts")}>posts</button>
      <button onClick={setResource("commands")}>commands</button>
      <button onClick={setResource("likes")}>likes</button>
      <h1>{resource}</h1>
      {
        items.map(item=>{
          return (<p>{JSON.stringify(item)}</p>)
        })
      }
    </>
  )
}

export default App







