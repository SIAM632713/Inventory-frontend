import {Outlet} from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout.jsx";

function App() {
    return (
       <>
           <DashboardLayout>
               <Outlet/>
           </DashboardLayout>
       </>
    )
}

export default App