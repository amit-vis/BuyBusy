
function Signin(){
    return(
        <>
        <div className="App">
            <h1>Sign In</h1>
            <form>
                <label>Email:</label>
                <input type="email" placeholder="Enter Email" />
                <label>Password:</label>
                <input type="password" placeholder="Enter Password" />
                <button>Sign In</button>
            </form>
        </div>
        </>
    )
}
export default Signin;
