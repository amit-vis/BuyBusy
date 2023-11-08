import Style from './HomePage.module.css';
import { useValue } from '../../contextData';

function Homepage() {
    const {searchQuery,setSearchQuery,filterData,handleKeyPress,rangeFilter,setRangeFilter} = useValue();

    return (
        <>
        <aside className={Style.asideSection}>
            <div className={Style.filterSection} >
                <h3>Filter</h3>
                <h5>Price: {rangeFilter}</h5>
                <input type='range' 
                min="1"
                max="99999"
                value={rangeFilter}
                onChange={(e)=>setRangeFilter(parseInt(e.target.value))} 
                />
            </div>
        </aside>
        <div className={Style.mainContainer}>
        <input type='text' 
            placeholder='Search Item'
            className={Style.inputContainer}
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            />
            <div className={Style.section}>
                {filterData.map((item) => (
                    <div className={Style.item_container} key={item.id}>
                        <img src={item.itemUrl} alt={item.itemName} className={Style.itemImage} />
                        <p className={Style.title}>{item.itemName}</p>
                        <h4 className={Style.price}>&#8377; {item.itemPrice}</h4>
                        <button className={Style.cartButton}>Add to cart</button>
                    </div>

                ))}
            </div>
            </div>
        </>
    )
}

export default Homepage;