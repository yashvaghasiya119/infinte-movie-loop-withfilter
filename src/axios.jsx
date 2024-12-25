import axios from "axios";

let link = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

export async function getdata(page){
    let res = await link.get(`/comments/?_limit=9&_page=${page}`)
    return res.data
}

// movie 
//  enter your header and data 
export let movieurl = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  method: 'GET',

});

  export async function getmovie(page,catagory){
    let res = await movieurl.get(`movie/${catagory}`, {
        params: { 
            page,
            include_adult: true
         }
      });
    
    return res.data
  }