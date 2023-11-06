import { NavLink, Outlet } from "react-router-dom";

function Navbar(){
    return(
        <>
        <div className="nav-container">
        <NavLink to="/signup">
            <h4>Sign Up</h4>
        </NavLink>
        </div>
        <Outlet/>
        </>
    )
}

export default Navbar;