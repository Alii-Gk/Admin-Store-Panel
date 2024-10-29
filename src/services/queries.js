import { useQuery } from "@tanstack/react-query"
import api from "configs/api"

const grabber = (page)=>{
    const queryFn =()=> api.get(`products?page=${page}&limit=10`)
    const queryKey = ["products" , page]
    
   return useQuery({queryFn ,queryKey })
}

export { grabber}