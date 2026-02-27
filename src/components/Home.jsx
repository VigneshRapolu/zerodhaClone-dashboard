import TopBar from "./TopBar"
import Dashboard from './Dashboard'
import { useEffect } from "react";
import allStore from "./hooks/hooks";

function Home(){
    const {makeUser}=allStore();
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        makeUser(true);
    } else {
        makeUser(false);
    }
}, []);
    return(
        <div >
        <TopBar/>
        <Dashboard/>
        </div>
    )
}
export default Home;