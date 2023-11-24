import { useNavigate } from "react-router-dom";
import { useValue } from "../../contextData";
import { ToastContainer, toast } from "react-toastify";
import Style from './signIn.module.css';

function Signin() {
    const navigate = useNavigate();
    const { userAuth, setUserAuth, handleSignIn, errorMsg } = useValue();
    async function handleSignInSubmit(e) {
        try {
            e.preventDefault();
            const signInSuccess = await handleSignIn();
            if (signInSuccess) {
                navigate('/')
                toast.success("Logged In successfully!!")
            }else{
                toast.warning("fill the valid email/password!!")
            }

        }catch(error){
            toast.error(error)

        }
    }
    return (
        <>
            <div className="App">
                <div className={Style.signincontainer}>
                <h1>Sign In</h1>
                <form onSubmit={handleSignInSubmit} >
                    <label className={Style.singninLabel}>Email</label>
                    <br/>
                    <br/>
                    <input type="email"
                        placeholder="Enter Email"
                        value={userAuth.email}
                        onChange={(e) => setUserAuth({ ...userAuth, email: e.target.value })}
                        className={Style.signinInput}
                    /><br/>
                    <label>Password:</label>
                    <br/>
                    <br/>
                    <input type="password"
                        placeholder="Enter Password"
                        value={userAuth.password}
                        onChange={(e) => setUserAuth({ ...userAuth, password: e.target.value })}
                        className={Style.signinInput}
                    /><br/>
                    <button className={Style.signinButton}>Sign In</button>
                </form>
                <b>{errorMsg}</b>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
export default Signin;
