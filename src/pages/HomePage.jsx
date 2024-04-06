import {Link} from "react-router-dom";

export const HomePage =()=>{
     return(
        <>
             <Link to="/main">
                 <button>Get Started</button>
             </Link>
        </>
     )
}