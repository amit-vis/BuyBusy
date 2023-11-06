import { useValue } from "../../contextData";

function Register(){
    const {userDetails, setUserDetails, handleSubmit} = useValue()
    return(
        <>
        <div className="App">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <label className="label">Name</label>
            <input 
            type="text" 
            placeholder="Enter Name"
            value={userDetails.userName}
            onChange={(e)=>setUserDetails({...userDetails, userName: e.target.value})}/>

            <label className="label">Email</label>
            <input 
            type="email" 
            placeholder="Enter Email"
            value={userDetails.userEmail}
            onChange={(e)=>setUserDetails({...userDetails, userEmail: e.target.value})}
            />

            <label className="label">Password</label>
            <input 
            type="password" 
            placeholder="Enter Password"
            value={userDetails.userPassword}
            onChange={(e)=>setUserDetails({...userDetails, userPassword: e.target.value})}
            />

            <button>Sign Up</button>
        </form>
        </div>
        </>
    )
}

export default Register;