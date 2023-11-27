import Style from './CartPage.module.css';
import { useValue } from '../../contextData';
import { Link } from 'react-router-dom';

function Cart() {
    // import require thing from contextData
    const {
        cartItems,
        handleIncrease,
        handledecrease,
        removeCartItem,
        totalPrice,
        handlePurchase,
        cartButtonStatus,
        googleSignIn,
        userName } = useValue();

    const currentUserEmail = userName.userEmail || googleSignIn
    const usersData = cartItems.filter(item => item.userEmail === currentUserEmail)
    //Reset the price for next user 

    return (
        <>
        {/* aside section to show the price */}
            <aside className={Style.asideSection}>
                {usersData.length > 0 && // Ensure userTotal exists before rendering
                    <div className={Style.priceSection}>
                        <h3>TotalPrice:- &#8377; {totalPrice}</h3>
                        <Link to="/Order">
                            <button className={Style.purchaseButton} onClick={handlePurchase}>
                                {cartButtonStatus[cartItems.id] ? "Purchasing..." : "Purchase"}
                            </button>
                        </Link>
                    </div>}
            </aside>

            {/* div section show all the cart item here */}
            <div className={Style.section}>
                {usersData.map((item) => (
                    <div className={Style.item_container} key={item.id}>
                        <img className={Style.itemImage} src={item.itemUrl} alt={item.itemImage} />
                        <p className={Style.title}>{item.itemName}</p>
                        <div className={Style.quantityCont}>
                            <h4 className={Style.price}>&#8377;&nbsp; {item.itemPrice}</h4>
                            <div className={Style.countContainer}>
                                <button className={Style.countButton} onClick={() => handledecrease(item)}>-</button>
                                &nbsp;&nbsp;&nbsp;<span>&nbsp;{item.quantity}&nbsp;</span>&nbsp;&nbsp;&nbsp;
                                <button className={Style.countButton} onClick={() => handleIncrease(item)}>+</button>
                            </div>
                        </div>
                        <button className={Style.cartButton} onClick={() => removeCartItem(item.id)}>Remove From Cart</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Cart;