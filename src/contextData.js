import { createContext, useContext, useState } from "react";
import { db } from "./BuybusyStore";
import { addDoc, collection } from "firebase/firestore";

const itemContext = createContext();

function useValue() {
    const value = useContext(itemContext);
    return value;
}

function CustomItemContext({ children }) {
    const [userDetails, setUserDetails] = useState({ userName: "", userEmail: "", userPassword: "" });

    // function for store a user details in database
    async function addDetails(newUser) {
        setUserDetails({...userDetails, newUser})
        const docRef = await addDoc(collection(db, "User"), {
            name: newUser.userName,
            email: newUser.userEmail,
            password: newUser.userPassword,
            createdOn: new Date()
        });
        console.log("docRef", docRef)
    }


    // handle submit
    function handleSubmit(e) {
        e.preventDefault()
        addDetails(userDetails)
        setUserDetails({ userName: "", userEmail: "", userPassword: "" })
    }
    return (
        <itemContext.Provider value={{ userDetails, setUserDetails, handleSubmit }}>
            {children}
        </itemContext.Provider>
    )
}

export { useValue }
export default CustomItemContext;