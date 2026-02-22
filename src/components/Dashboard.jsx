// import Watchlist from "./Watchlist";

import Orders from './Orders';
import Holdings from './Holdings';
import React, { lazy, Suspense } from "react";
const Watchlist=lazy(()=>import("./Watchlist"));
const Summary=lazy(()=>import("./Summary"))
import Funds from './Funds';
import ErrorBoundary from "./ErrorBoundary";
import {Routes,Route} from 'react-router-dom'

import { GeneralContextProvider } from "./GeneralContext";
function Dashboard(){
    return(
        
        <div className="dashboard-container">
            <GeneralContextProvider>
                
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                     <Watchlist/>
                     </Suspense>
                </ErrorBoundary>
                
           
        </GeneralContextProvider>
           
            <div className="content">
               
                <Routes>
                    <Route exact path="/" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><Summary/> </Suspense></ErrorBoundary>}></Route>
                    <Route  path="/orders" element={<ErrorBoundary><Orders/></ErrorBoundary>}></Route>
                    
                    <Route  path="/holdings" element={<ErrorBoundary><Holdings/></ErrorBoundary>}></Route>
                    
                    <Route  path="/funds" element={<Funds/>}></Route>
                    
                </Routes>
                
            </div>
            

        </div>
    )
}
export default Dashboard