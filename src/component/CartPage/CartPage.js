import Style from './CartPage.module.css'
function Cart(){
    return(
        <>
        <div className={Style.section}>

                    <div className={Style.item_container}>
                        <img className={Style.itemImage} />
                        <p className={Style.title}>Name</p>
                        <h4 className={Style.price}>&#8377; </h4>
                        <button className={Style.cartButton}>Remove From Cart</button>
                    </div>
            </div>
        </>
    )
}

export default Cart;