import Style from './HomePage.module.css';
import { useValue } from '../../contextData';
import { ToastContainer } from 'react-toastify';

function Homepage() {
    const {searchQuery,
        setSearchQuery,
        filterData,
        handleKeyPress,
        rangeFilter,
        setRangeFilter,
        selectedCategories,
        setSelectedCategories,
        handleCart,
        cartButtonStatus
    } = useValue();

    return (
        <>
        {/* range filter input */}
        <aside className={Style.asideSection}>
            <div className={Style.filterSection} >
                <h3 className={Style.flterTitle}>Filter</h3>
                <h5 className={Style.filterPrice}>Price: {rangeFilter}</h5>
                <input type='range' 
                min="1"
                max="99999"
                className={Style.rangeInput}
                value={rangeFilter}
                onChange={(e)=>setRangeFilter(parseInt(e.target.value))} 
                />

                {/* check Box filter input */}
                <h3 className={Style.categoryTitle}>Category</h3>
                <div className={Style.checkBoxContainer}>
                    <input type='checkbox'
                    className={Style.checkBoxItem}
                    value="men's Clothing"
                    checked={selectedCategories.includes("men's Clothing")}
                    onChange={(e)=>{e.target.checked?setSelectedCategories([...selectedCategories, e.target.value]): 
                    setSelectedCategories(selectedCategories.filter((category)=> category !== e.target.value))}} />

                    <span>Men's Category</span>
                </div>
                <div className={Style.checkBoxContainer}>
                    <input type='checkbox'
                    className={Style.checkBoxItem}
                    value="Women's Clothing"
                    onChange={(e)=>{e.target.checked?setSelectedCategories([...selectedCategories, e.target.value]): 
                        setSelectedCategories(selectedCategories.filter((category)=> category !== e.target.value))}} />
                    <span>Women's Category</span>
                </div>
                <div className={Style.checkBoxContainer}>
                    <input type='checkbox'
                    className={Style.checkBoxItem}
                    value="Jewelery"
                    onChange={(e)=>{e.target.checked?setSelectedCategories([...selectedCategories, e.target.value]): 
                        setSelectedCategories(selectedCategories.filter((category)=> category !== e.target.value))}}/>
                    <span>Jewellery</span>
                </div>
                <div className={Style.checkBoxContainer}>
                    <input type='checkbox'
                    className={Style.checkBoxItem}
                    value="Eletronics"
                    onChange={(e)=>{e.target.checked?setSelectedCategories([...selectedCategories, e.target.value]): 
                        setSelectedCategories(selectedCategories.filter((category)=> category !== e.target.value))}} />
                    <span>Electronic's</span>
                </div>
            </div>
        </aside>

        {/* list of the item */}
        <div className={Style.mainContainer}>

        {/* search section */}
        <input type='text' 
            placeholder='Search Item'
            className={Style.inputContainer}
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            />

            {/* item container */}
            <div className={Style.section}>
                {filterData.map((item) => (
                    <div className={Style.item_container} key={item.id}>
                        <img src={item.itemUrl} alt={item.itemName} className={Style.itemImage} />
                        <p className={Style.title}>{item.itemName}</p>
                        <h4 className={Style.price}>&#8377; {item.itemPrice}</h4>
                        <button className={Style.cartButton} onClick={() => handleCart(item)}>
                            {cartButtonStatus[item.id]? "Adding": "Add To Cart"}
                        </button>

                    </div>

                ))}
            </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Homepage;