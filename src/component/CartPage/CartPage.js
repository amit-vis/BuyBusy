import Style from './CartPage.module.css';
import { useValue } from '../../contextData';
function Cart(){
    const {
        cartItems,
        handleIncrease,
        handledecrease,
        removeCartItem,
        totalPrice} = useValue();

    return(
        <>
         <aside className={Style.asideSection}>
                <div className={Style.priceSection} >
                    <h3>TotalPrice:- &#8377; {totalPrice}</h3>
                    <button className={Style.purchaseButton}>Purchase</button>
                </div>
        </aside>
        <div className={Style.section}>
            {cartItems.map((item)=>(
                <div className={Style.item_container} key={item.id}>
                <img className={Style.itemImage} src={item.itemUrl} alt={item.itemImage} />
                <p className={Style.title}>{item.itemName}</p>
                <div className={Style.quantityCont}>
                <h4 className={Style.price}>&#8377;&nbsp;&nbsp;&nbsp; {item.itemPrice}</h4>
                <div className={Style.countContainer}>
                    <button className={Style.countButton} onClick={()=>handledecrease(item)}>-</button>
                    &nbsp;&nbsp;&nbsp;<span>&nbsp;{item.quantity}&nbsp;</span>&nbsp;&nbsp;&nbsp;
                    <button className={Style.countButton} onClick={()=>handleIncrease(item)}>+</button>
                </div>
                </div>
                <button className={Style.cartButton} onClick={()=>removeCartItem(item.id)}>Remove From Cart</button>
            </div>
            ))}
            </div>
        </>
    )
}

export default Cart;