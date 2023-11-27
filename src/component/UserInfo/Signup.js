import { toast } from "react-toastify";
import { useValue } from "../../contextData";
import { useNavigate } from "react-router-dom";
import Style from "./Signup.module.css";


function Register() {
    // import all the requirted things from the contextData
    const { userDetails, setUserDetails, handleSubmit, errorMsg, handleGoogleSignIn,googleSignIn } = useValue()
    const navigate = useNavigate();

    // handle SignUp button
    async function handleSignUp(e) {
        try {
            e.preventDefault();
            const successSignUp = await handleSubmit();
            if (successSignUp) {
                navigate('/signin');
                toast.success("you register successfully!!")
            }else{
                toast.warn("fill all the required details!!")
            }

        } catch (error) {
            toast.error(error)

        }
    }

    // handle google sign Up
    async function handleGoogleSignup(){
        if(googleSignIn){
            await handleGoogleSignIn();
            navigate('/');
            toast.success("Logged In successfully!!")
        }
    }
    return (
        <>
        {/* sigup section */}
            <div className={Style.signupcontainer}>
                <h1>Sign Up</h1>
                <button className={Style.googleSignUp} onClick={handleGoogleSignup}>Google SignUp</button><br/><br/>
                <form onSubmit={handleSignUp}>
                    <label className="label">Name</label>
                    <br/>
                    <br/>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={userDetails.userName}
                        onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
                        className={Style.signupInput}
                         />
                        <br/>

                    <label className="label">Email</label>
                    <br/>
                    <br/>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={userDetails.userEmail}
                        onChange={(e) => setUserDetails({ ...userDetails, userEmail: e.target.value })}
                        className={Style.signupInput}
                    />

                    <br/>

                    <label className="label">Password</label>
                    <br/>
                    <br/>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={userDetails.userPassword}
                        onChange={(e) => setUserDetails({ ...userDetails, userPassword: e.target.value })}
                        className={Style.signupInput}
                    />
                    <br/>

                    <button className={Style.signupButton}>Sign Up</button>
                </form>
                <b>{errorMsg}</b>
            </div>
        </>
    )
}

export default Register;