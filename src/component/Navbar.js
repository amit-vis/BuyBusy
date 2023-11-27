import { NavLink, Outlet } from "react-router-dom";
import Styles from './Navbar.module.css';
import { useValue } from "../contextData";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function Navbar() {
    // import require things from the context data
    const { userName, logout } = useValue();

    return (
        <>
        {/* navbar section here */}
            <div className={Styles.nav_container}>
                <NavLink to="/" className={Styles.outerNav}>
                    <h1 className={Styles.title}>BuyBusy</h1>
                </NavLink>
                <div className={Styles.nav_item}>

                    <div className={Styles.nav_home}>
                        <NavLink to="/" className={Styles.navLink}>
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/128/609/609803.png"
                                    alt="Home-Icon"
                                    height="50px"
                                    className={Styles.imageIcon} />
                            </div>
                            <div className={Styles.icon_name}>
                                <span>Home</span>
                            </div>
                        </NavLink>
                    </div>

                    {/* authenticate some thing which one i have to show after logged in */}
                    {userName && userName.userEmail ? (
                        <>
                            <div className={Styles.nav_home}>
                                <NavLink to="/Order" className={Styles.navLink}>
                                    <div>
                                        <img src="https://cdn-icons-png.flaticon.com/128/7164/7164835.png"
                                            alt="myorder-Icon"
                                            height="50px"
                                            className={Styles.imageIcon} />
                                    </div>
                                    <div className={Styles.icon_name}>
                                        <span>My Order</span>
                                    </div>
                                </NavLink>
                            </div>

                            <div className={Styles.nav_home}>
                                <NavLink to="/cart" className={Styles.navLink}>
                                    <div>
                                        <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
                                            alt="Home-Icon"
                                            height="50px"
                                            className={Styles.imageIcon} />
                                    </div>
                                    <div className={Styles.icon_name}>
                                        <span>Cart</span>
                                    </div>
                                </NavLink>
                            </div>

                            <div className={Styles.nav_home}>
                                <NavLink to="/" className={Styles.navLink}>
                                    <p>{userName.displayName}</p>
                                </NavLink>
                            </div>
                            <div className={Styles.nav_home}>
                                <NavLink to="/" className={Styles.navLink}>
                                    <button className={Styles.logOutButton} onClick={logout}>LOG OUT</button>
                                </NavLink>
                            </div></>) : (<>

                                <div className={Styles.nav_signup}>
                                    <NavLink to="/signup" className={Styles.outerNav}>
                                        <p>Sign Up</p>
                                    </NavLink>
                                </div>

                                <div className={Styles.nav_signup}>
                                    <NavLink to="/signin" className={Styles.outerNav}>
                                        <p>Sign In</p>
                                    </NavLink>
                                </div>
                            </>)}
                </div>
            </div>
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default Navbar;