import { useEffect, useState } from "react";
import { getmovie } from "./axios"
import InfiniteScroll from "react-infinite-scroll-component";

export function Movie(){

    let [data,setdata]=useState([])
    let [page,setpage]=useState(1)
    let [search,setsearch]=useState('')
    let [catagory,setcatogary]=useState('now_playing')
    async function getdata(){
        let response = await getmovie(page,catagory)
        let res2 = response.results
        console.log(response.results);
        setdata((prev) => {
            const newData = res2.filter(item => !prev.some(existingItem => existingItem.id === item.id));
            return [...prev, ...newData];
          })
    }
    useEffect(()=>{
        getdata()
        setdata([])
        setpage(1)
    },[page,catagory])
    function nextpage(){
        setpage((prev)=>prev + 1)
    }
   
    let filter = data.filter((cur)=>cur.original_title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    let drop = ["now_playing","popular","top_rated","upcoming"]
    return<>
    <div>
        <div className="navigation">
        <input type="text"  value={search} onChange={(e)=>setsearch(e.target.value)}/>Search
        <select name="" id="" onChange={(e)=>setcatogary(e.target.value)} >
            <option value="">select</option>
            {drop.map((cur,index)=>{
                return <option value={cur} key={index}>
                    {cur}
                </option>
            })}
        </select>
        </div>
        <InfiniteScroll
        dataLength={data.length}
        next={nextpage}
        hasMore={data.length <500}
        >
        {
            data && filter.map((cur,index)=>{
                return <div key={index} className="loop">
                    <h1>{cur.original_title}</h1>
                    <img style={{width:'210px',height:"230px"}} src={`https://image.tmdb.org/t/p/original/${cur.backdrop_path || cur.poster_path || cur.profile_path}`} alt="" />
                </div>
            })
        }
        </InfiniteScroll>
    </div>
    </>
}