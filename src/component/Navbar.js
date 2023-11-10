import { NavLink, Outlet } from "react-router-dom";
import Styles from './Navbar.module.css';


function Navbar() {
    return (
        <>
            <div className={Styles.nav_container}>
                <NavLink to="/">
                <h1 className={Styles.title}>BuyBusy</h1>
                </NavLink>
                <div className={Styles.nav_item}>
                    <div className={Styles.nav_home}>
                        <NavLink to="/">
                            <img src="https://cdn-icons-png.flaticon.com/128/609/609803.png"
                                alt="Home-Icon"
                                height="50px" />
                        </NavLink>
                    </div>
                    <div className={Styles.nav_home}>
                        <NavLink to="/cart">
                            <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
                                alt="Home-Icon"
                                height="50px" />
                        </NavLink>
                    </div>
                    <div className={Styles.nav_signup}>
                        <NavLink to="/signup">
                            <h4>Sign Up</h4>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar;