import { create } from "zustand";
import axios from "axios";

const allStore=create((set)=>({
    holdings:[],
    watchList:[],
    orders:[],
    fetchHoldings:async ()=>{
        try{
            set({loading:true});
            const res=await axios.get("https://backend-zerodhaclone.onrender.com/holdings",{ withCredentials: true });
            
            // console.log("in hooks",res.data);
           
            set({holdings:res.data,
                loading:false,
            })
        }catch(err){
            console.log(err);
            
            set({loading:false})
        }
    },
    fetchWatchList:async ()=>{
        try{
            // console.log("fetching watchlist");
            
            set({loading:true});
            const watchListRes=await axios.get("https://backend-zerodhaclone.onrender.com/watchList",{withCredentials:true});
            // console.log("the data at fetching for watchlist",watchListRes.data);
            
            set({watchList:watchListRes.data,loading:false});
        }catch(err){
            console.log(err);
            set({loading:false});
        }
    },
    fetchOrders:async ()=>{
        try{
            // console.log("fetching orders");
            
            set({loading:true});
            const orderRes=await axios.get("https://backend-zerodhaclone.onrender.com/orders",{withCredentials:true});
            console.log(orderRes.data);
            
            set({orders:orderRes.data,loading:false});
        }catch(err){
            console.log(err);
            set({loading:false});
        }
    }
}));
export default allStore;