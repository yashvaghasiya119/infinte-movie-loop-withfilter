import { useEffect, useState } from "react";
import { getdata } from "./axios"
import InfiniteScroll from "react-infinite-scroll-component";


export function Jsonplaceholder(){
    let[data,setdata]=useState([])
    let [page,setpage]=useState(1)
    let [search,setsearch]=useState("")
  
    async function getdatafunc(){
      let response = await getdata(page)
      console.log(response);
      setdata((prev) => {
        const newData = response.filter(item => !prev.some(existingItem => existingItem.id === item.id));
        return [...prev, ...newData];
      })
    }
  
    useEffect(()=>{
      getdatafunc()
    },[page])
  
    function nextdata(){
      setpage((prev)=>prev + 1)
    }
    let filter = data.filter(data => data.name.includes(search.toLocaleLowerCase()))
    return<>
    <input type="text"  value={search} onChange={(e)=>setsearch(e.target.value)}/> Search anything
  <div>
    <InfiniteScroll
    dataLength={data.length}
    next={nextdata}
    hasMore={data.length < 400}
    >
    {
      data && filter.map((cur,index)=>{
        return <div key={index}>
          <h1>{index} {cur.name}</h1>
          <p>{cur.body}</p>
        </div>
      })
    }
    </InfiniteScroll>
  </div>
    </>
}