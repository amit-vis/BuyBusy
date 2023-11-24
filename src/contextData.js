import { createContext, useContext, useEffect, useState } from "react";
import { data } from './component/data/data';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { db } from "./BuybusyStore";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const itemContext = createContext();

export function useValue() {
    const value = useContext(itemContext);
    return value;
}

function CustomItemContext({ children }) {
    const auth = getAuth();
    const [userDetails, setUserDetails] = useState({ userName: "", userEmail: "", userPassword: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [userName, setUserName] = useState([]);
    const [userAuth, setUserAuth] = useState({ email: "", password: "" })
    const [searchQuery, setSearchQuery] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [rangeFilter, setRangeFilter] = useState(50000);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [myOrders, setMyOrders] = useState([])
    const [cartButtonStatus, setCartButtonStatus] = useState({})


    // 
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName({ displayName: user.displayName, userEmail: user.email });
            } else {
                setUserName('')
            }
        })
    }, [])

    // handle LogOut
    async function logout() {
        try {
            await signOut(auth)
            setUserAuth({})
            toast.success("Logged Out Successfully")
        } catch (error) {
            console.log("hey Error in log out", error)
            toast.error(error)
        }
    }

    // find then user Name and useDetails
    async function handleSignIn() {
        try {
            if (!userAuth.email || !userAuth.password) {
                setErrorMsg("Fill all the fields!!")
            }

            const userCredential = await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password)
            const user = userCredential.user;
            if (user) {
                setUserAuth({ email: userAuth.email, password: userAuth.password });
                return true
            } else {
                setUserAuth({})
                return false
            }

        } catch (error) {
            console.log("Hey there is some Error", error)
            return false
        }
    }


    // handle submit
    async function handleSubmit() {
        try {
            if (!userDetails.userName || !userDetails.userEmail || userDetails.userPassword) {
                setErrorMsg("Fill all the Fields");
            }
            const userCredential = await createUserWithEmailAndPassword(auth, userDetails.userEmail, userDetails.userPassword);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: userDetails.userName
            })
            console.log("here is the user", user)
        } catch (error) {
            console.log("Here is the Error", error)

        }

    }

    // search Query
    useEffect(() => {
        const searchData = data.filter((item) => {
            return item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setFilterData(searchData)
    }, [searchQuery])

    // range filter
    useEffect(() => {
        const filteredItems = data.filter((i) => {
            return i.itemPrice <= rangeFilter;
        })
        setFilterData(filteredItems)
    }, [rangeFilter])

    // checkBoxFilter
    useEffect(() => {
        const checkBoxFilter = selectedCategories.length > 0 ?
            data.filter((item) => selectedCategories.includes(item.itemCategory)) : data;

        setFilterData(checkBoxFilter);

    }, [selectedCategories])


    // handle key press for search query
    function handleKeyPress(e) {
        if (e.key === "Enter") {
            const submitSearchQuery = data.filter((i) => {
                return i.itemName.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilterData(submitSearchQuery)
        }
    }

    // handle Add to cart
    async function handleCart(product) {
        const successSignIn = await handleSignIn();
        if (successSignIn) {
            toast.success("Your Item Added into cart successfully!!")
            setCartButtonStatus((prevStatus) => ({
                ...prevStatus,
                [product.id]: "Adding"
            }));

            setTimeout(() => {
                setCartButtonStatus((prevStatus) => ({
                    ...prevStatus,
                    [product.id]: undefined
                }))
            }, 1000)

            const findItem = cartItems.find((item) => item.id === product.id)
            if (findItem) {
                const updateQuantity = parseInt(findItem.quantity, 10) + 1
                return setCartItems(cartItems.map((item) => item.id === product.id ? { ...findItem, quantity: updateQuantity } : item))
            } else {

                return setCartItems([...cartItems, { ...product, quantity: 1 }])
            }

        }else{
            toast.error("Please Logged In !!")
        }

    }

    function handleIncrease(product) {
        setCartItems((prevCartItem) =>
            prevCartItem.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    function handledecrease(product) {
        setCartItems((prevCartItem) =>
            prevCartItem.map((item) =>
                item.id === product.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
            )
        )
    }

    // when count is zero then
    useEffect(() => {
        // Find the item in the updated state
        cartItems.map((item) => {
            if (item.quantity === 0) {
                removeCartItem(item.id)
            }
        })
    }, [cartItems]);

    // remove the item from the cart
    function removeCartItem(ItemId) {
        const removeItem = cartItems.filter((item) => item.id !== ItemId)
        setCartItems(removeItem)
        toast.success("Your Item Remove From the Cart SuccessFully!!")
    }

    // calculate total price
    useEffect(() => {
        const updatePrice = cartItems.reduce((price, item) => price + item.quantity * item.itemPrice, 0)
        setTotalPrice(updatePrice)
    }, [cartItems]);

    function handleMyorder(product) {
        toast.success("Your Order Placed successfully!!")
        setCartButtonStatus((prevStatus) => ({
            ...prevStatus,
            [product.id]: "Purchasing..."
        }));

        setTimeout(() => {
            setCartButtonStatus((prevStatus) => ({
                ...prevStatus,
                [product.id]: undefined
            }))
        }, 1000)
        setMyOrders(prevOrders => {
            const existingItemIndex = prevOrders.findIndex(item => item.id === product.id);

            if (existingItemIndex === 1000) {
                const updatedOrders = [...prevOrders];
                updatedOrders[existingItemIndex] = {
                    ...updatedOrders[existingItemIndex]
                };
                return updatedOrders;
            } else {
                return [...prevOrders, { ...product }];
            }
        });
    }


    function clearCart() {
        setCartItems([])
    }

    const handlePurchase = async () => {
        await handleMyorder(cartItems);
        clearCart();
    };

    return (
        <itemContext.Provider value={{
            userDetails,
            setUserDetails,
            errorMsg,
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
            totalPrice,
            handleMyorder,
            myOrders,
            cartButtonStatus,
            handlePurchase,
            userAuth,
            setUserAuth,
            handleSignIn,
            userName,
            logout
        }}>
            {children}
        </itemContext.Provider>
    )
}

export default CustomItemContext;