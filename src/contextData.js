import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./BuybusyStore";
import { addDoc, collection } from "firebase/firestore";
import {data} from './component/data/data';

const itemContext = createContext();

function useValue() {
    const value = useContext(itemContext);
    return value;
}

function CustomItemContext({ children }) {
    const [userDetails, setUserDetails] = useState({ userName: "", userEmail: "", userPassword: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [rangeFilter, setRangeFilter] = useState(50000);
    const [selectedCategories, setSelectedCategories] = useState([]);

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

    // search Query
    useEffect(()=>{
        const searchData = data.filter((item)=>{
            return item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setFilterData(searchData)
    },[searchQuery])

    // range filter
    useEffect(()=>{
        const filteredItems = data.filter((i)=>{
            return i.itemPrice <= rangeFilter;
        })
        setFilterData(filteredItems)
    },[rangeFilter])

    // checkBoxFilter
    useEffect(()=>{
        const checkBoxFilter = selectedCategories.length>0 ? 
        data.filter((item)=>selectedCategories.includes(item.itemCategory)): data;

        setFilterData(checkBoxFilter);

    },[selectedCategories])


    // handle key press for search query
    function handleKeyPress(e){
        if(e.key==="Enter"){
            const submitSearchQuery = data.filter((i)=>{
                return i.itemName.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilterData(submitSearchQuery)
        }
    }
    
    return (
        <itemContext.Provider value={{ userDetails, 
        setUserDetails, 
        handleSubmit,
        searchQuery,
        setSearchQuery,
        filterData,
        handleKeyPress,
        rangeFilter,
        setRangeFilter,
        selectedCategories,
        setSelectedCategories
        }}>
            {children}
        </itemContext.Provider>
    )
}

export { useValue }
export default CustomItemContext;