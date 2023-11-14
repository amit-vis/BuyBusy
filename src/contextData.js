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
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice]= useState(0);

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

    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    },[cartItems])

    useEffect(()=>{
        const storeData = localStorage.getItem("cartItems");
        try {
            const parsedData = JSON.parse(storeData);
            console.log("Parsed Data:", parsedData);
            setCartItems(parsedData);
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
        }
    },[])

    // handle Add to cart
    function handleCart(product){
        const findItem = cartItems.find((item)=> item.id === product.id)
        if(findItem){
            const updateQuantity = parseInt(findItem.quantity,10)+1
            setCartItems(cartItems.map((item)=>item.id === product.id ? {...findItem, isAdding: true, quantity: updateQuantity}: item))
        }else{

            setCartItems([...cartItems,{...product, quantity: 1, isAdding: true}])
        }
    }

    function handleIncrease(product){
        setCartItems((prevCartItem)=>
        prevCartItem.map((item)=>
        item.id === product.id?{...item, quantity: item.quantity + 1}: item
        )
        )
    }

    function handledecrease(product){
        setCartItems((prevCartItem)=>
        prevCartItem.map((item)=>
        item.id === product.id?{...item, quantity: Math.max(item.quantity - 1,0)}: item
        )
        )
    }

    // when count is zero then
    useEffect(() => {
        // Find the item in the updated state
        cartItems.map((item)=>{
            if(item.quantity===0){
                removeCartItem(item.id)
            }
        })
    }, [cartItems]);

    // remove the item from the cart
    function removeCartItem(ItemId){
        const removeItem = cartItems.filter((item)=> item.id !== ItemId)
        setCartItems(removeItem)
    }

    // calculate total price
    useEffect(()=>{
        const updatePrice = cartItems.reduce((price, item)=> price+ item.quantity*item.itemPrice,0)
        setTotalPrice(updatePrice)
    },[cartItems]);
    
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
        setSelectedCategories,
        handleCart,
        cartItems,
        handleIncrease,
        handledecrease,
        removeCartItem,
        totalPrice
        }}>
            {children}
        </itemContext.Provider>
    )
}

export { useValue }
export default CustomItemContext;